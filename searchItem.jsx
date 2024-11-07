

const SearchItem =({search ,setSearch})=>{
   
   return(
            <form className="searchForm" onSubmit={(e)=>{e.preventDefault()}}>
                <label htmlFor="SearchItem">Search</label>
                <input
                    type="search"
                    placeholder="Search Tasks"
                    autoFocus
                    id="search"
                    role="searchbox"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </form>
   );
    
}

export default SearchItem;