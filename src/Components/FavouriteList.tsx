import { iBeerData } from "../interfaces/DataInterfaces";
import BeerItem from "./BeerItem";
import { useBeerContext } from "../Context/BeerProvider";

interface Props {
  title: string;
}

const FavouriteList: React.FC<Props> = ({ title }) => {
  const {
    favoriteBeers,
    setLocalStoreFavoriteBeers,
    removeLocalStoreFavoriteBeers,
    
  } = useBeerContext();

  return (
    <>
      <div className="beer__list-header">
        <h2>
          {title} ({favoriteBeers ? favoriteBeers.length : "0"})
        </h2>
        

        {favoriteBeers.length > 0 ? (
          <button
            className="button button--small"
            onClick={() => setLocalStoreFavoriteBeers()}
          >
            Save Favourites
          </button>
        ) : (
          ""
        )}

        {favoriteBeers.length > 0 ? (
          <button
            className="button button--small danger"
            onClick={() => removeLocalStoreFavoriteBeers()}
          >
            Reset Favorites
          </button>
        ) : (
          ""
        )}
      </div>

      {favoriteBeers ? (
        <ul className="beer__list">
          {favoriteBeers.map((beer: iBeerData, index: number) => (
            <BeerItem key={beer.id} beerData={beer} />
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default FavouriteList;
