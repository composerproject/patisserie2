import { useState } from 'react';
import { useLoginMutation } from '../features/pastry';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeloggedIn } from '../store/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error, data }] = useLoginMutation();
  const navigate = useNavigate(); // Navigation hook
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(changeloggedIn(true));
      // Assuming a successful login redirects to '/dashboard'
      navigate('/admin');
    } catch (error) {
      // console.error('Login failed:', error);
      // Handle error, e.g., show an error message
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
