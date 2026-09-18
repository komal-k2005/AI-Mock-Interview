# 🎯 Quick Start Deployment - What You Need to Do

## 📋 Pre-Deployment: Commit Your Code

**Step 1: Stage all changes**
```bash
cd C:\Users\k\Documents\AI-Mock-Interview
git add .
```

**Step 2: Commit with message**
```bash
git commit -m "Pre-deployment optimization and security hardening"
```

**Step 3: Push to GitHub**
```bash
git push origin main
```

---

## 🌐 Step 1: Deploy Frontend to Vercel

### Option A: Use Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Import your GitHub repository**: `AI-Mock-Interview`
5. **Select "frontend" folder** as root directory
6. **Framework Preset**: Vite
7. **Build Command**: `npm run build`
8. **Output Directory**: `dist`
9. **Click "Deploy"**

**Wait 1-2 minutes** → Your frontend will be live!

**Save your URL**: `https://ai-mock-interview-frontend.vercel.app`

### Option B: Use Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
cd frontend
vercel
```

4. **Deploy to production**
```bash
vercel --prod
```

---

## 🔧 Step 2: Add Environment Variables to Vercel

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add these variables** (get from Firebase Console):

```
REACT_APP_FIREBASE_API_KEY = your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID = your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET = your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = your-sender-id
REACT_APP_FIREBASE_APP_ID = your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID = your-measurement-id
```

3. **Click "Save"**
4. **Redeploy** (Deployments → Redeploy)

---

## 🔧 Step 3: Deploy Backend to Render

1. **Go to [render.com](https://render.com)**
2. **Sign up** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect GitHub** → Select `AI-Mock-Interview` repository
5. **Configure:**
   - **Name**: `ai-mock-interview-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
6. **Click "Create Web Service"**

**Wait 2-5 minutes** → Your backend will be live!

**Save your URL**: `https://ai-mock-interview-backend.onrender.com`

---

## 🔧 Step 4: Add Environment Variables to Render

1. **Go to Render Dashboard** → Your Service → Environment Variables
2. **Add these variables:**

```
OPENAI_API_KEY = your-openai-api-key
GOOGLE_APPLICATION_CREDENTIALS = base64-encoded-firebase-key
PORT = 8080
SPRING_PROFILES_ACTIVE = production
LOGGING_LEVEL = INFO
FRONTEND_URL = https://ai-mock-interview-frontend.vercel.app
```

**How to get base64-encoded Firebase key:**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("firebase-service-account.json"))
```

3. **Click "Save Changes"**
4. **Render will automatically redeploy**

---

## 🔗 Step 5: Update Frontend with Backend URL

1. **Go back to Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Update `REACT_APP_API_URL`:**
   ```
   https://ai-mock-interview-backend.onrender.com
   ```
4. **Click "Save"**
5. **Redeploy**

---

## ✅ Step 6: Test Your Application

1. **Open your frontend URL** in browser
2. **Test Register:**
   - Create new account
   - Check email for verification
3. **Test Login:**
   - Login with credentials
4. **Test Interview:**
   - Create interview
   - Answer questions
   - View results

---

## 🎉 Complete!

Your AI Mock Interview Platform is now live!

**Your URLs:**
- Frontend: `https://ai-mock-interview-frontend.vercel.app`
- Backend: `https://ai-mock-interview-backend.onrender.com`

---

## 🆘 Need Help?

**Detailed Guide:** See `DETAILED_DEPLOYMENT_GUIDE.md`

**Common Issues:**
- Build fails → Clear cache and rebuild
- CORS errors → Check FRONTEND_URL matches exactly
- Variables not working → Redeploy after adding them
- Firebase errors → Verify all Firebase variables are set

---

**🚀 Happy Deploying!**
