const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const functions = require("firebase-functions"); // Import functions to use Timestamp
require("dotenv").config(); // Ensure dotenv is configured for local testing

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const db = admin.firestore();

// This is an onCall function, so it handles CORS automatically and requires authentication by default
module.exports = async (data, context) => {
  // Check if user is authenticated (required for creating chats)
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to create a chat.');
  }

  // Optional: Restrict chat creation to a specific admin user
  // Replace YOUR_FIREBASE_UID_FOR_ADMIN with the actual UID from your .env file
  const adminUserId = process.env.ADMIN_USER_ID;
  if (context.auth.uid !== adminUserId) {
    throw new functions.https.HttpsError('permission-denied', 'Only authorized users can create new chats.');
  }

  const { prompt } = data;

  if (!prompt) {
    throw new functions.https.HttpsError('invalid-argument', 'Prompt text is required.');
  }

  try {
    const promptTimestamp = admin.firestore.Timestamp.now(); // Timestamp for when the prompt was sent

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const geminiText = response.text();

    const responseTimestamp = admin.firestore.Timestamp.now(); // Timestamp for when the response was received

    // Create a new chat document in Firestore
    const newChatRef = db.collection('chats').doc(); // Firestore generates unique ID
    const chatId = newChatRef.id;

    const chatData = {
      chatId: chatId,
      adminUserId: context.auth.uid, // Store the UID of the user who created the chat
      title: prompt.substring(0, 50) + "...", // Use first 50 chars of prompt as title
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      isPublic: true, // New chats are public by default
      interactions: [
        {
          id: 'int001', // Simple ID for the first interaction
          prompt: prompt,
          promptTimestamp: promptTimestamp,
          response: geminiText,
          responseTimestamp: responseTimestamp,
          comments: [] // Initialize comments array for interaction
        }
      ],
      comments: [] // Initialize comments array for the chat itself
    };

    await newChatRef.set(chatData);

    return { success: true, chatId: chatId, title: chatData.title, firstResponse: geminiText };

  } catch (error) {
    console.error("Error creating chat:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error; // Re-throw already handled HttpsErrors
    }
    throw new functions.https.HttpsError('internal', 'Failed to create chat due to an internal server error.', error.message);
  }
};
