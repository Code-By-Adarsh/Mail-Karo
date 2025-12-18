import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

/**
 * POST /api/quality-check
 * Performs QA-grade analysis on an email:
 * Grammar, clarity, tone, and risk detection
 */
router.post('/quality-check', async (req, res) => {
  try {
    // 1️⃣ API key validation (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY missing');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // 2️⃣ Input validation
    const { email } = req.body;

    if (typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Email content is required'
      });
    }

    // 3️⃣ Email length guard (VERY IMPORTANT)
    if (email.length > 6000) {
      return res.status(413).json({
        success: false,
        error: 'Email too long. Please keep it under 6000 characters.'
      });
    }

    // 4️⃣ Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite'
    });

    // 5️⃣ QA-focused prompt (STRICT + JSON ONLY)
    const qualityPrompt = `
You are a strict QA email reviewer, not a writer.

Analyze the email below and return ONLY valid JSON.
Do NOT add explanations, markdown, or extra text.

Your task:
- Evaluate grammar quality
- Evaluate clarity and structure
- Evaluate tone and professionalism
- Detect risky, aggressive, or unsafe wording

Rules:
- Be objective and critical
- Do NOT rewrite the email
- Do NOT praise unnecessarily
- Base feedback on real professional standards

Return JSON in this EXACT format:

{
  "score": number (0-100),
  "summary": string,
  "grammar": string,
  "clarity": string,
  "tone": string,
  "risk": string,
  "issues": [
    {
      "type": "grammar | clarity | tone | risk",
      "message": string
    }
  ]
}

EMAIL TO REVIEW:
"""${email}"""
`.trim();

    // 6️⃣ Run quality analysis
    const result = await model.generateContent(qualityPrompt);
    const response = await result.response;
    const rawText = response.text();

    // 7️⃣ Safe JSON parsing
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (parseError) {
      console.error('❌ Invalid JSON from Gemini:', rawText);
      return res.status(502).json({
        success: false,
        error: 'AI returned an invalid response. Please try again.'
      });
    }

    // 8️⃣ Final response (clean + controlled)
    return res.json({
      success: true,
      report: parsed
    });

  } catch (error) {
    console.error('🔥 Email quality check failed:', error);

    // Known Gemini errors
    if (error.message?.includes('API_KEY')) {
      return res.status(401).json({
        success: false,
        error: 'AI service authentication failed'
      });
    }

    if (
      error.message?.includes('quota') ||
      error.message?.includes('rate')
    ) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.'
      });
    }

    // Generic fallback (NO internal leak)
    return res.status(500).json({
      success: false,
      error: 'Failed to analyze email quality. Please try again.'
    });
  }
});

export default router;
