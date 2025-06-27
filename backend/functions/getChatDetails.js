const admin = require("firebase-admin");
const functions = require("firebase-functions"); // Required for HttpsError
const db = admin.firestore();

module.exports = async (req, res) => {
  // CORS is handled by `cors` middleware in `index.js`

  const chatId = req.query.chatId;

  if (!chatId) {
    return res.status(400).json({ message: "Chat ID is required." });
  }

  try {
    const chatRef = db.collection('chats').doc(chatId);
    const doc = await chatRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Chat not found." });
    }

    const chatData = doc.data();

    // Ensure the chat is public, or check for admin access if implemented
    if (!chatData.isPublic) {
      // You could add logic here to check if context.auth.uid === chatData.adminUserId
      // For now, if not public, it's not accessible.
      throw new functions.https.HttpsError('permission-denied', 'This chat is not public.');
    }

    // Return the full chat data
    res.status(200).json(chatData);

  } catch (error) {
    console.error("Error fetching chat details:", error);
    if (error instanceof functions.https.HttpsError) {
      // If it's an HttpsError we threw, send its details
      return res.status(error.code === 'permission-denied' ? 403 : 500).json({ message: error.message, details: error.details });
    }
    res.status(500).json({ message: "Failed to retrieve chat details.", error: error.message });
  }
};
