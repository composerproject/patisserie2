import { Link } from "react-router-dom";
import { useGetPastriesQuery } from "../features/pastry";
import Gallery from "../components/Gallery";

const Home = () => {
  const { data: pastries, error, isLoading } = useGetPastriesQuery();
  
  // Initialize images only if pastries are loaded
  const images = pastries ? pastries.map(pastry => ({
    name: pastry.name,
    image: pastry.image
  })) : [];

  return (
    <>
      <div> 
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
