import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * ShowPreview component displays details of a podcast show.
 * It fetches show details from an API based on the show ID provided in the URL parameters.
 * @returns {JSX.Element} - The rendered JSX element containing show details.
 */
const ShowPreview = () => {
  // Extracting show ID from the URL parameters using useParams hook
  const params = useParams();
  
  // State to store the retrieved show details
  const [show, setShow] = useState(null);

  // useEffect hook to fetch show details when the component mounts or show ID changes
  useEffect(() => {
    // Fetching show details from the API using the show ID
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Updating the state with the retrieved show details
        setShow(data);
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
      });
  }, [params.id]); // Dependency array ensures the effect runs when show ID changes

  // Conditional rendering when show details are still being fetched
  if (!show) {
    return <div>Loading Show Details...</div>;
  }

  // Rendering show details once they are available
  return (
    <div className="container">
      <h2>Show Details</h2>
      
      {/* Card displaying show details */}
      <div className="card" style={{ width: '18rem' }}>
        <img src={show.image} alt={show.title} className="card-img-top" />
        
        <div className="card-body">
          {/* Show title */}
          <h5 className="card-title">{show.title}</h5>
          
          {/* Show description */}
          <p className="card-text">{show.description}</p>
          
        </div>

        {/* Link to navigate to the Seasons page for the current show */}
        <Link to={`/showPreview/${show.id}`} className="btn btn-outline-secondary rounded-pill">
          Seasons
        </Link>
      </div>
    </div>
  );
};

// Exporting the ShowPreview component as the default export
export default ShowPreview;
