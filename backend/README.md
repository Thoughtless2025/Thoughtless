# thoughtless/backend

This directory contains the Firebase Cloud Functions that serve as the backend API for the My Gemini Chat Blog.

For the main project overview, philosophical context, and general setup instructions, please refer to the primary `README.md` file in the root of the repository.

## Setup & Deployment

1.  Navigate into this `backend` directory in your terminal:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables:** Create a file named `.env` in this `backend` directory. **DO NOT COMMIT `.env` to GitHub!**
    It should contain your sensitive API keys and Firebase Project ID:
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    ADMIN_USER_ID=YOUR_FIREBASE_UID_FOR_ADMIN
    ```
    (Replace placeholders with your actual values.)

4.  **Firebase CLI:** Ensure you have the Firebase CLI installed and configured.
    ```bash
    npm install -g firebase-tools
    firebase login
    firebase use --add YOUR_FIREBASE_PROJECT_ID
    ```
5.  **Deploy Functions:**
    ```bash
    npm run deploy
    ```
    This will deploy your functions to Google Cloud. Note the base URL provided by Firebase CLI after deployment (e.g., `https://us-central1-YOUR_FIREBASE_PROJECT_ID.cloudfunctions.net`). You will need this URL for your frontend `apiService.js`.

6.  **Local Emulation (for testing):**
    ```bash
    npm run serve
    ```
    This will run your functions locally for testing purposes.

## Functions Overview

* `createChat.js`: Initiates a new chat by sending a prompt to Gemini and saving the interaction to Firestore.
* `getChats.js`: Retrieves a list of public chat titles.
* `getChatDetails.js`: Retrieves all interactions (and comments) for a specific chat.
* `addComment.js`: Adds a user comment to either an entire chat or a specific interaction.
