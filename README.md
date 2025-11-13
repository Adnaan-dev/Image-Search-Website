# Image Search - MERN + OAuth Project

A full-stack image search application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring OAuth authentication with Google, Facebook, and GitHub. Users can search for images using the Unsplash API, select multiple images, and view their search history.

## Features

- **OAuth Authentication**: Login with Google, Facebook, or GitHub
- **Image Search**: Search images using Unsplash API
- **Multi-Select**: Select multiple images with checkboxes
- **Top Searches**: View top 5 most searched terms across all users
- **Search History**: View your personal search history
- **Responsive Design**: Modern UI with responsive layout

## Project Structure

```
UDStudios/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js       # Main dashboard component
│   │   │   ├── Login.js           # OAuth login component
│   │   │   ├── TopSearchesBanner.js
│   │   │   ├── SearchSection.js
│   │   │   ├── ImageGrid.js
│   │   │   └── HistorySidebar.js
│   │   ├── App.js                 # Main app component
│   │   ├── App.css                # Global styles
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   │   └── passport.js            # OAuth strategies
│   ├── middleware/
│   │   └── auth.js                # Authentication middleware
│   ├── models/
│   │   ├── User.js                # User model
│   │   └── Search.js              # Search history model
│   ├── routes/
│   │   ├── auth.js                # OAuth routes
│   │   ├── search.js              # Search endpoint
│   │   ├── topSearches.js         # Top searches endpoint
│   │   └── history.js             # User history endpoint
│   ├── server.js                  # Express server
│   └── package.json
└── README.md
```
## Screenshots
#### OAuth (for logging in)
![Image](https://github.com/user-attachments/assets/8451dd26-bdc0-44d1-b2a8-1e57ed7d990f)

#### Main UI
![Image](https://github.com/user-attachments/assets/4eab7311-df36-4422-99a3-95966bb84121)

#### Top Searches
![Image](https://github.com/user-attachments/assets/a78a4de3-a995-499b-a4f7-b896b2ccc4b3)

#### Search History
![Image](https://github.com/user-attachments/assets/b0758fe1-4982-4464-99f6-a06918c99304)

#### MongoDB Integrated
![Image](https://github.com/user-attachments/assets/2a81cd76-1f22-404c-9be0-09cbc2e11d87)



## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Unsplash API Access Key
- OAuth credentials for Google, Facebook, and/or GitHub

### 1. Clone the Repository

```bash
git clone <repository-url>
cd UDStudios
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/
SESSION_SECRET=your-session-secret-key-here

# Unsplash API
UNSPLASH_ACCESS_KEY=your-unsplash-access-key

# OAuth Google - I have included Google OAuth as an example in this project

#OAuth Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth Facebook
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# OAuth GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Frontend URL (for CORS and OAuth redirects)
CLIENT_URL=http://localhost:3000
```

**Note**: You can omit OAuth providers you don't want to use. The application will work with any combination of enabled providers.

#### Getting API Keys

1. **Unsplash API**:
   - Visit https://unsplash.com/developers
   - Create a new application
   - Copy your Access Key

2. **Google OAuth**:
   - Visit https://console.cloud.google.com/
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - **Authorized JavaScript origins**: Add `http://localhost:3000`
   - **Authorized redirect URIs**: Add `http://localhost:5000/api/auth/google/callback`

3. **Facebook OAuth**:
   - Visit https://developers.facebook.com/
   - Create a new app
   - Add Facebook Login product
   - Set redirect URI: `http://localhost:5000/api/auth/facebook/callback`

4. **GitHub OAuth**:
   - Visit https://github.com/settings/developers
   - Create a new OAuth App
   - Set Authorization callback URL: `http://localhost:5000/api/auth/github/callback`

### 3. Frontend Setup

```bash
cd ../client
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system. If using MongoDB Atlas, update `MONGODB_URI` in your `.env` file.

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

#### `GET /api/auth/google`
Initiates Google OAuth login.

#### `GET /api/auth/google/callback`
Google OAuth callback (handled automatically).

#### `GET /api/auth/facebook`
Initiates Facebook OAuth login.

#### `GET /api/auth/facebook/callback`
Facebook OAuth callback (handled automatically).

#### `GET /api/auth/github`
Initiates GitHub OAuth login.

#### `GET /api/auth/github/callback`
GitHub OAuth callback (handled automatically).

#### `GET /api/auth/user`
Get current authenticated user.

**Response:**
```json
{
  "_id": "user_id",
  "username": "username",
  "email": "user@example.com",
  "displayName": "User Name",
  "provider": "google",
  "avatar": "https://..."
}
```

#### `POST /api/auth/logout`
Logout current user.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Search

#### `POST /api/search`
Search for images using Unsplash API.

**Headers:**
```
Cookie: (session cookie from authentication)
```

**Request Body:**
```json
{
  "term": "nature"
}
```

**Response:**
```json
{
  "term": "nature",
  "count": 20,
  "images": [
    {
      "id": "image_id",
      "url": "https://images.unsplash.com/...",
      "thumbUrl": "https://images.unsplash.com/...",
      "description": "Image description",
      "author": "Photographer Name",
      "authorUrl": "https://unsplash.com/@username"
    }
  ]
}
```

### Top Searches

#### `GET /api/top-searches`
Get top 5 most searched terms across all users.

**Response:**
```json
[
  {
    "term": "nature",
    "count": 45
  },
  {
    "term": "mountains",
    "count": 32
  }
]
```

### History

#### `GET /api/history`
Get authenticated user's search history.

**Headers:**
```
Cookie: (session cookie from authentication)
```

**Response:**
```json
[
  {
    "term": "nature",
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  {
    "term": "mountains",
    "timestamp": "2024-01-15T09:15:00.000Z"
  }
]
```

## API Testing Examples

### Using cURL

#### Search (requires authentication cookie)
```bash
# First login via browser, then use the session cookie
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=your-session-id" \
  -d '{"term": "nature"}'
```

#### Top Searches
```bash
curl http://localhost:5000/api/top-searches
```

#### Get Current User
```bash
curl http://localhost:5000/api/auth/user \
  -H "Cookie: connect.sid=your-session-id"
```

### Using Postman

1. **Setup Environment Variables**:
   - `baseUrl`: `http://localhost:5000`
   - `sessionCookie`: (get from browser after login)

2. **Login Flow**:
   - Use browser to login via OAuth
   - Copy the `connect.sid` cookie from browser DevTools
   - Add it to Postman as a cookie or header

3. **Test Endpoints**:
   - Import the collection (see below) or create requests manually
   - Add the session cookie to authenticated requests

## Postman Collection

```json
{
  "info": {
    "name": "Image Search API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Top Searches",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}}/api/top-searches",
          "host": ["{{baseUrl}}"],
          "path": ["api", "top-searches"]
        }
      }
    },
    {
      "name": "Get Current User",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Cookie",
            "value": "connect.sid={{sessionCookie}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/auth/user",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "user"]
        }
      }
    },
    {
      "name": "Search Images",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Cookie",
            "value": "connect.sid={{sessionCookie}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"term\": \"nature\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/search",
          "host": ["{{baseUrl}}"],
          "path": ["api", "search"]
        }
      }
    },
    {
      "name": "Get Search History",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Cookie",
            "value": "connect.sid={{sessionCookie}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/history",
          "host": ["{{baseUrl}}"],
          "path": ["api", "history"]
        }
      }
    },
    {
      "name": "Logout",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Cookie",
            "value": "connect.sid={{sessionCookie}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/auth/logout",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "logout"]
        }
      }
    }
  ]
}
```

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with OAuth strategies
- **API**: Unsplash API
- **Styling**: CSS3 with modern responsive design

## Features Implementation

### 1. Authentication
- OAuth integration with Google, Facebook, and GitHub
- Session-based authentication using Express sessions
- Protected routes on both frontend and backend

### 2. Top Searches Banner
- Aggregates search terms across all users
- Displays top 5 most frequent searches
- Clickable items that trigger a new search

### 3. Search Functionality
- Stores search history in MongoDB
- Fetches images from Unsplash API
- Displays results in a responsive 4-column grid
- Shows search term and result count

### 4. Multi-Select Counter
- Client-side state management for selected images
- Visual checkbox overlay on each image
- Dynamic counter showing number of selected images

### 5. Search History
- User-specific search history
- Timestamp display with relative time formatting
- Clickable history items to re-search

## Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd client
npm start  # Runs on http://localhost:3000
```

## Production Deployment

1. Set `NODE_ENV=production` in your `.env`
2. Update `CLIENT_URL` to your production frontend URL
3. Set secure cookies: `secure: true` in session config
4. Build frontend: `cd client && npm run build`
5. Serve frontend build with Express static or a CDN

## License

This project is open source and available under the MIT License.


## 📢 Connect with Me
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github&logoColor=white)](https://github.com/Adnaan-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jan-adnan-farooq-b216b7321/)

⭐ **Star this repository if you find it useful!** 🚀

**Built by Adnan with ❤️ using MERN + OAuth**
