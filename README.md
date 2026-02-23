# 🚀 ResumeAI Pro - AI-Powered Resume Maker

## ✨ Features

This is a **full-stack** resume maker application with advanced AI capabilities, premium graphics, and a complete backend API:

### 🎨 Visual Features
- **Animated Star Background**: Beautiful falling stars animation on the welcome page
- **Glassmorphism Effects**: Modern frosted glass UI elements
- **Floating Cards**: Parallax-enabled floating cards with smooth animations
- **Gradient Animations**: Dynamic color-shifting gradients
- **Smooth Transitions**: Premium micro-animations throughout
- **Responsive Design**: Fully responsive across all devices

### 🤖 AI Features (Powered by OpenAI GPT-4)
- **AI Content Generation**: Enhance bullet points with powerful language
- **Smart Summaries**: Auto-generate professional summaries
- **ATS Optimization**: Real-time ATS score checking (0-100)
- **Keyword Extraction**: Analyze job descriptions for missing keywords
- **Resume Optimization**: Get AI-powered suggestions for improvement
- **Job Matching**: Calculate match percentage with job descriptions

### 🔧 Backend Features
- **RESTful API**: Complete Express.js backend with MongoDB
- **Authentication**: JWT-based secure authentication
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: OpenAI GPT-4 API integration
- **ATS Scoring**: Advanced algorithm for resume scoring
- **Credit System**: AI usage tracking with subscription tiers
- **Security**: Helmet, CORS, rate limiting, password hashing

## 📁 Project Structure

```
Resume maker app code/
├── Frontend/
│   ├── index.html          # Main HTML structure
│   ├── styles.css          # Advanced CSS with animations
│   └── script.js           # JavaScript for interactivity
├── Backend/
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment variables template
│   ├── models/
│   │   ├── User.js         # User model
│   │   ├── Resume.js       # Resume model
│   │   └── Template.js     # Template model
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── resume.js       # Resume CRUD routes
│   │   ├── ai.js           # AI enhancement routes
│   │   ├── ats.js          # ATS checker routes
│   │   └── template.js     # Template routes
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   └── seed.js             # Database seeder
├── API_DOCUMENTATION.md    # Complete API docs
└── README.md               # This file
```

## 🚀 How to Run

## Backend Setup

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Configure Environment
1. Copy `.env.example` to `.env`:
   ```powershell
   copy .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/resumeai
   JWT_SECRET=your_super_secret_key_here
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

### Step 3: Start MongoDB
```powershell
# If using local MongoDB
mongod
```

Or use MongoDB Atlas (cloud) - update `MONGODB_URI` in `.env`

### Step 4: Seed Database (Optional)
```powershell
node seed.js
```

### Step 5: Start Backend Server
```powershell
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Backend will run on `http://localhost:5000`

### Step 6: Test API
```powershell
# Health check
curl http://localhost:5000/api/health
```

📖 **See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference**

---

## Frontend Setup

### Method 1: Direct File Opening
1. Navigate to the project folder:
   ```
   c:\Users\Akshaya\OneDrive\Desktop\ManavaaN\Resume maker project\Resume  maker app code\
   ```
2. Double-click on `index.html`
3. The page will open in your default web browser

### Method 2: Using Live Server (Recommended)
1. Open the folder in VS Code
2. Install the "Live Server" extension if you haven't already
3. Right-click on `index.html` and select "Open with Live Server"
4. The page will open with hot-reload capabilities

### Method 3: Using Python HTTP Server
1. Open PowerShell in the project directory
2. Run:
   ```powershell
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## 🎯 What You'll See

### Welcome Page Features:
1. **Animated Star Background** - Continuously falling stars with glow effects
2. **Hero Section** - Bold typography with gradient text animations
3. **Floating Cards** - Interactive cards showing:
   - ATS Score with animated progress bar
   - Keyword matching tags
   - AI suggestions preview
   - Resume preview mockup
4. **Features Section** - Three main feature cards:
   - AI Content Generation
   - ATS Optimization
   - Professional Templates
5. **How It Works** - Three-step process visualization
6. **Call-to-Action** - Prominent CTA section with gradient background
7. **Footer** - Complete footer with links and social media

## 🎨 Design Highlights

### Color Palette
- **Primary Gradient**: Purple to violet (#667eea → #764ba2)
- **Secondary Gradient**: Pink to coral (#f093fb → #f5576c)
- **Accent Gradient**: Blue to cyan (#4facfe → #00f2fe)
- **Dark Background**: Deep navy with gradient (#1a1a2e → #16213e)

### Typography
- **Headings**: Space Grotesk (Modern, geometric)
- **Body**: Inter (Clean, professional)

### Animations
- Falling stars with rotation and fade
- Floating card parallax on mouse move
- Gradient color shifting
- Smooth scroll animations
- Button ripple effects
- Counter animations for statistics
- Progress bar fill animations

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with SEO optimization
- **CSS3**: Advanced animations, gradients, and transitions
- **Vanilla JavaScript**: No frameworks, pure performance
- **Google Fonts**: Inter & Space Grotesk

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🎭 Interactive Elements

1. **Navbar**: Smooth scroll to sections, scroll-based background change
2. **Buttons**: Ripple effect on click
3. **Cards**: Hover animations with elevation
4. **Stats**: Animated counters on scroll into view
5. **Progress Bars**: Animated fill on appearance

## 🔧 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... more colors */
}
```

### Adjust Star Animation
Modify in `script.js`:
```javascript
const numberOfStars = 50; // Change number of stars
const duration = Math.random() * 5 + 3; // Change fall speed
```

### Modify Content
Edit the text content directly in `index.html`

## 🚀 Next Steps

To make this a fully functional resume maker app, you would need to add:

1. **Backend Integration**
   - User authentication
   - Database for storing resumes
   - AI API integration (OpenAI GPT-4, etc.)

2. **Additional Pages**
   - Resume builder/editor page
   - Template selection page
   - User dashboard
   - ATS checker page

3. **Features**
   - PDF export functionality
   - Real-time editing
   - Template customization
   - File upload for existing resumes

## 📄 License

This project is created for educational purposes.

## 💡 Tips

- For best experience, use Chrome or Firefox
- Enable JavaScript for full functionality
- Use on a desktop/laptop for optimal viewing
- The star animation performs best on modern browsers

---

**Enjoy your stunning AI-powered resume maker! 🎉**
