
import { useBeerContext } from "../Context/BeerProvider";
import { iBeerData } from "../interfaces/DataInterfaces";
import BeerRow from "./BeerRow";

interface BeerlistProps {
    filterString:string
}

const BeerTable:React.FC<BeerlistProps> = ({ filterString}) => {
    const {beers} = useBeerContext();
    const beerRows: React.ReactElement[] = [];

    if(beers){
        beers.forEach((beer:iBeerData) => {
            if(filterString.length > 0) {                
                if (beer.name.toLowerCase().includes(filterString.toLowerCase())){
                    beerRows.push(<BeerRow key={beer.id} beerData={beer} />)    
                }
            } else {
                beerRows.push(<BeerRow key={beer.id} beerData={beer} />)
            }
        });
    }

    return (
        <table className="beer__table">
            <thead>
                <tr>
                    <th> </th>
                    <th>Name</th>
                    <th>Tagline</th>
                    <th>ABV</th>
                    <th>🍺</th>
                </tr>
                
            </thead>
            <tbody key={1}>
                 {beerRows}
            </tbody>
        </table>
    )
}


export default BeerTable;