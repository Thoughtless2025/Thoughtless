# thoughtless/frontend

This directory contains the React.js frontend application for the My Gemini Chat Blog.

For the main project overview, philosophical context, and general setup instructions, please refer to the primary `README.md` file in the root of the repository.

## Setup & Running

1.  Navigate into this `frontend` directory in your terminal:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    This will usually open the app in your browser at `http://localhost:3000`.

## Important Notes

* **Firebase Configuration:** Ensure `frontend/src/index.js` has your correct Firebase client-side configuration.
* **API Base URL:** Update `frontend/src/services/apiService.js` with the correct URL to your deployed backend serverless functions.
