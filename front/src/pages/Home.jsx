import { Link } from "react-router-dom";
import { useGetPastriesQuery } from "../features/pastry";
import Gallery from "../components/Gallery";

const Home = () => {
  const { data: pastries, error, isLoading } = useGetPastriesQuery();

  // Initialize images only if pastries are loaded
  const images = pastries
    ? pastries.map((pastry) => ({
        name: pastry.name,
        image: pastry.image,
      }))
    : [];

  return (
    <>
      <div className="content-wrapper">
        <h2>Bienvenue chez gourmandise !</h2>
        <h3>La boulangerie qui vous donne le smile</h3>
        <p className="alert-message">Le saviez vous ? </p>
        <p className="alert-message">
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
      <h3> Nos Pâtisseries :</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading pastries: {error.message}</p>}
      {pastries && <Gallery images={images} />}

      <div className="second-section"></div>
    </>
  );
};

export default Home;
