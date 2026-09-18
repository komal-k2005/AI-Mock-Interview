# 🤖 AI Mock Interview Platform

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Java](https://img.shields.io/badge/Java-17-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.0-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A full-stack AI-powered interview practice platform with intelligent feedback and performance analysis**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🚀 Usage](#-usage)
- [📚 API Documentation](#-api-documentation)
- [🎨 UI/UX Features](#-uiux-features)
- [🔒 Security](#-security)
- [🌐 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [📊 Performance](#-performance)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

The **AI Mock Interview Platform** is a comprehensive full-stack application designed to help job seekers practice interviews with AI-powered question generation, answer evaluation, and personalized feedback. Built with modern technologies and featuring a beautiful, animated UI, this platform provides a realistic interview experience with intelligent analysis.

### 🎯 Key Benefits

- **AI-Powered Questions**: Generate relevant interview questions based on your target role
- **Intelligent Feedback**: Get detailed analysis of your answers with improvement suggestions
- **Realistic Experience**: Practice with technical, behavioral, or mixed interview types
- **Performance Tracking**: Monitor your progress with detailed statistics and scores
- **Modern UI**: Beautiful, animated interface with smooth transitions
- **Secure Authentication**: Firebase-based authentication with email verification

---

## ✨ Features

### 🔐 Authentication
- [x] Email/Password registration with verification
- [x] Google Sign-In integration
- [x] Email verification for new users
- [x] Password reset functionality
- [x] Secure session management
- [x] Firebase authentication with backend validation

### 📊 Dashboard
- [x] Interview statistics overview
- [x] Recent interviews history
- [x] Performance metrics tracking
- [x] AI status indicators
- [x] Quick navigation to features

### 🎯 Interview Setup
- [x] Target role customization
- [x] Interview type selection (Technical, Behavioral, Mixed)
- [x] Difficulty levels (Easy, Medium, Hard)
- [x] Adjustable question count (1-50)
- [x] AI-powered question generation
- [x] Fallback to high-quality placeholder questions

### 💬 Interview Process
- [x] Real-time question answering
- [x] Progress tracking
- [x] Hint system
- [x] AI-powered answer evaluation
- [x] Immediate feedback
- [x] Smooth navigation between questions

### 📈 Results & Analysis
- [x] Overall score calculation
- [x] Technical and communication scores
- [x] Detailed feedback and suggestions
- [x] Performance improvement tips
- [x] AI-powered interview summary
- [x] Visual score representation

### 👤 Profile Management
- [x] User profile viewing
- [x] Account information management
- [x] Interview history access

### 🎨 UI/UX
- [x] Beautiful gradient backgrounds
- [x] Smooth animations (fade-in, slide-in, float, shimmer)
- [x] Interactive hover effects
- [x] Responsive design
- [x] Modern card-based layout
- [x] Custom scrollbar styling
- [x] Glassmorphism effects
- [x] Animated score counters

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │ Components   │  │  Services    │      │
│  │  Login       │  │   Button     │  │    API       │      │
│  │  Register    │  │    Card      │  │  Firebase    │      │
│  │  Dashboard   │  │  ScoreCard   │  │              │      │
│  │  Interview   │  │   Navbar     │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST API
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend (Spring Boot)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controllers  │  │   Services   │  │  Repositories│      │
│  │   Auth       │  │  Interview   │  │    User      │      │
│  │  Interview   │  │  Question    │  │  Interview   │      │
│  │  Dashboard   │  │  AI Service  │  │   Question   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                           │                                   │
│                           ▼                                   │
│  ┌──────────────────────────────────────────────┐          │
│  │         Spring AI OpenAI Integration          │          │
│  │  - Question Generation                        │          │
│  │  - Answer Evaluation                         │          │
│  │  - Performance Analysis                       │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      External Services                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Firebase   │  │   OpenAI     │  │  (Future DB) │      │
│  │ Auth Service │  │   API        │  │  PostgreSQL  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Description |
|------------|---------|-------------|
| Java | 17 | Programming language |
| Spring Boot | 3.3.0 | Application framework |
| Spring AI | 1.0.0-M1 | AI integration framework |
| Spring Web | - | REST API support |
| Firebase Admin SDK | 9.2.0 | Firebase authentication |
| Lombok | - | Code generation |
| Maven | - | Build tool |
| MySQL Connector | - | Database driver (future use) |

### Frontend
| Technology | Version | Description |
|------------|---------|-------------|
| React | 18 | UI library |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.4.17 | Styling framework |
| React Router | 6.x | Routing |
| Axios | 1.7.9 | HTTP client |
| Firebase | 10.7.1 | Authentication |
| JavaScript | ES6+ | Programming language |

---

## 📦 Installation

### Prerequisites

- **Java 17** or higher
- **Maven 3.6** or higher
- **Node.js 18** or higher
- **npm** or **yarn**
- **Firebase Account** (free)
- **OpenAI API Key** (optional, for AI features)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/AI-Mock-Interview.git
cd AI-Mock-Interview
```

2. **Navigate to backend directory**
```bash
cd backend
```

3. **Install dependencies**
```bash
mvn clean install
```

4. **Configure environment variables**
```bash
# Copy the example file
cp ../.env.example .env

# Edit .env and add your credentials
OPENAI_API_KEY=your-openai-api-key
```

5. **Configure Firebase**
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password and Google Sign-In)
- Go to Project Settings → Service Accounts → Generate Private Key
- Download the JSON file and rename it to `firebase-service-account.json`
- Place it in `backend/src/main/resources/`

6. **Run the backend**
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Firebase config
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

4. **Run the frontend**
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-openai-api-key

# Firebase Configuration
GOOGLE_APPLICATION_CREDENTIALS=src/main/resources/firebase-service-account.json

# Database Configuration (future)
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/ai_mock_interview
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your-password
```

#### Frontend (.env)
```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id

# API Configuration
REACT_APP_API_URL=http://localhost:8080
```

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication**
   - Go to "Authentication" → "Sign-in method"
   - Enable "Email/Password"
   - Enable "Google"
   - Configure Google Sign-In with your project details

3. **Get Firebase Config**
   - Go to Project Settings → General → Your apps
   - Add a Web app
   - Copy the configuration
   - Update `.env` file

4. **Generate Service Account Key**
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download and save as `firebase-service-account.json`
   - Place in `backend/src/main/resources/`

---

## 🚀 Usage

### Getting Started

1. **Start the Backend**
```bash
cd backend
mvn spring-boot:run
```

2. **Start the Frontend**
```bash
cd frontend
npm run dev
```

3. **Open Browser**
Navigate to `http://localhost:5173`

### User Flow

1. **Register**
   - Click "Register" in the navbar
   - Fill in your details
   - Verify your email
   - Sign in

2. **Setup Interview**
   - Go to Dashboard
   - Click "New Interview"
   - Configure interview parameters
   - Start interview

3. **Take Interview**
   - Answer questions one by one
   - Use hints if needed
   - Submit your answers

4. **View Results**
   - See your overall score
   - Read detailed feedback
   - Check improvement suggestions

5. **Track Progress**
   - View interview history
   - Monitor performance metrics
   - Practice more interviews

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Google Sign-In
```http
POST /api/auth/google
Content-Type: application/json

{
  "idToken": "google-id-token"
}
```

#### Verify Email
```http
GET /api/auth/verify-email/{email}
```

### Interview Endpoints

#### Create Interview
```http
POST /api/interviews
Content-Type: application/json

{
  "targetRole": "Java Developer",
  "interviewType": "Technical",
  "difficulty": "Medium",
  "numberOfQuestions": 10
}
```

#### Get Interview
```http
GET /api/interviews/{id}
```

#### Get Interview Questions
```http
GET /api/interviews/{id}/questions
```

### Question Endpoints

#### Submit Answer
```http
POST /api/questions/{id}/answer
Content-Type: application/json

{
  "answer": "Your answer here",
  "questionId": 1
}
```

### Dashboard Endpoints

#### Get Dashboard Statistics
```http
GET /api/dashboard
Authorization: Bearer {token}
```

---

## 🎨 UI/UX Features

### Animations
- **Fade-in**: Smooth entry animations for pages and components
- **Slide-in**: Elements slide in from sides
- **Float**: Background elements with floating animation
- **Shimmer**: Loading and error state effects
- **Bounce**: Interactive button animations
- **Glow**: Focus states and hover effects

### Design System
- **Gradient Backgrounds**: Beautiful color gradients
- **Glassmorphism**: Modern glass-like effects
- **Card-based Layout**: Clean, organized content
- **Responsive Design**: Mobile-friendly interface
- **Custom Scrollbar**: Styled scrollbars
- **Animated Counters**: Score animations

### Color Palette
- **Primary**: Indigo (#6366f1) to Purple (#a855f7)
- **Secondary**: Blue (#3b82f6) to Cyan (#06b6d4)
- **Success**: Green (#22c55e) to Emerald (#10b981)
- **Danger**: Red (#ef4444) to Pink (#ec4899)
- **Background**: Gradient backgrounds with floating elements

---

## 🔒 Security

### Implemented Security Measures

1. **Environment Variables**
   - API keys stored in environment variables
   - No hardcoded credentials in source code
   - `.env` files protected by `.gitignore`

2. **Firebase Authentication**
   - Secure token-based authentication
   - Email verification required
   - Password reset functionality
   - OAuth2 for Google Sign-In

3. **CORS Configuration**
   - Configured for specific origins
   - Supports multiple frontend ports
   - Prevents unauthorized cross-origin requests

4. **Input Validation**
   - Server-side validation
   - Client-side validation
   - SQL injection prevention (when database added)

5. **Secure Communication**
   - HTTPS recommended for production
   - Secure Firebase SDK
   - Encrypted authentication tokens

### Best Practices

- Never commit `.env` files
- Rotate API keys regularly
- Use strong passwords
- Enable 2FA on Firebase
- Monitor API usage
- Keep dependencies updated

---

## 🌐 Deployment

### Frontend Deployment

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

### Backend Deployment

#### Render (Recommended)
1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy automatically

#### Railway
1. Connect GitHub repository
2. Configure project
3. Deploy with one click

#### Google Cloud Run
```bash
# Build Docker image
docker build -t ai-mock-interview .

# Push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/ai-mock-interview

# Deploy to Cloud Run
gcloud run deploy ai-mock-interview --image gcr.io/PROJECT_ID/ai-mock-interview --platform managed
```

### Recommended Free Hosting Stack

| Service | Platform | Cost |
|---------|----------|------|
| Frontend | Vercel | Free |
| Backend | Render | Free (with cold starts) |
| Database | Firebase Firestore | Free tier |
| Authentication | Firebase Auth | Free tier |

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing Checklist

- [ ] User registration works
- [ ] Email verification works
- [ ] Login with email/password works
- [ ] Google Sign-In works
- [ ] Password reset works
- [ ] Interview creation works
- [ ] Question answering works
- [ ] Answer evaluation works
- [ ] Results display correctly
- [ ] Dashboard statistics are accurate
- [ ] All animations work smoothly
- [ ] Responsive design works on mobile

---

## 📊 Performance

### Optimization Strategies

1. **Frontend**
   - Code splitting with React.lazy
   - Image optimization
   - CSS minification
   - Tree shaking
   - Lazy loading

2. **Backend**
   - Connection pooling
   - Response caching
   - Async processing
   - Database indexing (when added)

3. **API**
   - Pagination for large datasets
   - Rate limiting
   - Response compression
   - Optimized queries

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Spring AI](https://spring.io/projects/spring-ai) for AI integration
- [Firebase](https://firebase.google.com/) for authentication services
- [OpenAI](https://openai.com/) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling

---

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

<div align="center">

**Built with ❤️ using modern technologies**

⭐ Star this repository if it helped you!

</div>
