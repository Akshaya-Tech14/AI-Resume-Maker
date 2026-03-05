# 🚀 Quick Start Guide - ResumeAI Pro

## What You Have

You now have a **complete full-stack AI-powered resume maker application** with:

✅ **Stunning Frontend** - Animated star background, glassmorphism UI, floating cards
✅ **Complete Backend API** - Express.js + MongoDB + OpenAI GPT-4
✅ **Database Models** - User, Resume, Template schemas
✅ **AI Features** - Bullet enhancement, summary generation, ATS scoring
✅ **Authentication** - JWT-based secure auth system
✅ **API Documentation** - Complete endpoint reference

---

## 🎯 Next Steps

### 1. Install Node.js & MongoDB

**Node.js:**
- Download from: https://nodejs.org/
- Install version 16 or higher
- Verify: `node --version`

**MongoDB:**
- **Option A (Local)**: Download from https://www.mongodb.com/try/download/community
- **Option B (Cloud)**: Use MongoDB Atlas (free tier) at https://www.mongodb.com/cloud/atlas

### 2. Get OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key (starts with `sk-`)

### 3. Setup Backend

```powershell
# Navigate to project folder
cd "c:\Users\Akshaya\OneDrive\Desktop\ManavaaN\Resume maker project\Resume  maker app code"

# Install dependencies
npm install

# Copy environment template
copy .env.example .env

# Edit .env file and add your credentials
notepad .env
```

In `.env`, update:
```env
MONGODB_URI=mongodb://localhost:27017/resumeai
JWT_SECRET=my_super_secret_key_12345
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 4. Start MongoDB

```powershell
# If using local MongoDB
mongod
```

Or skip this if using MongoDB Atlas (cloud)

### 5. Seed Database (Optional)

```powershell
node seed.js
```

This will create 5 sample resume templates.

### 6. Start Backend Server

```powershell
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║   🚀 ResumeAI Pro Backend Server      ║
║   Running on port 5000                ║
║   Environment: development            ║
╚════════════════════════════════════════╝
```

### 7. Open Frontend

Double-click `index.html` or run:
```powershell
.\open.bat
```

---

## 🧪 Test the API

### Test 1: Health Check
```powershell
curl http://localhost:5000/api/health
```

### Test 2: Register a User
```powershell
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

### Test 3: Get Templates
```powershell
curl http://localhost:5000/api/templates
```

---

## 📊 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Resumes
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### AI Features
- `POST /api/ai/enhance-bullet` - Enhance bullet point (1 credit)
- `POST /api/ai/generate-summary` - Generate summary (2 credits)
- `POST /api/ai/suggest-keywords` - Suggest keywords (1 credit)
- `POST /api/ai/optimize-resume/:id` - Full optimization (3 credits)

### ATS Checker
- `POST /api/ats/check/:resumeId` - Check ATS score
- `POST /api/ats/analyze-job` - Match resume with job description

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get single template

📖 **Full API docs**: See `API_DOCUMENTATION.md`

---

## 🎨 Frontend Features

### What's Included:
1. **Animated Star Background** - Falling stars with glow effects
2. **Hero Section** - Bold typography with gradient animations
3. **Floating Cards** - Interactive parallax cards showing:
   - ATS Score with progress bar
   - Keyword tags
   - AI suggestions
   - Resume preview
4. **Features Section** - AI, ATS, Templates
5. **How It Works** - 3-step process
6. **CTA Section** - Call-to-action
7. **Responsive Design** - Works on all devices

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running (`mongod`)

### OpenAI API Error
```
Error: Invalid API key
```
**Solution**: Check your API key in `.env` file

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `.env` to 3000 or 8000

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Run `npm install`

---

## 💡 Usage Example

### 1. Register & Login
```javascript
// Register
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
})

// Login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})
```

### 2. Create Resume
```javascript
fetch('http://localhost:5000/api/resumes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  },
  body: JSON.stringify({
    title: 'Software Engineer Resume',
    personalInfo: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890'
    },
    summary: 'Experienced software engineer...',
    skills: {
      technical: ['JavaScript', 'React', 'Node.js']
    }
  })
})
```

### 3. Enhance with AI
```javascript
fetch('http://localhost:5000/api/ai/enhance-bullet', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  },
  body: JSON.stringify({
    text: 'Worked on frontend development',
    jobTitle: 'Frontend Developer'
  })
})
```

### 4. Check ATS Score
```javascript
fetch('http://localhost:5000/api/ats/check/RESUME_ID', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
})
```

---

## 📈 What's Next?

### To Make This Production-Ready:

1. **Frontend Integration**
   - Connect frontend to backend API
   - Add user authentication UI
   - Create resume builder/editor page
   - Add PDF export functionality

2. **Enhanced Features**
   - Real-time collaboration
   - Resume templates customization
   - Cover letter generation
   - LinkedIn import

3. **Deployment**
   - Deploy backend to Heroku/Railway/Render
   - Deploy frontend to Vercel/Netlify
   - Use MongoDB Atlas for database
   - Set up CI/CD pipeline

4. **Security**
   - Add email verification
   - Implement password reset
   - Add OAuth (Google, LinkedIn)
   - Rate limiting per user

5. **Monetization**
   - Stripe payment integration
   - Subscription management
   - Usage analytics
   - Admin dashboard

---

## 📞 Need Help?

- **API Documentation**: `API_DOCUMENTATION.md`
- **Main README**: `README.md`
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express.js Docs**: https://expressjs.com/
- **OpenAI API Docs**: https://platform.openai.com/docs

---

**🎉 Congratulations! You have a complete AI-powered resume maker application!**

The frontend is ready to view, and the backend is ready to run. Just follow the steps above to get everything running!
