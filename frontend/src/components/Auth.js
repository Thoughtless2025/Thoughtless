import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // You'll create this or a similar CSS file

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [error, setError] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/chats'); // Redirect to chat list or desired post-login page
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // User will be redirected by the useEffect hook
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError(error.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // User will be redirected by the useEffect hook
    } catch (error) {
      console.error("Email auth error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'} to Comment</h2>
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleEmailAuth} className="email-auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>

      <div className="auth-separator">OR</div>

      <button onClick={handleGoogleSignIn} className="google-signin-button">
        Sign {isLogin ? 'in' : 'up'} with Google
      </button>

      <p className="auth-toggle">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? ' Sign Up' : ' Login'}
        </span>
      </p>

      {/* Note: CAPTCHA integration would typically happen here for signup,
          using a service like reCAPTCHA (requires backend verification). */}
    </div>
  );
}

export default Auth;
