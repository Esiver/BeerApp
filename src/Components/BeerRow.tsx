
import { iBeerData } from "../interfaces/DataInterfaces";
import CheckBox from "./Checkbox";
import { useBeerContext } from '../Context/BeerProvider';

interface Props {
  beerData:iBeerData,
}

const BeerRow:React.FC<Props> = ({beerData}) => {
  
  const { addToFavorites, removeFromFavorites, checkFavourite } = useBeerContext();
    
    const imageSrc = beerData.image_url;
    const imageAlt = beerData.tagline;
    const name = beerData.name;
    const tagline = <span>"{beerData.tagline}"</span>;
    const abv = beerData.abv;
    
    const handleAddToFavorites = (beer: iBeerData) => {
      addToFavorites(beer);
    };
    const handleRemoveFromFavorites = (beer: iBeerData) => {
      removeFromFavorites(beer);
    };

    const toggleFavourite = (beer:iBeerData) => {
      if(checkFavourite(beer)){
        handleRemoveFromFavorites(beer)
        
      } else {
        handleAddToFavorites(beer)
      }
    }

    return (
      <tr>
        <td><img src={imageSrc} alt={imageAlt}/></td>
        <td>{name}</td>
        <td>{tagline}</td>
        <td>{abv}</td>
        <td>
          <CheckBox 
            onToggle={()=> toggleFavourite(beerData)}
            isToggled={checkFavourite(beerData)}/>
        </td>
      </tr>
    );
}

export default BeerRow;