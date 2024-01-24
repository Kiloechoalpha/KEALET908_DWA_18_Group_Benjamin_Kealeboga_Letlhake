import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchFilter = ({ searchTerm }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of shows from the API
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching shows:', error);
        setLoading(false);
      });
  }, []);

  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading Shows...</div>;
  }

  return (
    <div className="container">
      <h2>Search Results</h2>
      <div className="row">
        {filteredShows.length > 0 ? (
          filteredShows.map((show) => (
            <div key={show.id} className="col-md-3 mb-4">
              <div className="card" style={{ width: '18rem' }}>
                <img src={show.image} alt={show.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{show.title}</h5>
                  <p className="card-text">
                    {show.description.length > 100 ? show.description.slice(0, 100) + '...' : show.description}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Seasons: {show.seasons}</li>
                  <li className="list-group-item">Last Updated: {show.updated}</li>
                  <li className="list-group-item">Genres: {show.genres}</li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default SearchFilter;
