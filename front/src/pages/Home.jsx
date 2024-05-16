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
      <div className="content-wrapper">
        <p className="alert-message">Le saviez vous ? </p>
        <p className="alert-message">
        <button onClick={handleLogout} disabled={isLoggingOut}>Log Out</button>
          Gourmandise organise un jeux concours axé sur le yams !
        </p>{" "}
        <p className="alert-message">
          C'est l'occasion unique de gagner des patisseries succulente alors
          dépéchez- vous d'en profiter !!! 🍰{" "}
        </p>
        <h2>
          Pour accéder au jeu c'est cliquez juste en dessous, bonne chance !
        </h2>
        <Link to="/game">
          <button>Je tente ma chance</button>
        </Link>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading pastries: {error.message}</p>}
      {pastries && <Gallery images={images} />}

      <div className="second-section"></div>
    </>
  );
};

export default Home;
