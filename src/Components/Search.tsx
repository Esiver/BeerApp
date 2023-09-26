
interface Props {
    searchQuery:string,
    onSearchQueryChange:(e:string)=>void,

}

const Search:React.FC<Props> = ({searchQuery,onSearchQueryChange}) => {



    return (
        <form className="filter__form">
            <h2>Search</h2>
            {/* on change, filter beers */}
            <input className="filter__search" onChange={(e)=>onSearchQueryChange(e.target.value)} placeholder="Search beers"/>

        </form>
        
    )
}

export default Search;