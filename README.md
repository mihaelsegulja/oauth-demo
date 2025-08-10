# oauth-demo

This is a demo project for Google OAuth login using an ASP.NET 8 backend and an Expo React Native frontend.

Prerequisites

Make sure you have the following installed and set up before starting:

- Node.js (v16+ recommended)
- .NET 8 SDK
- Google Cloud Console project with OAuth credentials

## Backend Setup (ASP.NET 8 Web API)

### Configure secrets

- Create appsettings.Development.json in the backend folder:

```json
{
  "Jwt": {
    "Key": "your_super_secret_key"
  },
  "Google": {
    "BackendClientId": "your_google_backend_client_id_here"
  }
}
```

- Or use User Secrets instead:

```shell
cd backend
dotnet user-secrets init
dotnet user-secrets set "Jwt:Key" "your_super_secret_key"
dotnet user-secrets set "Google:BackendClientId" "your_google_backend_client_id_here"
```

### Run the backend

Run via your IDE or:

```shell
cd backend
dotnet run --project backend
```

The backend will listen by default on http://localhost:5000.

## Frontend Setup (Expo React Native)

### Create .env file in the frontend root

Add your Google client IDs and backend URL:

```env
BACKEND_URL=http://localhost:5000/api/auth/google
IOS_CLIENT_ID=your_ios_client_id_here.apps.googleusercontent.com
ANDROID_CLIENT_ID=your_android_client_id_here.apps.googleusercontent.com
WEB_CLIENT_ID=your_web_client_id_here.apps.googleusercontent.com
```

### Run the frontend

```shell
npm install
npx expo start
```

You can run the app on a simulator, device, or web browser.
