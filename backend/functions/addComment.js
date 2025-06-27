const admin = require("firebase-admin");
const functions = require("firebase-functions");
const db = admin.firestore();

// This is an onCall function, so it handles CORS automatically and requires authentication by default
module.exports = async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to add a comment.');
  }

  const { chatId, targetId, commentText, targetType, userName } = data;

  if (!chatId || !targetId || !commentText || !targetType) {
    throw new functions.https.HttpsError('invalid-argument', 'Chat ID, target ID, comment text, and target type are required.');
  }
  if (targetType !== 'chat' && targetType !== 'interaction') {
    throw new functions.https.HttpsError('invalid-argument', 'Target type must be "chat" or "interaction".');
  }

  try {
    const chatRef = db.collection('chats').doc(chatId);
    const doc = await chatRef.get();

    if (!doc.exists) {
      throw new functions.https.HttpsError('not-found', 'Chat not found.');
    }

    const chatData = doc.data();

    // Ensure the chat is public before allowing comments
    if (!chatData.isPublic) {
      throw new functions.https.HttpsError('permission-denied', 'Cannot comment on a private chat.');
    }

    const newCommentData = {
      userId: context.auth.uid,
      userName: userName || context.auth.token.email || 'Anonymous User', // Use provided name or Firebase user data
      text: commentText,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    if (targetType === 'chat') {
      // Add comment to the overall chat
      await chatRef.update({
        comments: admin.firestore.FieldValue.arrayUnion(newCommentData),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      });
    } else if (targetType === 'interaction') {
      // Add comment to a specific interaction
      const interactionIndex = chatData.interactions.findIndex(int => int.id === targetId);

      if (interactionIndex === -1) {
        throw new functions.https.HttpsError('not-found', 'Interaction not found within the chat.');
      }

      // Use a transaction to safely update the nested array
      await db.runTransaction(async (transaction) => {
        const currentDoc = await transaction.get(chatRef);
        if (!currentDoc.exists) {
          throw new functions.https.HttpsError('not-found', 'Chat not found during transaction.');
        }

        const currentInteractions = currentDoc.data().interactions;
        const targetInteraction = currentInteractions[interactionIndex];

        // Ensure comments array exists, then add
        const updatedComments = targetInteraction.comments ? [...targetInteraction.comments, newCommentData] : [newCommentData];
        currentInteractions[interactionIndex] = { ...targetInteraction, comments: updatedComments };

        transaction.update(chatRef, {
          interactions: currentInteractions,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        });
      });
    }

    return { success: true, message: "Comment added successfully!" };

  } catch (error) {
    console.error("Error adding comment:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to add comment due to an internal server error.', error.message);
  }
};
