# Mail Karo Backend

Backend API service for Mail Karo - AI Email Writer using Google Gemini.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in this directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### POST `/api/generate-email`

Generates an email using Google Gemini AI.

**Request:**
```json
{
  "prompt": "Follow up after meeting with client"
}
```

**Response:**
```json
{
  "success": true,
  "email": "Generated email content...",
  "prompt": "Follow up after meeting with client"
}
```

### GET `/health`

Health check endpoint to verify the server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Mail Karo Backend is running"
}
```

## 🛠️ Development

Run with auto-reload:
```bash
npm run dev
```

## 📦 Dependencies

- `express` - Web framework
- `@google/generative-ai` - Google Gemini AI SDK
- `dotenv` - Environment variable management
- `cors` - Cross-origin resource sharing

## 🔒 Security Notes

- Never commit your `.env` file
- Keep your Gemini API key secure
- The API key is loaded from environment variables only

