

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AudioPlayer() {
  const [season, setSeason] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const params = useParams();

  React.useEffect(() => {
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

  const handlePlayback = (episode) => {
    setCurrentlyPlaying(episode);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {season.seasons.map((show) => (
            <div key={show.id}>
              {show.episodes.map((sound) => (
                <div key={sound.id}>
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