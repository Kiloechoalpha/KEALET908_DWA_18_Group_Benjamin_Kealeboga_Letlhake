import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**
 * AudioPlayer component renders an audio player for playing podcast episodes.
 * It fetches the data for a specific podcast by ID and displays the episodes.
 */
function AudioPlayer() {
  // State variables to hold the season data, loading status, and currently playing episode
  const [season, setSeason] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying] = useState(null);

  // Get the route parameters (in this case, the podcast ID)
  const params = useParams();

  // Fetch podcast data when component mounts or when the podcast ID changes
  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setSeason(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <div>
      {/* Display loading message while data is being fetched */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Map through seasons and episodes to render each episode */}
          {season.seasons.map((show) => (
            <div key={show.id}>
              {show.episodes.map((sound) => (
                <div key={sound.id}>
                  {/* Display episode title and audio player */}
                  <h3>{sound.title}</h3>
                  <audio src={sound.file} controls autoPlay={sound === currentlyPlaying}></audio>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;
