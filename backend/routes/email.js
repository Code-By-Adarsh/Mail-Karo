import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

/**
 * POST /api/generate-email
 * Generates an email using Google Gemini AI based on user prompt
 */
router.post('/generate-email', async (req, res) => {
  try {
    // Validate API key and initialize Gemini AI
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.'
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Validate request body
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required and must be a non-empty string'
      });
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // Create a more detailed prompt for email generation
    const emailPrompt = `You are an expert email writer. Based on the user's topic or idea provided below, craft a professional, well-structured email.

TOPIC/IDEA: "${prompt}"

Please analyze the topic/idea and generate a complete email that includes:

1. **Subject Line**: Create an engaging, relevant subject line
2. **Greeting**: Appropriate salutation based on context
3. **Body Content**:
   - Clear introduction establishing purpose
   - Well-organized main points developing the topic
   - Specific details or calls to action where appropriate
   - Professional tone matching the topic's nature
4. **Closing**: Polite conclusion with appropriate sign-off
5. **Sender Information**: Name placeholder and optional position

Key Requirements:
- Adapt writing style to suit the topic (business, informational, promotional, etc.)
- Maintain clarity and conciseness
- Ensure proper email formatting and structure
- Make reasonable assumptions about context where needed
- Keep the email focused and purposeful
- Keep length of email of 200 words and human tone

Generate the complete email now:`;

    // Generate email using Gemini
    const result = await model.generateContent(emailPrompt);
    const response = await result.response;
    const generatedEmail = response.text();

    // Return structured response
    res.json({
      success: true,
      email: generatedEmail,
      prompt: prompt
    });

  } catch (error) {
    console.error('Error generating email:', error);

    // Handle specific Gemini API errors
    if (error.message?.includes('API_KEY')) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Gemini API key. Please check your GEMINI_API_KEY in .env file.'
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return res.status(429).json({
        success: false,
        error: 'API rate limit exceeded. Please try again later.'
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate email. Please try again.'
    });
  }
});

export default router;

