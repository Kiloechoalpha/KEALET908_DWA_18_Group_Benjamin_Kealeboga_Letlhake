import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const ShowPreview = () => {
  const params = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${params.id}`) // Update the endpoint URL to use the correct parameter name (shows)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
      });
  }, [params.id]);

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