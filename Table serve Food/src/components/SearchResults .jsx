import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the query parameter from the URL
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery().get('query'); // Get the search term

  useEffect(() => {
    if (query) {
      // Fetch the search results based on the search term (query)
      fetch(`/api/menu/search?name=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!searchResults.length) {
    return <div>No results found for "{query}"</div>;
  }

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <div className="results-container">
        {searchResults.map((item) => (
          <div key={item._id} className="search-result-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
