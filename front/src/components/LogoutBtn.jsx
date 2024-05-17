import { useEffect } from 'react'
import { changeloggedIn, resetAuth } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../features/pastry';

function LogoutBtn() {

    const [logout, { isLoading: isLoggingOut, isSuccess, isError }] = useLogoutMutation(); 

    const {isLoggedIn} = useSelector(s => s.auth);
    console.log(isLoggedIn);
    const dispatch = useDispatch();
  
    const handleLogout = async () => {
      try {
        await logout().unwrap(); // Call the logout endpoint // unwrap() in a try...catch block
        dispatch(resetAuth());  // Reset the auth state in Redux
      } catch (error) {
        // console.error('Logout failed:', error);
      }
    };
  
    const handleLogin = () => {
      dispatch(changeloggedIn(true));
    }
  
    useEffect(() => {
      if (isSuccess) {
        window.location.href = '/login'; // Redirect to login after logout avec un refresh, sinon il reste connecté
      }
    }, [isSuccess]);
  
  return (
    <>
        <li>
            {isLoggedIn && <button onClick={handleLogout} disabled={isLoggingOut}>Log Out</button>}
        </li>
    </>
  )
}

export default LogoutBtn