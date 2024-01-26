import React from 'react';
import { Link } from 'react-router-dom';
import Login from './login';

// Mapping of genre IDs to their corresponding names
const genreMapping = {
  1: "Personal Growth",
  2: "True Crime and Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

// Function to format the last updated date
const formatUpdatedAt = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

// LandingPage component
const LandingPage = () => {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [shows, setShows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('A-Z'); // Default filter set to A-Z
  const [genresFilter] = React.useState(null);

  // Fetch shows from the API when the component mounts
  React.useEffect(() => {
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

  // Function to handle changes in the filter
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Function to sort shows based on the selected filter
  const sortShows = (a, b) => {
    if (filter === 'A-Z') {
      return a.title.localeCompare(b.title);
    } else if (filter === 'Z-A') {
      return b.title.localeCompare(a.title);
    } else if (filter === 'ascending') {
      return new Date(a.updated).getTime() - new Date(b.updated).getTime();
    } else if (filter === 'descending') {
      return new Date(b.updated).getTime() - new Date(a.updated).getTime();
    }
    return 0;
  };

  // Filter the shows based on the selected genre (if any)
  const displayedShows = genresFilter
    ? shows.filter((show) => show.genres.includes(genresFilter))
    : shows;

  // Render loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the main content when the user is logged in
  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div className="container">
          <h2>All Shows</h2>
          <div className="row mb-3">
            <div className="col">
              {/* Filter and genre buttons */}
              <div className="btn-group me">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Order: {filter}
                </button>
                <div className="dropdown-menu">
                  <button className="dropdown-item" type="button" onClick={() => handleFilterChange('A-Z')}>A-Z</button>
                  <button className="dropdown-item" type="button" onClick={() => handleFilterChange('Z-A')}>Z-A</button>
                  <button className="dropdown-item" type="button" onClick={() => handleFilterChange('ascending')}>New Shows</button>
                  <button className="dropdown-item" type="button" onClick={() => handleFilterChange('descending')}>Old Shows</button>
                </div>
                <div className="ms-2">
                  {/* Genre filter buttons */}
                  {Object.entries(genreMapping).map(([genreId, genreName]) => (
                    <Link key={genreId} to={`?genres=${genreId}`} className="btn btn-outline-secondary rounded-pill me-2">{genreName}</Link>
                  ))}
                  <Link to="." className="btn btn-secondary rounded-pill me-2">Clear</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Display the shows */}
          <div className="row">
            {displayedShows.sort(sortShows).map((show) => (
              <div key={show.id} className="col-md-3 mb-4">
                <div className="card" style={{ width: '18rem' }}>
                  {/* Link to individual show page */}
                  <Link className="link-underline link-underline-opacity-0" to={`/${show.id}`}>
                    <img src={show.image} alt={show.title} className="card-img-top" />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{show.title}</h5>
                    <p className="card-text">{show.description.length > 100 ? show.description.slice(0, 100) + '...' : show.description}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Seasons: {show.seasons}</li>
                    <li className="list-group-item">Last Updated: {formatUpdatedAt(show.updated)}</li>
                    <li className="list-group-item">Genres: {show.genres.map((genreId) => genreMapping[genreId]).join(', ')}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
