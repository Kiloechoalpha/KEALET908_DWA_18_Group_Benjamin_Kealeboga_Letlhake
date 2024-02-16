import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from './Spinner'; 

const ShowPreview = () => {
  const params = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Fetching show details from the API using the show ID
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Updating the state with the retrieved show details
        setShow(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [params.id]);

  // Conditional rendering for loading state
  if (loading) {
    return <Spinner />;
  }

  if (!show) {
    return <div>Loading Show Details...</div>;
  }

  return (
    <div className="container">
      <h2>Show Details</h2>
      <div className="card" style={{ width: '18rem' }}>
        <img src={show.image} alt={show.title} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{show.title}</h5>
          <p className="card-text">{show.description}</p>
        </div>
        <Link to={`/showPreview/${show.id}`} className="btn btn-outline-secondary rounded-pill">
          Seasons
        </Link>
      </div>
    </div>
  );
};

export default ShowPreview;
