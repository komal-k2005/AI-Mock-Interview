# 🚀 Detailed Deployment Guide

Complete step-by-step instructions for deploying the AI Mock Interview Platform to production.

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ GitHub account with repository created
- ✅ Vercel account (free)
- ✅ Render account (free)
- ✅ Firebase project created
- ✅ OpenAI API key (optional, for AI features)
- ✅ Code pushed to GitHub

---

## 🌐 Phase 1: Deploy Frontend to Vercel

### Step 1.1: Install Vercel CLI

**Option A: Using npm (Recommended)**
```bash
npm install -g vercel
```

**Option B: Using Vercel Dashboard (No CLI)**
- Skip CLI installation
- Use Vercel web interface instead

### Step 1.2: Login to Vercel

**If using CLI:**
```bash
vercel login
```
- Select your preferred login method (GitHub, GitLab, Bitbucket, or Email)
- Follow the authentication flow in your browser
- Return to terminal when authenticated

**If using Dashboard:**
- Go to [vercel.com](https://vercel.com)
- Click "Login"
- Sign in with your GitHub account

### Step 1.3: Prepare Frontend for Deployment

```bash
cd C:\Users\k\Documents\AI-Mock-Interview\frontend
```

**Verify build works locally:**
```bash
npm run build
```

**Expected output:**
```
✓ built in X.XXs
dist/index.html                  X.XX kB │ gzip: X.XX kB
dist/assets/...
```

### Step 1.4: Deploy to Vercel (CLI Method)

**Deploy to preview:**
```bash
vercel
```

**You will be prompted with these questions:**

1. **Set up and deploy "C:\Users\k\Documents\AI-Mock-Interview\frontend"?**
   - Press `Y` or `Enter` to confirm

2. **Which scope do you want to deploy to?**
   - Select your username or team

3. **Link to existing project?**
   - Press `N` for new project

4. **What's your project's name?**
   - Enter: `ai-mock-interview-frontend`
   - This will be your project URL: `ai-mock-interview-frontend.vercel.app`

5. **In which directory is your code located?**
   - It should auto-detect: `./`
   - Press `Enter` to confirm

6. **Want to modify these settings?**
   - Press `N` to use defaults, or `Y` to customize

**Deployment process:**
- Vercel will detect it's a Vite project
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

**Wait for deployment to complete** (usually 1-2 minutes)

**Save the preview URL** provided at the end.

### Step 1.5: Deploy to Production

```bash
vercel --prod
```

This deploys to your production domain.

**Save the production URL:**
- Format: `https://ai-mock-interview-frontend.vercel.app`
- Or your custom domain if configured

### Step 1.6: Configure Environment Variables in Vercel

**Option A: Using Vercel Dashboard**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project: `ai-mock-interview-frontend`
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** for each variable:

**Required Variables:**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `REACT_APP_FIREBASE_API_KEY` | Your Firebase API key | From Firebase Console |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` | From Firebase Console |
| `REACT_APP_FIREBASE_PROJECT_ID` | `your-project-id` | From Firebase Console |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` | From Firebase Console |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID | From Firebase Console |
| `REACT_APP_FIREBASE_APP_ID` | Your app ID | From Firebase Console |
| `REACT_APP_FIREBASE_MEASUREMENT_ID` | Your measurement ID | From Firebase Console |
| `REACT_APP_API_URL` | Backend URL (will add later) | Will be set after backend deployment |

**How to get Firebase config:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps"
5. Click the Web app icon (</>)
6. Copy the values from "Firebase SDK snippet"

**After adding all variables:**
- Click **Save**
- Redeploy: Go to **Deployments** → Click **Redeploy**

**Option B: Using CLI**

```bash
vercel env add REACT_APP_FIREBASE_API_KEY
# Paste your value when prompted
# Select environment: Production, Preview, Development
# Select all three for consistency

# Repeat for all variables
vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN
vercel env add REACT_APP_FIREBASE_PROJECT_ID
vercel env add REACT_APP_FIREBASE_STORAGE_BUCKET
vercel env add REACT_APP_FIREBASE_MESSAGING_SENDER_ID
vercel env add REACT_APP_FIREBASE_APP_ID
vercel env add REACT_APP_FIREBASE_MEASUREMENT_ID
```

### Step 1.7: Configure Custom Domain (Optional)

**Step 1.7.1: Buy a Domain**
- Go to domain registrar (Namecheap, GoDaddy, Google Domains, etc.)
- Purchase your domain (e.g., `interview.yourdomain.com`)

**Step 1.7.2: Add Domain to Vercel**

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Click **Add Domain**
3. Enter your domain: `interview.yourdomain.com`
4. Click **Add**

**Step 1.7.3: Update DNS Records**

Vercel will show you the DNS records to add. Usually:

**If using A records:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**If using CNAME:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Step 1.7.4: Wait for SSL Certificate**

- Vercel will automatically provision SSL
- Usually takes 5-30 minutes
- You'll see a green lock icon when ready

---

## 🔧 Phase 2: Deploy Backend to Render

### Step 2.1: Prepare Backend

```bash
cd C:\Users\k\Documents\AI-Mock-Interview\backend
```

**Verify build works locally:**
```bash
.\mvnw.cmd clean package -DskipTests
```

**Expected output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time:  XX.XXX s
```

**Verify JAR file exists:**
```bash
dir target
```

You should see: `backend-0.0.1-SNAPSHOT.jar`

### Step 2.2: Ensure Procfile Exists

Check if `Procfile` exists in backend root:
```bash
type Procfile
```

**Content should be:**
```
web: java -jar target/backend-0.0.1-SNAPSHOT.jar
```

**If missing, create it:**
```bash
echo web: java -jar target/backend-0.0.1-SNAPSHOT.jar > Procfile
```

### Step 2.3: Push Code to GitHub

If not already pushed:
```bash
cd C:\Users\k\Documents\AI-Mock-Interview
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2.4: Create Render Account

1. Go to [render.com](https://render.com)
2. Click **Sign Up**
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories
5. Complete your profile setup

### Step 2.5: Create New Web Service

1. In Render Dashboard, click **New +**
2. Select **Web Service**
3. Click **Connect GitHub**
4. Find and select your repository: `AI-Mock-Interview`
5. Click **Connect**

### Step 2.6: Configure Build Settings

**General Settings:**

1. **Name:** `ai-mock-interview-backend`
2. **Region:** Select closest to your users (e.g., Oregon, Frankfurt, Singapore)
3. **Branch:** `main`

**Build Settings:**

1. **Runtime:** Docker (recommended) or Native
2. **Build Command:** `mvn clean package -DskipTests`
3. **Start Command:** `java -jar target/backend-0.0.1-SNAPSHOT.jar`

**Important Notes:**
- If using Docker, Render will auto-detect from root if Dockerfile exists
- If using Native, use the Maven wrapper

### Step 2.7: Configure Environment Variables

Scroll down to **Environment Variables** section

**Add each variable:**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `OPENAI_API_KEY` | `sk-proj-...` | Your OpenAI API key |
| `GOOGLE_APPLICATION_CREDENTIALS` | Base64 string | Encoded Firebase key |
| `PORT` | `8080` | Server port |
| `SPRING_PROFILES_ACTIVE` | `production` | Spring profile |
| `LOGGING_LEVEL` | `INFO` | Logging level |
| `FRONTEND_URL` | Your Vercel URL | Frontend URL for CORS |

**How to encode Firebase service account key:**

**On Windows PowerShell:**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("firebase-service-account.json"))
```

**On macOS/Linux:**
```bash
base64 -i firebase-service-account.json
```

**Steps:**
1. Copy the base64 string
2. Paste it as the value for `GOOGLE_APPLICATION_CREDENTIALS`
3. Add variable
4. Repeat for all variables

### Step 2.8: Deploy

Click **Create Web Service**

**Deployment Process:**
- Render will clone your repository
- Run the build command
- Start the application
- Provide a temporary URL

**Wait for deployment** (usually 2-5 minutes)

**Status indicators:**
- 🟡 Yellow: Building
- 🟢 Green: Live
- 🔴 Red: Failed (check logs)

### Step 2.9: Save Backend URL

After successful deployment, you'll get a URL like:
- `https://ai-mock-interview-backend.onrender.com`

**Save this URL** - you'll need it for frontend configuration.

### Step 2.10: Update Frontend with Backend URL

**Go back to Vercel:**

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `REACT_APP_API_URL`
3. Update value with your Render backend URL:
   ```
   https://ai-mock-interview-backend.onrender.com
   ```
4. Click **Save**
5. Go to **Deployments** → Click **Redeploy**

---

## 🔗 Phase 3: Update CORS Configuration

### Step 3.1: Verify CORS is Configured

Your backend should have:
- `FRONTEND_URL` environment variable set
- SecurityConfig.java with CORS configuration

### Step 3.2: Test CORS

**Option A: Using curl**
```bash
curl -X GET https://your-backend.onrender.com/api/dashboard \
  -H "Origin: https://your-frontend.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

**Option B: Using browser**
1. Open browser DevTools (F12)
2. Go to Console
3. Try accessing your frontend
4. Check for CORS errors

**If CORS errors occur:**
1. Verify `FRONTEND_URL` matches exactly (no trailing slash)
2. Ensure HTTPS is used for both
3. Check Render logs for configuration errors
4. Redeploy backend if needed

---

## ✅ Phase 4: Post-Deployment Verification

### Step 4.1: Test Frontend

1. Open your frontend URL in browser
2. Check page loads without errors
3. Open DevTools (F12) → Console
4. Verify no errors
5. Check Network tab for failed requests

### Step 4.2: Test Backend Health

```bash
curl https://your-backend.onrender.com/api/dashboard
```

Expected: JSON response with dashboard data or error

### Step 4.3: Test Authentication

**Test Register:**
1. Go to frontend URL
2. Click "Register"
3. Fill in: Name, Email, Password
4. Click "Register"
5. Check email for verification link
6. Click verification link
7. Try to login

**Test Login:**
1. Go to "Login"
2. Enter email and password
3. Click "Login"
4. Should redirect to Dashboard

**Test Google Sign-In:**
1. Click "Register" or "Login"
2. Click "Sign in with Google"
3. Authorize with Google account
4. Should redirect to Dashboard

### Step 4.4: Test Interview Flow

**Create Interview:**
1. Go to Dashboard
2. Click "New Interview"
3. Fill form:
   - Target Role: "Java Developer"
   - Interview Type: "Technical"
   - Difficulty: "Medium"
   - Number of Questions: 5
4. Click "Start Interview"

**Take Interview:**
1. Answer questions
2. Click "Next" between questions
3. Submit final answer

**View Results:**
1. Check results page loads
2. Verify scores display
3. Check feedback is shown

### Step 4.5: Test Mobile

1. Open frontend URL on mobile device
2. Or use Chrome DevTools (F12) → Toggle device toolbar
3. Test on iPhone SE, iPad, Android
4. Verify responsive design works

### Step 4.6: Check Logs

**Vercel Logs:**
1. Vercel Dashboard → Your Project → Logs
2. Check for errors
3. Filter by: Serverless Function, Build, Runtime

**Render Logs:**
1. Render Dashboard → Your Service → Logs
2. Check for errors
3. Filter by: Build, Runtime

---

## 🔍 Phase 5: Troubleshooting Common Issues

### Issue 1: Frontend Build Fails

**Error:** `npm run build` fails

**Solution:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue 2: Backend Build Fails

**Error:** Maven build fails on Render

**Solution:**
1. Check Render logs for specific error
2. Verify Java version in pom.xml (should be 17)
3. Check Maven wrapper files are committed
4. Verify pom.xml syntax is correct

### Issue 3: Environment Variables Not Working

**Error:** Variables not accessible in code

**Solution:**
1. Verify variable names match exactly
   - Frontend: Must start with `REACT_APP_`
   - Backend: No prefix required
2. Redeploy after adding variables
3. Check platform logs for variable loading errors
4. Verify .gitignore is not blocking .env files

### Issue 4: CORS Errors

**Error:** `Access-Control-Allow-Origin` error

**Solution:**
1. Verify `FRONTEND_URL` matches exactly
2. Check protocol (http vs https)
3. Ensure no trailing slash in URL
4. Verify SecurityConfig.java is present
5. Redeploy backend after changes

### Issue 5: Firebase Configuration Not Loading

**Error:** Firebase fails to initialize

**Solution:**
1. Verify all Firebase variables are set
2. Check for typos in variable names
3. Ensure API key is valid
4. Check browser console for specific error
5. Verify Firebase project is not deleted

### Issue 6: Backend Not Starting

**Error:** Backend crashes on startup

**Solution:**
1. Check Render logs for stack trace
2. Verify `OPENAI_API_KEY` is set (even if not using AI)
3. Check Firebase service account key is valid
4. Verify port configuration
5. Check for missing dependencies

---

## 📊 Phase 6: Monitor Performance

### Step 6.1: Frontend Performance

**Run Lighthouse:**
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Performance"
4. Click "Analyze page load"
5. Target scores:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### Step 6.2: Backend Performance

**Check Render Dashboard:**
1. Go to your service → Metrics
2. Check response times
3. Check memory usage
4. Check CPU usage
5. Check error rate

**Target:**
- Response time: < 200ms for simple calls
- Memory: < 512MB
- CPU: < 50%
- Error rate: < 1%

---

## 🎉 Phase 7: Final Steps

### Step 7.1: Set Up Monitoring

**Vercel Analytics:**
1. Vercel Dashboard → Your Project → Analytics
2. Enable analytics
3. Check visitor data

**Render Monitoring:**
1. Render Dashboard → Your Service
2. Enable metrics
3. Set up alert notifications

### Step 7.2: Set Up Error Tracking (Optional)

**Using Sentry:**
1. Sign up at [sentry.io](https://sentry.io)
2. Create new project
3. Add Sentry SDK to frontend
4. Configure error tracking

### Step 7.3: Share Your App

**Copy your URLs:**
- Frontend: `https://ai-mock-interview-frontend.vercel.app`
- Backend: `https://ai-mock-interview-backend.onrender.com`

**Share with:**
- Team members
- Test users
- Stakeholders

---

## 📝 Quick Reference Commands

### Frontend
```bash
cd frontend
npm install
npm run build
npm run preview
vercel
vercel --prod
```

### Backend
```bash
cd backend
.\mvnw.cmd clean package -DskipTests
.\mvnw.cmd spring-boot:run
```

### Git
```bash
git status
git add .
git commit -m "message"
git push origin main
```

---

## 🆘 Support Resources

**Vercel Documentation:**
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel Domains](https://vercel.com/docs/projects/domains-configuration)

**Render Documentation:**
- [Render Docs](https://render.com/docs)
- [Render Environment Variables](https://render.com/docs/env-vars)
- [Render Web Services](https://render.com/docs/web-services)

**Firebase Documentation:**
- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

---

## ✅ Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables configured (frontend)
- [ ] Environment variables configured (backend)
- [ ] CORS working correctly
- [ ] Authentication tested
- [ ] Interview flow tested
- [ ] Mobile responsive tested
- [ ] Performance verified
- [ ] Logs checked for errors
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up (optional)

---

**🎉 Deployment Complete! Your AI Mock Interview Platform is now live!**
