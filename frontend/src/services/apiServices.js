import { getAuth, signOut } from 'firebase/auth'; // Import signOut from firebase/auth

const API_BASE_URL = 'YOUR_SERVERLESS_FUNCTION_BASE_URL'; // e.g., 'https://us-central1-YOUR_FIREBASE_PROJECT_ID.cloudfunctions.net'

// Utility function to get auth token for authenticated requests
async function getAuthToken() {
  const auth = getAuth();
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return null;
}

// Helper for making authenticated fetch requests
async function authenticatedFetch(url, options = {}) {
  const token = await getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(options.headers || {})
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const createChat = async (promptText) => {
  return authenticatedFetch(`${API_BASE_URL}/createChat`, {
    method: 'POST',
    body: JSON.stringify({ prompt: promptText })
  });
};

export const getChats = async () => {
  return authenticatedFetch(`${API_BASE_URL}/getChats`);
};

export const getChatDetails = async (chatId) => {
  return authenticatedFetch(`${API_BASE_URL}/getChatDetails?chatId=${chatId}`);
};

export const addComment = async (chatId, targetId, commentText, targetType) => {
  const auth = getAuth();
  const userName = auth.currentUser ? (auth.currentUser.displayName || auth.currentUser.email) : 'Anonymous'; // Get user's name/email for comment

  return authenticatedFetch(`${API_BASE_URL}/addComment`, {
    method: 'POST',
    body: JSON.stringify({
      chatId,
      targetId, // Can be 'chat' or an interaction.id
      commentText,
      targetType, // 'chat' or 'interaction'
      userName
    })
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  await signOut(auth);
};
