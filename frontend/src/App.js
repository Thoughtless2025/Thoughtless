import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import ChatList from './components/ChatList';
import ChatThread from './components/ChatThread';
import './App.css'; // You'll create this or a similar CSS file

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [auth]);

  // Placeholder for your homepage content.
  // This could be a separate component if it gets complex.
  const HomePage = () => (
    <div className="homepage-container">
      <header className="header">
        <h1>My Gemini Chat Blog</h1>
        {/* Ad Space Top */}
        <div className="ad-space-top">Advertisement</div>
      </header>

      <main className="main-content">
        <section className="blurb-section">
          <h2>Thought | Pipe | Less</h2>
          {/* Placeholder for Cat Image */}
          {/* <img src="/path/to/cat-image.png" alt="Cat" className="cat-image" /> */}
          <p>
            Welcome to a unique exploration of human thought, AI, and communication.
            "Thought | Pipe | Less" is a playful nod to Magritte, Sherlock Holmes'
            "two-pipe problems", and the `cat | less` Linux command.
          </p>
          <p>
            It's all about making complex ideas more accessible and, well, less daunting!
          </p>
        </section>

        <section className="minds-i-section">
          <h3>The Mind's I</h3>
          {/* Direct link to book cover image on Amazon, or similar reputable site */}
          <a href="https://www.amazon.com/Minds-I-Fantasies-Reflections-Self/dp/0465030912" target="_blank" rel="noopener noreferrer">
            <img src="https://images-na.ssl-images-amazon.com/images/I/41c4y0o71vL._SX322_BO1,204,203,200_.jpg" alt="The Mind's I Book Cover" className="book-cover-image" />
          </a>
          <p>
            This imagery and the themes explored in **"The Mind's I: Fantasies and Reflections on Self & Soul"**
            by Douglas R. Hofstadter and Daniel C. Dennett deeply inspire this blog.
            As the book's subtitle suggests, "The soul is greater than the hum of its parts,"
            we aim to explore the emergent properties of thought, consciousness, and communication.
          </p>
          <p>
            **Explore "The Mind's I" on <a href="https://www.amazon.com/Minds-I-Fantasi es-Reflections-Self/dp/0465030912" target="_blank" rel="noopener noreferrer">Amazon</a>**
          </p>
        </section>

        <button onClick={() => navigate('/chats')} className="go-to-chat-button">Go to Chat</button>
      </main>

      <footer className="footer">
        {/* Ad Space Bottom */}
        <div className="ad-space-bottom">Advertisement</div>
      </footer>
    </div>
  );


  if (loading) {
    return <div className="loading">Loading application...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatList currentUser={user} />} />
        <Route path="/chats/:chatId" element={<ChatThread currentUser={user} />} />
        {/* This route isn't strictly necessary for the current flow, but good for direct auth access */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
