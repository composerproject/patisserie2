import { Link, useNavigate } from "react-router-dom";
import { useGetPastriesQuery, useLogoutMutation } from "../features/pastry";
import Gallery from "../components/Gallery";
import { useDispatch } from "react-redux";
import { resetAuth } from "../store/auth";
import { useEffect } from "react";
import FavoritePastryCard from "../components/FavoritePastryCard";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const { data: pastries, error, isLoading } = useGetPastriesQuery();

  const [logout, { isLoading: isLoggingOut, isSuccess, isError }] = useLogoutMutation(); 

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call the logout endpoint
      dispatch(resetAuth());  // Reset the auth state in Redux
    } catch (error) {
      // console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/login'; // Redirect to login after logout avec un refresh, sinon il reste connecté
    }
  }, [isSuccess]);

  const images = pastries ? pastries.map(pastry => ({
    name: pastry.name,
    image: pastry.image
  })) : [];

  return (
    <>
    <section id="concours-section">
      {/* <div className="content-wrapper"> */}
      <div className="circle-wrapper">
       
       <h3>Jeu Yahtzee</h3>
        {/* <p className="alert-message"> */}
<button onClick={handleLogout} disabled={isLoggingOut}>Log Out</button>
          {/* Gourmandise organise un jeu concours inspiré du yahtzee ! */}
        {/* </p>{" "} */}
        <p className="alert-message">
          {/* C'est l'occasion unique de gagner des patisseries succulente alors
          dépéchez- vous d'en profiter !!! 🍰{" "} */}
          Jusqu'à 3 pâtisseries à gagner !
        </p>

        <Link to="/game">
          <button>Je tente ma chance</button>
        </Link>
      </div>
      </section>
      {/* {pastries && <Gallery images={images} />} */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading pastries: {error.message}</p>}
      {pastries && (
        <section>
          <h3>Découvrez nos <strong>meilleures</strong> pâtisseries</h3>
          <div className="favorite-cards">
      <FavoritePastryCard img={images[0]}/>
      <FavoritePastryCard img={images[1]}/>
      <FavoritePastryCard img={images[2]}/>
      </div>
      </section>
      )}

      <div className="second-section"></div>
    </>
  );
};

export default Home;
