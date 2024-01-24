import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Seasons = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('A-Z');

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

  const sortSeasons = (option) => {
    setLoading(true);
    let sortedShows = [...shows];
    switch (option) {
      case 'A-Z':
        sortedShows.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Z-A':
        sortedShows.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'LAST_UPDATED':
        sortedShows.sort((a, b) => b.lastUpdated - a.lastUpdated);
        break;
      case 'RECENTLY_UPDATED':
        sortedShows.sort((a, b) => a.lastUpdated - b.lastUpdated);
        break;
      default:
        break;
    }
    setShows(sortedShows);
    setLoading(false);
    setSortOption(option);
  };

  if (loading) {
    return <div>Loading Seasons...</div>;
  }

  return (
    <div className="container">
      <h2>All Seasons</h2>
      <div className="d-flex mb-4">
        <button
          className={`btn btn-sm mr-2 ${sortOption === 'A-Z' && 'btn-primary'}`}
          onClick={() => sortSeasons('A-Z')}
        >
          Sort A-Z
        </button>
        <button
          className={`btn btn-sm mr-2 ${sortOption === 'Z-A' && 'btn-primary'}`}
          onClick={() => sortSeasons('Z-A')}
        >
          Sort Z-A
        </button>
        <button
          className={`btn btn-sm mr-2 ${sortOption === 'LAST_UPDATED' && 'btn-primary'}`}
          onClick={() => sortSeasons('LAST_UPDATED')}
        >
          Sort by Last Updated
        </button>
        <button
          className={`btn btn-sm mr-2 ${sortOption === 'RECENTLY_UPDATED' && 'btn-primary'}`}
          onClick={() => sortSeasons('RECENTLY_UPDATED')}
        >
          Sort by Recently Updated
        </button>
      </div>
      <div className="row">
        {shows.map((show) => (
          <div key={show.id} className="col-md-3 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <Link className="link-underline link-underline-opacity-0" to={`/${show.id}`}>
                <img src={show.image} alt={show.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{show.title}</h5>
                </div>
              </Link>
              <Link className="link-underline link-underline-opacity-0" to={`/show`}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Seasons: {show.seasons}</li>
                </ul>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seasons;