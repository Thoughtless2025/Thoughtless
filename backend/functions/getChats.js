const admin = require("firebase-admin");
const functions = require("firebase-functions"); // Required for HttpsError
const db = admin.firestore();

module.exports = async (req, res) => {
  // CORS is handled by `cors` middleware in `index.js`

  try {
    const chatsRef = db.collection('chats');
    // For now, fetch all public chats. You might add pagination or filtering later.
    const snapshot = await chatsRef.where('isPublic', '==', true).orderBy('lastUpdated', 'desc').get();

    const chats = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      // Only return necessary fields for the chat list view
      chats.push({
        chatId: data.chatId,
        title: data.title,
        lastUpdated: data.lastUpdated // Firestore Timestamp object
      });
    });

    res.status(200).json(chats);

  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Failed to retrieve chat list.", error: error.message });
  }
};
