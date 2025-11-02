# Quick Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Unsplash API key
- OAuth app credentials (at least one: Google, Facebook, or GitHub)

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/
SESSION_SECRET=generate-a-random-secret-key-here
UNSPLASH_ACCESS_KEY=your-unsplash-key
CLIENT_URL=http://localhost:3000
```

**OAuth Credentials** (at least one required):
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
# Windows (if installed as service, it should auto-start)
# Or use MongoDB Compass

# Mac/Linux
mongod
```

**MongoDB Atlas:**
- Update `MONGODB_URI` with your Atlas connection string

### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Server should start on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```
Frontend should start on `http://localhost:3000`

### 5. Test the Application

1. Open `http://localhost:3000`
2. Click on an OAuth provider to login
3. Search for images (e.g., "nature", "mountains")
4. Select images using checkboxes
5. View your search history in the sidebar
6. Click on top searches banner items

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, verify IP whitelist and credentials

### OAuth Login Not Working
- Verify OAuth app credentials in `.env`
- Check redirect URIs match exactly:
  - Google: `http://localhost:5000/api/auth/google/callback`
  - Facebook: `http://localhost:5000/api/auth/facebook/callback`
  - GitHub: `http://localhost:5000/api/auth/github/callback`
- Ensure `CLIENT_URL` in `.env` is correct

### Unsplash API Error
- Verify `UNSPLASH_ACCESS_KEY` is correct
- Check API rate limits (50 requests/hour for demo)

### CORS Issues
- Ensure `CLIENT_URL` in backend `.env` matches frontend URL
- Check that credentials are enabled (already configured)

## Getting API Keys

### Unsplash
1. Go to https://unsplash.com/developers
2. Create account/login
3. Create new application
4. Copy Access Key

### Google OAuth
1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. **Authorized JavaScript origins**: Add `http://localhost:3000`
6. **Authorized redirect URIs**: Add `http://localhost:5000/api/auth/google/callback`

### Facebook OAuth
1. Go to https://developers.facebook.com/
2. Create new app → Add Facebook Login
3. Set redirect URI: `http://localhost:5000/api/auth/facebook/callback`
4. Copy App ID and App Secret

### GitHub OAuth
1. Go to https://github.com/settings/developers
2. New OAuth App
3. Set callback URL: `http://localhost:5000/api/auth/github/callback`
4. Copy Client ID and Client Secret

## Next Steps

- Review the full README.md for detailed API documentation
- Import `postman_collection.json` to test API endpoints
- Customize the UI styling in `client/src/App.css`

