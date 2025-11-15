# 💌 Mail Karo - AI Email Writer
![Banner](https://github.com/Code-By-Adarsh/Mail-Karo/blob/9bb438725f2a88d4aa13d212b62874c61a73333d/All%20Images/Banner.png)
<br>
# 🇮🇳 India’s First AI Email Writer — **Mail Karo**

**Mail Karo** is a community-driven AI SaaS platform that makes email writing effortless.  
It helps users **generate**, **send**, and **analyze** emails with smart automation — built with the vision of creating India’s most powerful AI-based email productivity tool.

---

## 🤝 Contribute & Build With Us

This is a fully **public, open-source project**, and we genuinely welcome developers, designers, writers — **anyone passionate** — to join us.

Whether it's fixing a bug, improving UI/UX\, adding new AI features, or suggesting ideas:

### 👉 Your contribution directly helps in building this startup into a real-world product.

**Fork the repo, open an issue, raise a PR —  
and let’s build Mail Karo together.**  
Every contribution counts. ❤️

```bash
 🚀  Let's build India's most advanced ⚡ AI Email Writer — TOGETHER 🤝
```
---

## 🚀 Features

- ✍️ AI Email Writing (using Google Gemini API)
- 📤 Email Sending Automation(coming soon)
- 📊 Smart Email Analytics (coming soon)
- 💻 Clean UI built with HTML, CSS, and JavaScript
- ⚙️ Backend API for secure AI email generation

---

## 🧠 Tech Stack

- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js, Express  
- AI: Google Gemini API  
- Deployment: Netlify  (Future-Hostinger)

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```bash
   # Create .env file in the backend directory
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```
   
   > **Note:** Replace `your_gemini_api_key_here` with your actual Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the backend server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Verify the server is running:**
   - The server should start on `http://localhost:3000`
   - You can test the health endpoint: `http://localhost:3000/health`
   - The email generation endpoint is available at: `http://localhost:3000/api/generate-email`

### Frontend Setup

1. **Open the project:**
   - Simply open `index.html` in your browser, or
   - Use a local development server (e.g., Live Server extension in VS Code)

2. **Make sure the backend is running:**
   - The frontend is configured to connect to `http://localhost:3000`
   - Ensure the backend server is running before using the email generation feature

### API Endpoint

**POST** `/api/generate-email`

**Request Body:**
```json
{
  "prompt": "Follow up after meeting with client"
}
```

**Success Response:**
```json
{
  "success": true,
  "email": "Subject: Follow-up on Our Recent Meeting\n\nDear [Client Name],\n\n...",
  "prompt": "Follow up after meeting with client"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## 🤝 Contributing

We warmly welcome contributions to **Mail Karo – AI Email Writer**!  
If you’re interested in improving the project, fixing bugs, or adding new features, here’s how you can get started:

### 💡 Start Here
Check our open issues to see what you can work on:  
👉 **https://github.com/Code-By-Adarsh/Mail-Karo/issues**

### 🛠 How to Contribute
1. Find an issue you want to work on.
2. Comment **“I want to work on this”** on the issue.
3. Wait for assignment from the maintainer.
4. Fork the repository.
5. Create a new branch for your feature or fix.
6. Commit your changes with a clear message.
7. Open a Pull Request (PR).

### 📦 For New Contributors
We label beginner-friendly issues as:  
- `good first issue`  
- `help wanted`

If you're new to open source, these are great places to start!

### 📜 Code of Conduct
Be respectful and helpful. Maintain a positive environment for all contributors.

If you have questions, feel free to open a discussion or comment on an issue.
Happy contributing! 🚀

---

## 📫 Connect with the Founder

👤 **Adarsh Jayprakash Mishra**  
Founder & Developer of **Mail Karo – AI Email Writer**

🌐 **GitHub:** [Code-By-Adarsh](https://www.github.com/Code-By-Adarsh)  
💼 **LinkedIn:** [Adarsh Jayprakash Mishra](https://www.linkedin.com/in/adarsh-jayprakash-mishra)  
🤝 **Instagram:** [Adarsh Mishra](https://www.instagram.com/ltx_adarsh18)<br>
📧 **Email:** adarshmishra70931@gmail.com   
🧠 Always open to collaborations, suggestions, and contributions to make **Mail Karo** even better.

📫**Company Email:** mailkaro2026@gmail.com

---

## 📄 License

This project is licensed under the MIT License – free to use and modify.
