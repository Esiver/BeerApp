import { iBeerData } from "../interfaces/DataInterfaces"


interface BeerItemProps {
    beerData:iBeerData,
    

}

const BeerItem:React.FC<BeerItemProps> = ({beerData }) => {


    return(
        <>
        <li className="beer__item" key={beerData.id}>
            🍺{beerData.name}🍺
        </li>
            
        </>
    );
}

export default BeerItem;