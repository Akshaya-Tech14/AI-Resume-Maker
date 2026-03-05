# ResumeAI Pro - Backend API Documentation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenAI API Key

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Set Up Environment Variables**
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resumeai
JWT_SECRET=your_secret_key_here
OPENAI_API_KEY=your_openai_api_key
```

3. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

4. **Run the Server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

---

## 📚 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

---

### Resumes

#### Get All Resumes
```http
GET /api/resumes?status=draft&page=1&limit=10
Authorization: Bearer {token}
```

#### Get Single Resume
```http
GET /api/resumes/:id
Authorization: Bearer {token}
```

#### Create Resume
```http
POST /api/resumes
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Software Engineer Resume",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA"
  },
  "summary": "Experienced software engineer...",
  "experience": [
    {
      "jobTitle": "Senior Developer",
      "company": "Tech Corp",
      "startDate": "2020-01-01",
      "current": true,
      "responsibilities": ["Led team of 5 developers", "Built scalable APIs"]
    }
  ],
  "skills": {
    "technical": ["JavaScript", "React", "Node.js"]
  }
}
```

#### Update Resume
```http
PUT /api/resumes/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "summary": "Updated summary..."
}
```

#### Delete Resume
```http
DELETE /api/resumes/:id
Authorization: Bearer {token}
```

---

### AI Features

#### Enhance Bullet Point
```http
POST /api/ai/enhance-bullet
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Worked on frontend development",
  "jobTitle": "Frontend Developer",
  "targetRole": "Senior Frontend Engineer"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "original": "Worked on frontend development",
    "enhanced": "Spearheaded frontend development initiatives, delivering 15+ responsive web applications using React and TypeScript, improving user engagement by 40%",
    "creditsRemaining": 9
  }
}
```

#### Generate Professional Summary
```http
POST /api/ai/generate-summary
Authorization: Bearer {token}
Content-Type: application/json

{
  "targetRole": "Senior Software Engineer",
  "yearsOfExperience": 5,
  "skills": ["JavaScript", "React", "Node.js", "AWS"],
  "experience": "Led development of microservices architecture"
}
```

#### Suggest Keywords
```http
POST /api/ai/suggest-keywords
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobDescription": "We are looking for a Senior Developer with React, Node.js...",
  "currentSkills": ["JavaScript", "HTML", "CSS"]
}
```

#### Optimize Entire Resume
```http
POST /api/ai/optimize-resume/:resumeId
Authorization: Bearer {token}
Content-Type: application/json

{
  "targetJob": "Senior Full Stack Developer"
}
```

---

### ATS Checker

#### Check ATS Score
```http
POST /api/ats/check/:resumeId
Authorization: Bearer {token}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "scores": {
      "overall": 85,
      "formatting": 90,
      "keywords": 82
    },
    "recommendations": [
      {
        "type": "keywords",
        "priority": "high",
        "message": "Add more action verbs"
      }
    ],
    "missingKeywords": ["led", "managed", "achieved"]
  }
}
```

#### Analyze Job Match
```http
POST /api/ats/analyze-job
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobDescription": "Full job description text here...",
  "resumeId": "resume_id_here"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "matchPercentage": 75,
    "totalKeywords": 30,
    "matchedKeywords": 22,
    "matchedKeywordsList": ["javascript", "react", "node"],
    "missingKeywords": ["docker", "kubernetes", "aws"],
    "recommendation": "Strong match! Your resume aligns well with this job."
  }
}
```

---

### Templates

#### Get All Templates
```http
GET /api/templates?category=modern&isPremium=false
```

#### Get Single Template
```http
GET /api/templates/:id
```

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  subscription: String (free/pro/enterprise),
  aiCredits: Number,
  resumeCount: Number,
  createdAt: Date
}
```

### Resume Model
```javascript
{
  user: ObjectId (ref: User),
  title: String,
  personalInfo: {
    fullName, email, phone, location, linkedin, website, github
  },
  summary: String,
  experience: Array,
  education: Array,
  skills: { technical, soft, languages },
  certifications: Array,
  projects: Array,
  atsScore: {
    overall, formatting, keywords, lastChecked
  },
  status: String (draft/completed/archived)
}
```

### Template Model
```javascript
{
  name: String,
  displayName: String,
  category: String,
  isPremium: Boolean,
  atsOptimized: Boolean,
  colorScheme: Object,
  layout: String
}
```

---

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer your_jwt_token_here
```

Token expires in 7 days by default.

---

## 💳 AI Credits System

- **Free Plan**: 10 credits
- **Pro Plan**: 100 credits/month
- **Enterprise Plan**: Unlimited

**Credit Costs:**
- Enhance bullet point: 1 credit
- Generate summary: 2 credits
- Suggest keywords: 1 credit
- Optimize resume: 3 credits

---

## 🚦 Rate Limiting

- 100 requests per 15 minutes per IP
- Configurable in `.env`

---

## 🛡️ Security Features

- Helmet.js for HTTP headers
- CORS protection
- Password hashing with bcrypt
- JWT authentication
- Input validation
- Rate limiting

---

## 📊 Error Responses

All errors follow this format:
```json
{
  "status": "error",
  "message": "Error description here"
}
```

**Common Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

---

## 🧪 Testing the API

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Using Postman
1. Import the API endpoints
2. Set up environment variables for token
3. Test each endpoint

---

## 📝 Notes

- MongoDB must be running before starting the server
- Get your OpenAI API key from: https://platform.openai.com/api-keys
- For production, use MongoDB Atlas instead of local MongoDB
- Change JWT_SECRET to a secure random string in production
- Enable HTTPS in production

---

## 🔧 Troubleshooting

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod
```

**OpenAI API Error:**
- Verify your API key is correct
- Check your OpenAI account has credits
- Ensure you're using the correct model name

**Port Already in Use:**
```bash
# Change PORT in .env file
PORT=3000
```

---

## 📞 Support

For issues or questions, please check the documentation or create an issue in the repository.
