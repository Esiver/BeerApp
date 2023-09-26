import "./style/Base.scss";

import { useEffect, useState } from "react";
import { iBeerData } from "./interfaces/DataInterfaces";

import Search from "./Components/Search";
import BeerTable from "./Components/BeerTable";
import FavouriteList from "./Components/FavouriteList";

import { BeerProvider } from "./Context/BeerProvider";



function BeerApp() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState<Array<any>>([]);
  const [beerList, setBeerList] = useState<Array<iBeerData>>([]);
  const [searchString, setSearchString] = useState<string>('');
  
  const getBeerFromApi = (amount: number, page: number) => {
    setBeerList([]);
    const url =
      "https://api.punkapi.com/v2/beers?page=" + page + "&per_page=" + amount;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error!");
        }
        return response.json();
      })
      .then((data) => {
        setRawData(data);
        setIsLoading(false);
      })
      .then(() => {
        rawData.map((rawDataPoint: any, index: number) => {
          
          setBeerList((prevBeerDataList) => [
            ...prevBeerDataList,
            {
              id: rawDataPoint.id,
              name: rawDataPoint.name,
              image_url: rawDataPoint.image_url,
              tagline: rawDataPoint.tagline,
              abv: rawDataPoint.abv,
            }]);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("error loading raw beer data: ", error)
      });
  };

  useEffect(() => {
    getBeerFromApi(20, 2);
  }, []);

  
  const refreshBeerList = () => {
    getBeerFromApi(20, 2);
  }


  const handleSearchQueryChange = (inputString:string) => {
    setSearchString(inputString)
  }
  
  return (
    <>
      <BeerProvider clientBeerData={beerList}>
        <Search 
          searchQuery={searchString} 
          onSearchQueryChange={handleSearchQueryChange} 
        />
        <FavouriteList 
          title="Favourite Beers" 
          
        />
        <h2>
          All Beers {searchString.length > 0 ? ` (Searching for '${searchString}')` : ""}
        </h2>
        
        {isLoading ? 
           "loading"
          : <BeerTable filterString={searchString} />
        }
        
        {beerList.length == 0 ? <button className="button" onClick={refreshBeerList}>Refresh</button> 
        : ""}
      </BeerProvider>

        
    </>
    );
}

export default BeerApp;
