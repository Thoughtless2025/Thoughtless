// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbI8Tyq7puXnlwxLeeQS1lboKO8b2Q2Jw",
  authDomain: "thoughtlessappnew.firebaseapp.com",
  projectId: "thoughtlessappnew",
  storageBucket: "thoughtlessappnew.firebasestorage.app",
  messagingSenderId: "339537627394",
  appId: "1:339537627394:web:10d9f022262e435cc39a1b",
  measurementId: "G-JJFGTXDYBS"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get Firestore instance
const db = firebase.firestore();

// Function to add chat data to Firestore
async function addChatData(chatTitle, messages) {
  try {
    // Add a new document to the 'chats' collection
    const chatRef = await db.collection("chats").add({
      title: chatTitle,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      // Add other relevant fields from your data model as needed
      // initiatingUser: "user_id", // Replace with actual user ID
      // chatbotIdentifier: "Gemini", // Replace with actual chatbot identifier
    });

    console.log("Chat document created with ID:", chatRef.id);

    // Add messages to the 'messages' sub-collection
    const messagesRef = chatRef.collection("messages");
    for (const message of messages) {
      await messagesRef.add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        senderType: message.senderType, // 'user' or 'chatbot'
        content: message.content,
        // Add other relevant fields from your data model as needed
        // senderId: "user_id", // Replace with actual sender ID
        // rawResponse: "...", // Add raw response if available
        // responseMetadata: { ... }, // Add response metadata if available
      });
    }

    console.log("Messages added to chat document.");

  } catch (error) {
    console.error("Error adding chat data to Firestore:", error);
  }
}

// TODO: Implement function to display chat data from Firestore
