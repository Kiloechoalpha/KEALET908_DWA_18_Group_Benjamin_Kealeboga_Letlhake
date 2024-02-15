import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import supabase from './supabase'; // Import your initialized Supabase client

const FavoriteButton = ({ show }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the show is in the user's favorites when component mounts
    const checkFavorite = async () => {
      const user = supabase.auth.user();
      if (user) {
        const { data, error } = await supabase
          .from('favorites')
          .select()
          .eq('user_id', user.id)
          .eq('show_id', show.id);
        if (data && data.length > 0) {
          setIsFavorite(true);
        }
      }
    };
    checkFavorite();
  }, [show.id]); // Re-run effect when the show ID changes

  const addToFavorites = async () => {
    const user = supabase.auth.user();
    if (user) {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: user.id, show_id: show.id }]);
      if (!error) {
        setIsFavorite(true);
      }
    }
  };

  const removeFromFavorites = async () => {
    const user = supabase.auth.user();
    if (user) {
      const { data, error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('show_id', show.id);
      if (!error) {
        setIsFavorite(false);
      }
    }
  };

  return (
    <div>
      {isFavorite ? (
        <button className="btn btn-danger" onClick={removeFromFavorites}>
          Remove from Favorites
        </button>
      ) : (
        <button className="btn btn-success" onClick={addToFavorites}>
          Add to Favorites
        </button>
      )}
    </div>
  );
};

FavoriteButton.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    // You may need to adjust other properties based on your show object structure
  }).isRequired,
};

export default FavoriteButton;
