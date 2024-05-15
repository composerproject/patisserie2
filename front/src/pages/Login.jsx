import { useState } from 'react';
import { useLoginMutation } from '../features/pastry';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error, data }] = useLoginMutation();
  const navigate = useNavigate(); // Navigation hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();
      console.log('Login successful:', result);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', result.token); // Assuming the token is returned
      navigate('/admin');  // Redirect to admin page using React Router
    } catch (err) {
      console.error('Login failed:', err);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('authToken');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {isError && <p>Error: {error?.data?.message || 'Failed to login'}</p>}
      </form>
    </div>
  );
}

export default Login;
