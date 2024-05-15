import { Link } from "react-router-dom";
import { useGetPastriesQuery, useLogoutMutation } from "../features/pastry";
import Gallery from "../components/Gallery";
import { useDispatch } from "react-redux";
import { resetAuth } from "../store/auth";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();  
  const { data: pastries, error, isLoading } = useGetPastriesQuery();
  const [logout, { isLoading: isLoggingOut, isSuccess, isError }] = useLogoutMutation(); 

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call the logout endpoint
      dispatch(resetAuth());  // Reset the auth state in Redux
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Logged out successfully!");
      // window.location.href = '/login'; // Redirect to login after logout
    }
  }, [isSuccess]);

  const images = pastries ? pastries.map(pastry => ({
    name: pastry.name,
    image: pastry.image
  })) : [];

  return (
    <>
      <div> 
        <button onClick={handleLogout} disabled={isLoggingOut}>Log Out</button>
        <h2>Bienvenue au jeu de Yams !</h2>
        <p>Commencez à jouer en cliquant sur le bouton ci-dessous :</p>
        <Link to="/game">
          <button>Commencer le jeu</button>
        </Link>
      </div>
      <h3>Pâtisseries :</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading pastries: {error.message}</p>}
      {pastries && <Gallery images={images} />}
    </>
  );
};

export default Home;
