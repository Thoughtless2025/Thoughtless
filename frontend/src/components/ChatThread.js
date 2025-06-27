import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getChatDetails, addComment } from '../services/apiService';
import './ChatThread.css'; // You'll create this or a similar CSS file

function ChatThread({ currentUser }) {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentTargetId, setCommentTargetId] = useState(null); // Which interaction/chat is being commented on
  const [isCommenting, setIsCommenting] = useState(false); // UI state for comment box
  const commentInputRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth(); // To check if user is logged in for commenting

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const data = await getChatDetails(chatId);
        setChat(data);
      } catch (err) {
        setError("Failed to load chat: " + err.message);
        console.error("Error fetching chat details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChat();
  }, [chatId]);

  useEffect(() => {
    if (isCommenting && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [isCommenting]);

  const handleAddCommentClick = (targetId = 'chat') => { // 'chat' for overall chat comments
    if (!currentUser) {
      alert("Please log in to add a comment.");
      navigate('/auth');
      return;
    }
    setCommentTargetId(targetId);
    setIsCommenting(true);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !commentTargetId) return;

    try {
      const targetType = commentTargetId === 'chat' ? 'chat' : 'interaction';
      await addComment(chatId, commentTargetId, newComment, targetType);
      setNewComment('');
      setIsCommenting(false);
      setCommentTargetId(null);
      // Optionally re-fetch chat to show new comment immediately
      const updatedChat = await getChatDetails(chatId);
      setChat(updatedChat);
    } catch (err) {
      alert("Failed to add comment: " + err.message);
      console.error("Error adding comment:", err);
    }
  };

  if (loading) {
    return <div className="loading">Loading chat...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!chat) {
    return <div className="not-found">Chat not found.</div>;
  }

  return (
    <div className="chat-thread-container">
      <header className="chat-thread-header">
        <h2>{chat.title || `Chat with ${chat.chatId}`}</h2>
        {currentUser && (
          <button onClick={() => handleAddCommentClick('chat')} className="comment-on-chat-button">
            Comment on Chat
          </button>
        )}
        <button onClick={() => navigate('/chats')} className="back-to-chats-button">
          Back to Chats
        </button>
        {/* Ad Space Top */}
        <div className="ad-space-top">Advertisement</div>
      </header>

      <div className="interactions-list">
        {chat.interactions && chat.interactions.length > 0 ? (
          chat.interactions.map((interaction) => (
            <div key={interaction.id} className="interaction-item">
              <div className="prompt">
                <p><strong>Prompt:</strong> {interaction.prompt}</p>
                <small className="timestamp">Sent: {new Date(interaction.promptTimestamp._seconds * 1000).toLocaleString()}</small>
              </div>
              <div className="response">
                <p><strong>Response:</strong> {interaction.response}</p>
                <small className="timestamp">Received: {new Date(interaction.responseTimestamp._seconds * 1000).toLocaleString()}</small>
              </div>
              {currentUser && (
                <button onClick={() => handleAddCommentClick(interaction.id)} className="comment-on-interaction-button">
                  Comment on this Interaction
                </button>
              )}
              {interaction.comments && interaction.comments.length > 0 && (
                <div className="interaction-comments">
                  <h4>Comments:</h4>
                  {interaction.comments.map((comment, idx) => (
                    <div key={idx} className="comment-item">
                      <p className="comment-text">{comment.text}</p>
                      <small className="comment-meta">
                        by {comment.userName || 'Anonymous'} at {new Date(comment.timestamp._seconds * 1000).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No interactions found for this chat.</p>
        )}
      </div>

      {isCommenting && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            ref={commentInputRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`Add your comment on ${commentTargetId === 'chat' ? 'the chat' : 'this interaction'}...`}
            rows="3"
            required
          ></textarea>
          <button type="submit">Submit Comment</button>
          <button type="button" onClick={() => setIsCommenting(false)}>Cancel</button>
        </form>
      )}

      {chat.comments && chat.comments.length > 0 && (
        <div className="chat-overall-comments">
          <h3>Overall Chat Comments:</h3>
          {chat.comments.map((comment, idx) => (
            <div key={idx} className="comment-item">
              <p className="comment-text">{comment.text}</p>
              <small className="comment-meta">
                by {comment.userName || 'Anonymous'} at {new Date(comment.timestamp._seconds * 1000).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}

      <footer className="chat-thread-footer">
        {/* Ad Space Bottom */}
        <div className="ad-space-bottom">Advertisement</div>
      </footer>
    </div>
  );
}

export default ChatThread;
