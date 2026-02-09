# AI Email Sender

An **AI-powered job application assistant** that automatically generates and sends professional emails to potential employers. Just input the job details, and let AI handle the rest!



## 🎯 What Does This Do?

Think of this as your personal email assistant for job hunting:
1. **You provide:** Company email, job title/description
2. **AI creates:** Professional email with subject line and body
3. **System sends:** Email directly to the recruiter
4. **You benefit:** The system handles repetitive email writing, reducing manual effort

---

## 🚀 Core Features

- 🤖 **Smart Email Writing** – AI crafts personalized emails based on job context
- ✉️ **One-Click Sending** – Emails go out instantly through secure SMTP
- 🔐 **Secure Login** – Your data protected with JWT authentication
- 📱 **Modern Interface** – Clean, responsive design that works everywhere
- ⚡ **Lightning Fast** – Built on cutting-edge web technologies
- 🗄️ **Saves Your History** – Track all sent applications in MongoDB

---

## 🛠️ Built With

| Component | Technology | Why We Chose It |
|-----------|------------|-----------------|
| **Frontend** | Next.js + React | Fast, SEO-friendly, great developer experience |
| **Styling** | TailwindCSS | Rapid UI development with utility classes |
| **Backend** | FastAPI | Blazing fast Python API framework |
| **Database** | MongoDB | Flexible document storage for user data |
| **Security** | JWT | Industry-standard token authentication |
| **Email** | SMTP | Universal email protocol support |
| **AI Engine** | Google Gemini | Advanced language model for email generation |

---

## 🐳 Running with Docker (Recommended)

> 💡 **Recommended:** Use Docker for development to avoid environment issues.  
> Manual setup is provided below for learning and debugging purposes.

**Why Docker?** Forget installing Node, Python, MongoDB separately. Docker packages everything into containers that work anywhere.

