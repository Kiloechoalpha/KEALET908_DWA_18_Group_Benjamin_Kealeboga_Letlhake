import { useState, useEffect } from 'react';

// Component for displaying a carousel of random images
const RandomImageCarousel = () => {
  // State variables for storing images data and loading status
  const [images, setImages] = useState([]); // State for storing images data
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch images data from API when component mounts
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows') // Fetching data from the API
      .then((response) => response.json())
      .then((data) => {
        // Mapping the data to extract image and title information
        const imageItems = data.map((item) => ({
          image: item.image, // Image URL
          title: item.title, // Title of the image
        }));
        setImages(imageItems); // Updating state with extracted image data
        setLoading(false); // Updating loading state
      })
      .catch((error) => {
        console.error('Error fetching images:', error); // Logging error if fetching fails
        setLoading(false); // Updating loading state
      });
  }, []);

  // Render loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the carousel with fetched images
  return (
    <div id="randomImageCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Carousel inner */}
      <div className="carousel-inner">
        {/* Mapping through images and rendering each carousel item */}
        {images.map((imageItem, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            {/* Image */}
            <img src={imageItem.image} className="d-block img-fluid mx-auto" alt={`Slide ${index}`} style={{ maxWidth: '800px', maxHeight: '600px' }} />
            {/* Carousel caption */}
            <div className="carousel-caption text-dark bg-light rounded p-2">
              <h5>{imageItem.title}</h5> {/* Title of the image */}
            </div>
          </div>
        ))}
      </div>
      {/* Carousel control - Previous */}
      <button className="carousel-control-prev" type="button" data-bs-target="#randomImageCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      {/* Carousel control - Next */}
      <button className="carousel-control-next" type="button" data-bs-target="#randomImageCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default RandomImageCarousel;
