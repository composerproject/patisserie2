import { Link } from "react-router-dom";
import { useGetPastriesQuery } from "../features/pastry";
import Gallery from "../components/Gallery";

const Home = () => {
  const { data: pastries, error, isLoading } = useGetPastriesQuery();
  
  const images = [];

  pastries.map(pastry => images.push({name: pastry.name, image: pastry.image}));

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
    <Gallery images={images} />
    {/* {pastries && pastries.map((pastry, i) => (
                <div key={i}>
                    <p>{pastry.name}</p>
                    <img src={pastry.image} alt={`Front default of ${pastry.name}`} />
                </div>
            ))} */}
    </>
  );
};

export default Home;