### What You Need
- **Docker Desktop** – [Download here](https://www.docker.com/products/docker-desktop/)

That's it! Everything else is handled automatically.

### One-Command Setup
```bash
# Clone the project
git clone https://github.com/thevishwass/AI_EmailSender.git
cd AI_EmailSender

# Create backend environment file
cd backend
# Create a file named .env and add your email credentials:
```

**Backend Environment** (`backend/.env`):
```env
MONGODB_URL=mongodb://mongo:27017
JWT_SECRET=your_super_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
GEMINI_API_KEY=your_gemini_api_key_here
```

> 🔑 **Getting Your Gemini API Key:**
> 1. Visit **[Google AI for Developers - Gemini API](https://ai.google.dev/gemini-api/docs/api-key)**
> 2. Click **"Get API Key"** in Google AI Studio
> 3. Sign in with your Google account
> 4. Create a new API key or use an existing one
> 5. Copy the key and paste it as `GEMINI_API_KEY` in your `.env` file
> 
> **Note:** The Gemini API is **free** for testing and low-volume usage!  
> **Important:** Keep your API key secret and never commit it to version control.

```bash
# Return to project root
cd ..

# Start everything at once
docker compose up --build
```

**What just happened?**
- ✅ Frontend started at `http://localhost:3000`
- ✅ Backend started at `http://localhost:8000`
- ✅ MongoDB started internally
- ✅ All three services connected automatically
- ✅ Frontend automatically configured to talk to backend via `docker-compose.yml`

**💡 Note:** When using Docker, you don't need to create `frontend/.env.local` — the backend URL is automatically set in `docker-compose.yml`.

### Managing Your Docker Setup
```bash
# Stop everything
docker compose down

# Restart after making code changes
docker compose up --build

# See what's happening (logs)
docker compose logs -f

# Check specific service logs
docker compose logs frontend
docker compose logs backend
```

---

## 🏗️ How Docker Works Here

### The Three Containers
```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Frontend      │─────▶│    Backend      │─────▶│    MongoDB      │
│   (Next.js)     │      │   (FastAPI)     │      │   (Database)    │
│   Port: 3000    │      │   Port: 8000    │      │   Port: 27017   │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

**How They Talk:**
- Your browser → Frontend container (port 3000)
- Frontend → Backend using `http://backend:8000` (internal Docker network)
- Backend → MongoDB using `mongodb://mongo:27017` (internal Docker network)

**Important:** Containers use service names (`backend`, `mongo`) to communicate, NOT `localhost`!

### What's Inside Each Container?

**Frontend Container (`frontend/Dockerfile`)**
```dockerfile
# Based on: Official Node.js 20 image
# Contains: Next.js app, React, TailwindCSS
# Runs: npm run dev (development server)
# Exposed: Port 3000
```

**Backend Container (`backend/Dockerfile`)**
```dockerfile
# Based on: Python 3.11 slim image
# Contains: FastAPI, all Python dependencies
# Runs: uvicorn main:app (API server)
# Exposed: Port 8000
```

**MongoDB Container**
```yaml
# Based on: Official MongoDB image
# Purpose: Stores user data and email history
# No configuration needed - works out of the box!
```

---

## 🏃 Running Locally (Manual Setup)

### What You Need
- **Node.js** (v18 or higher) – [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) – [Download here](https://python.org/)
- **MongoDB** – [Download here](https://mongodb.com/try/download/community) or use [MongoDB Atlas](https://mongodb.com/cloud/atlas) (free cloud option)

### Step-by-Step Setup

#### 1️⃣ Get the Code
```bash
git clone https://github.com/thevishwass/AI_EmailSender.git
cd AI_EmailSender
```

#### 2️⃣ Set Up Backend (API Server)
```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt
```

**Create Backend Environment File** (`backend/.env`):
```env
# Use localhost for local development
MONGODB_URL=mongodb://localhost:27017
JWT_SECRET=your_super_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
GEMINI_API_KEY=your_gemini_api_key_here
```

> 🔑 **Don't have a Gemini API Key yet?**  
> Visit **[Google AI for Developers](https://ai.google.dev/gemini-api/docs/api-key)** to get your free API key in minutes!

```bash
# Start the backend server
uvicorn main:app --reload
```
**Backend now running at:** `http://localhost:8000`

#### 3️⃣ Set Up Frontend (User Interface)
```bash
# Open a new terminal, navigate to frontend
cd frontend

# Install Node dependencies
npm install
```

**Create Frontend Environment File** (`frontend/.env.local`):
```env
# Use localhost for local development
NEXT_PUBLIC_API_URL=http://localhost:8000
```
```bash
# Start the frontend server
npm run dev
```
**Frontend now running at:** `http://localhost:3000`

#### 4️⃣ Open Your Browser
Visit `http://localhost:3000` and start sending AI-powered emails! 🎉

---

## ⚙️ Configuration Summary

### Docker Mode (Recommended)
**Only need to configure:**
- `backend/.env` with your email credentials and Gemini API key
- Frontend configuration is handled automatically by `docker-compose.yml`

### Local Development Mode
**Need to configure:**
- `backend/.env` with `MONGODB_URL=mongodb://localhost:27017` and Gemini API key
- `frontend/.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000`

### 📧 Email Configuration Tips

**💡 For Gmail Users:**
- Create an **App Password** (recommended) - Google no longer supports "less secure app access"
- [Generate App Password here](https://myaccount.google.com/apppasswords)
- Enable 2-Step Verification first (required for App Passwords)

**For Other Email Providers:**
| Provider | SMTP Host | Port |
|----------|-----------|------|
| Outlook/Hotmail | smtp-mail.outlook.com | 587 |
| Yahoo | smtp.mail.yahoo.com | 587 |
| Custom Domain | Check your provider's documentation | Usually 587 or 465 |

### 🤖 Gemini API Configuration

**Getting Started:**
1. Visit **[Google AI for Developers - API Keys](https://ai.google.dev/gemini-api/docs/api-key)**
2. Click "Get API Key" in Google AI Studio
3. Sign in with your Google account (free)
4. Generate your API key
5. Add to `backend/.env` as `GEMINI_API_KEY`

**Usage Limits (Free Tier):**
- 15 requests per minute
- 1,500 requests per day
- Perfect for personal job hunting!

**Security Best Practices:**
- ⚠️ Never commit `.env` files to Git
- ⚠️ Don't share your API key publicly
- ⚠️ Use environment variables in production
- ✅ Add `.env` to your `.gitignore` file

---

## 📁 Project Structure (Simplified)
```
AI_EmailSender/
│
├── 📂 frontend/                  # Everything user sees
│   ├── 📂 components/            # Reusable UI pieces (buttons, forms, etc.)
│   ├── 📂 pages/                 # Different pages of the website
│   ├── 📂 styles/                # CSS styling files
│   ├── 📄 Dockerfile             # Instructions to build frontend container
│   └── 📄 package.json           # Lists all JavaScript dependencies
│
├── 📂 backend/                   # The brain of the operation
│   ├── 📂 routes/                # API endpoints (login, send email, etc.)
│   ├── 📂 models/                # Database structure definitions
│   ├── 📂 utils/                 # Helper functions (AI logic, email sender)
│   ├── 📄 main.py                # Backend entry point
│   ├── 📄 Dockerfile             # Instructions to build backend container
│   └── 📄 requirements.txt       # Lists all Python dependencies
│
├── 📄 docker-compose.yml         # Orchestrates all three containers
├── 📄 .gitignore                 # Tells Git to ignore .env files
└── 📄 README.md                  # You are here! 👋
```

---

## 🐛 Common Issues & Fixes

### "Port 3000 already in use"
**Problem:** Another app is using that port  
**Solution:**
```bash
# Find what's using the port
lsof -i :3000          # Mac/Linux
netstat -ano | findstr :3000   # Windows

# Kill it, or change the port in docker-compose.yml
```

### "Cannot connect to backend"
**Problem:** Frontend can't reach the API  
**Check:**
- Is backend running? Visit `http://localhost:8000/docs`
- **Using Docker?** Backend URL is set in `docker-compose.yml` automatically
- **Using local setup?** Make sure `NEXT_PUBLIC_API_URL=http://localhost:8000` in `frontend/.env.local`

### "Email not sending"
**Problem:** SMTP configuration issue  
**Check:**
- Using Gmail? Create an **App Password** (Google removed "less secure app access")
- Firewall blocking port 587?
- Check credentials in `backend/.env`
- Verify EMAIL_HOST and EMAIL_PORT are correct for your provider

### "MongoDB connection failed"
**Problem:** Can't connect to database  
**Check:**
- **Using Docker?** Make sure `MONGODB_URL=mongodb://mongo:27017` in `backend/.env`
- **Using local setup?** Make sure `MONGODB_URL=mongodb://localhost:27017` in `backend/.env`
- Is MongoDB service running locally?

### "Gemini API Error" or "AI not generating emails"
**Problem:** Gemini API key issue  
**Check:**
- Is `GEMINI_API_KEY` set in `backend/.env`?
- Is the API key valid? Test it at [Google AI Studio](https://aistudio.google.com/)
- Have you exceeded free tier limits? (15 requests/minute, 1,500/day)
- Check backend logs: `docker compose logs backend` or terminal output

### "Docker container crashes immediately"
**Problem:** Missing dependencies or wrong configuration  
**Solution:**
```bash
# Nuclear option - rebuild everything fresh
docker compose down -v
docker compose up --build --force-recreate
```

---

## 🎓 Learning Resources

**New to these technologies?**

- **Next.js:** [Official Tutorial](https://nextjs.org/learn) (interactive, beginner-friendly)
- **FastAPI:** [First Steps](https://fastapi.tiangolo.com/tutorial/first-steps/) (quick 5-minute intro)
- **Docker:** [Get Started Guide](https://docs.docker.com/get-started/) (hands-on basics)
- **MongoDB:** [University Courses](https://university.mongodb.com/) (free online courses)
- **Gemini API:** [Documentation](https://ai.google.dev/gemini-api/docs) (comprehensive guide)

---

## 🚀 What's Next?

### Coming Soon
- 📝 **Resume Parser** – Extract info from PDF resumes automatically
- 🎨 **Email Templates** – Choose from multiple professional styles
- 📊 **Application Tracker** – Dashboard showing all your applications
- 🤝 **Cover Letter Generator** – AI writes cover letters too
- ⏰ **Scheduled Sending** – Queue emails to send later
- 📈 **Analytics** – Track open rates and responses
- 🌐 **Multi-language Support** – Generate emails in different languages

### Want to Contribute?
We'd love your help! Here's how:
1. **Fork** this repository
2. **Create** a new branch: `git checkout -b cool-new-feature`
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a Pull Request with a clear description

---

## 📜 License

MIT License - feel free to use this for personal or commercial projects!

---

## 👨‍💻 Creator

**Vishwas Singh**

Passionate about making job hunting easier with AI. Questions? Feedback? Reach out!

- 🐙 GitHub: [@thevishwass](https://github.com/thevishwass)
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/vishwassingh15)
- 📧 Email: thevishwass@gmail.com

---

## 💙 Support This Project

If this tool saved you time and stress:
- ⭐ **Star this repo** (helps others discover it)
- 🐦 **Share on Twitter** (tag me!)
- 🐛 **Report bugs** (helps make it better)
- 💡 **Suggest features** (what would you add?)

---

## 🙏 Acknowledgments

Built with coffee, determination, and these amazing open-source tools:
- [Next.js](https://nextjs.org/) - The React Framework
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python Web Framework
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [Docker](https://www.docker.com/) - Containerization Platform
- [TailwindCSS](https://tailwindcss.com/) - Utility-First CSS
- [Google Gemini](https://ai.google.dev/) - Advanced AI Language Model

---

**Happy Job Hunting! May your inbox be full of interview requests! 🎉📧✨**
