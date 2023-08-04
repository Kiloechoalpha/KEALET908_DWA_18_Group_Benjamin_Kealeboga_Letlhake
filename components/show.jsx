import React from 'react';
import { Link } from 'react-router-dom';


const Show = () => {
  const [shows, setShows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

  if (loading) {
    return <div>Loading Shows...</div>;
  }

  return (
    <div className="container">
      <h2>All Shows</h2>
      <div className="row">
        {shows.map((show) => (
          <div key={show.id} className="col-md-3 mb-4">
          
            <div className="card" style={{ width: '18rem' }}>
            <Link className="link-underline link-underline-opacity-0" to={`/${show.id}`}>
              <div className="card-body">
                <h5 className="card-title">{show.title}</h5>
                <p className="card-text">{show.description.length > 100 ? show.description.slice(0, 100) + '...' : show.description}</p>
              </div>
              </Link>
              <Link className="link-underline link-underline-opacity-0" to={`/season`}>
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

export default Show;
