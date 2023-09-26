import { iBeerData } from "../interfaces/DataInterfaces"


interface BeerItemProps {
    beerData:iBeerData,
    

}

const BeerItem:React.FC<BeerItemProps> = ({beerData }) => {
    const query = `https://www.google.com/search?q=beer+${beerData.name}`

    return(
        <>
        <li className="beer__item" key={beerData.id}>
            <a href={query}>
                {beerData.name}🍺
            </a>
            
            
            
        </li>
            
        </>
    );
}

export default BeerItem;