import { useContext, useState } from 'react';
import './Search.css'
import { StoreContext } from '../../context/storeContext';


const Search = ({setSearchOpen}) => {
    const { setSearchQuery } = useContext(StoreContext);
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
      e.preventDefault();
      setSearchQuery(query);
      setSearchOpen(false);
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch(event);
      }
    };
  return (
    <div className="search_wrapper">
        <div className="search_close" onClick={() => setSearchOpen(false)}>
            <ion-icon name='close'></ion-icon>
        </div>
        <div className="search_box">
          <form onSubmit={handleSearch}> 
            <ion-icon className='srch_icon' name="search-outline" ></ion-icon>
            <input type="text" placeholder='Search Images...' value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={handleKeyPress}/>
            {
                query.length > 0 ? <ion-icon name="close-outline" onClick={() => setQuery('')}></ion-icon> : null
            }
            <button type='submit'><ion-icon name='search-outline'></ion-icon><span>Search</span></button>
          </form>
        </div>
    </div>
  )
}

export default Search
