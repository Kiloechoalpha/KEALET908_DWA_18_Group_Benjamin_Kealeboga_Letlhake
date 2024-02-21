import React from 'react';
import { Link } from 'react-router-dom';

// Show component displays a list of shows fetched from an API
const Show = () => {
  // State to hold the list of shows and loading status
  const [shows, setShows] = React.useState([]); // stores the list of shows
  const [loading, setLoading] = React.useState(true); // indicates whether the data is loading

  // Fetch the list of shows from the API when component mounts
  React.useEffect(() => {
    // Fetch the list of shows from the API
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Once data is received, update state with the shows and mark loading as false
        setShows(data);
        setLoading(false);
      })
      .catch((error) => {
        // If there's an error fetching shows, log the error and mark loading as false
        console.error('Error fetching shows:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs only once when component mounts

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading Shows</div>;
  }

  // Once loaded, render the list of shows
  return (
    <div className="container">
      <h2>All Shows</h2>
      <div className="row">
        {shows.map((show) => (
          <div key={show.id} className="col-md-3 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              {/* Link to the individual show's details page */}
              <Link className="link-underline link-underline-opacity-0" to={`/${show.id}`}>
                <div className="card-body">
                  <h5 className="card-title">{show.title}</h5>
                  {/* Display truncated description if longer than 100 characters */}
                  <p className="card-text">{show.description.length > 100 ? show.description.slice(0, 100) + '...' : show.description}</p>
                </div>
              </Link>
              {/* Link to the seasons page */}
              <Link className="link-underline link-underline-opacity-0" to={`/season`}>
                <ul className="list-group list-group-flush">
                  {/* Display the number of seasons for the show */}
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

export default Show;