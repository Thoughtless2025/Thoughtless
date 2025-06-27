import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getChats, signOutUser } from '../services/apiService'; // Assuming you'll add signOutUser to apiService
import './ChatList.css'; // You'll create this or a similar CSS file

function ChatList({ currentUser }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChats();
        setChats(data);
      } catch (err) {
        setError("Failed to load chats: " + err.message);
        console.error("Error fetching chats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/'); // Redirect to homepage or login after logout
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  if (loading) {
    return <div className="loading">Loading chats...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="chat-list-container">
      <header className="chat-list-header">
        <h2>All Chats</h2>
        {currentUser ? (
          <div className="user-info">
            <span>Welcome, {currentUser.displayName || currentUser.email}!</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <button onClick={() => navigate('/auth')} className="login-button">Login to Comment</button>
        )}
        {/* Ad Space Top */}
        <div className="ad-space-top">Advertisement</div>
      </header>

      <ul className="chat-list">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <li key={chat.chatId} className="chat-item">
              <Link to={`/chats/${chat.chatId}`} className="chat-title-link">
                {chat.title || `Chat with ${chat.chatId}`}
              </Link>
              {currentUser && (
                <button className="comment-on-chat-button">Comment on Chat</button>
              )}
            </li>
          ))
        ) : (
          <p>No chats available yet. Check back later!</p>
        )}
      </ul>

      <footer className="chat-list-footer">
        {/* Ad Space Bottom */}
        <div className="ad-space-bottom">Advertisement</div>
      </footer>
    </div>
  );
}

export default ChatList;
