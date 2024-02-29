import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import RandomImageCarousel from './randomImageCarousel';
// import FavoriteButton from './favoriteButton';

// Genre mapping for displaying genre names
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

// Function to format the updated date
const formatUpdatedAt = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

/**
 * Home component represents the home page of the application.
 * It fetches a list of shows from an API, filters and sorts them based on user preferences,
 * and displays them along with their details.
 * 
 * @component
 * @returns {JSX.Element} A JSX element representing the Home component.
 */
const Home = () => {
  const [searchParams] = useSearchParams();
  const [shows, setShows] = React.useState([]); // State to store the fetched shows
  const [loading, setLoading] = React.useState(true); // State to manage loading state
  const [filter] = React.useState('A-Z'); // Default sorting filter
  const genresFilter = parseInt(searchParams.get("genres")); // Get genres filter from URL query params

  // Fetch shows data from the API on component mount
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

  // Function to sort shows based on selected filter
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

  // Filter shows based on selected genre
  const displayedShows = genresFilter
    ? shows.filter(show => show.genres.includes(genresFilter))
    : shows;

  // Render loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render list of shows
  return (
    <>
      <RandomImageCarousel />
      <div className="container">
        <h2>All Shows</h2>
        <div className="row">
          {displayedShows.sort(sortShows).map((show) => (
            <div key={show.id} className="col-md-4 mb-2">
              <div className="card" style={{ width: '18rem' }}>
                {/* Link to the show's details page */}
                <Link className="link-underline link-underline-opacity-0" to={`/${show.id}`}>
                  <img src={show.image} alt={show.title} className="card-img-top" />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{show.title}</h5>
                  {/* Show description with character limit */}
                  <p className="card-text">{show.description.length > 100 ? show.description.slice(0, 100) + '...' : show.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  {/* Show details: Seasons, Last Updated, Genres */}
                  <li className="list-group-item">Seasons: {show.seasons}</li>
                  <li className="list-group-item">Last Updated: {formatUpdatedAt(show.updated)}</li>
                  <li className="list-group-item">Genres: {show.genres.map(genreId => genreMapping[genreId]).join(', ')}</li>
                </ul>
                {/* Favorite button component */}
                {/* <FavoriteButton show={show} /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
