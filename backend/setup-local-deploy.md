# Local Deployment Setup

## 1. Keep Local MongoDB
Your current .env works for local development:
```
MONGODB_URI=mongodb://localhost:27017/blinkit-app
```

## 2. Use ngrok for External Access
```bash
# Install ngrok
npm install -g ngrok

# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Expose backend
ngrok http 5000
```

## 3. Update Frontend API URL
In frontend/src/api/axios.js:
```javascript
const api = axios.create({
  baseURL: 'https://abc123.ngrok.io', // Use ngrok URL
});
```

## 4. Access Your App
- Frontend: http://localhost:3000
- Backend: https://your-ngrok-url.ngrok.io

## 5. Share with Others
They can access via your ngrok URL

## Limitations
- Only works when your laptop is on
- ngrok URL changes each session
- Not suitable for production
