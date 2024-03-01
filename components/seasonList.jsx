import React from 'react';
import { Link, useParams } from 'react-router-dom';

// Function to render the list of seasons and episodes
function SeasonList() {
  // State variables to store seasons data and loading status
  const [season, setSeasons] = React.useState([]); // State variable to store seasons data
  const [loading, setLoading] = React.useState(true); // State variable to track loading status

  // Getting parameters from the URL
  const params = useParams();

  // Fetching data from the API when component mounts
  React.useEffect(() => {
    // Fetching data from the API using the podcast ID from the URL params
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json()) // Parsing response to JSON
      .then((data) => {
        setSeasons(data); // Updating seasons data in state
        setLoading(false); // Updating loading status to false
      })
      .catch((error) => {
        console.error(error); // Logging error to console
        setLoading(false); // Updating loading status to false
      });
  }, [params.id]); // Dependency array ensures useEffect runs only when params.id changes

  // Rendering the component
  return (
    <div>
      {/* Conditional rendering based on loading status */}
      {loading ? (
        <div>Loading...</div> // Displaying loading message when data is being fetched
      ) : (
        // Rendering seasons and episodes when data is loaded
        <div key={season.id} className="col-md-3 mb-4 mx-auto ">
          <div className="card" style={{ width: '30rem' }}>
            <img src={season.image} alt="image" /> {/* Displaying season image */}
            <div className="card-body">
              <h5 className="card-title">{season.title}</h5> {/* Displaying season title */}
              {/* Mapping through seasons and rendering episodes */}
              {season.seasons.map((show, index) => (
                <div key={index}>
                  {/* Button to toggle episode list */}
                  <button
                    className="btn btn-outline-secondary mb-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#season-${index}`}
                    aria-expanded="false"
                    aria-controls={`season-${index}`}
                  >
                    Season: {show.title}
                  </button>
                  {/* Collapsible section to display episodes */}
                  <div className="collapse" id={`season-${index}`}>
                    {/* Mapping through episodes and rendering links */}
                    {show.episodes.map((episode, idx) => (
                      <Link to={`/seasonList/${season.id}`} className="d-block" key={idx}>
                        {episode.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Exporting the SeasonList component as default
export default SeasonList;
