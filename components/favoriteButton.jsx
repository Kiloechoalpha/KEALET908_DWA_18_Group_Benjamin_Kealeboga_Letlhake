import React from 'react';

const FavoriteButton = ({ show }) => {
  const [favorites, setFavorites] = React.useState([]);

  const handleAddToFavorite = () => {
    if (!favorites.includes(show.id)) {
      setFavorites([...favorites, show.id]);
    }
  };

  const handleRemoveFromFavorite = () => {
    const updatedFavorites = favorites.filter((id) => id !== show.id);
    setFavorites(updatedFavorites);
  };

  const isFavorite = favorites.includes(show.id);

  return (
    <div>
      {isFavorite ? (
        <button className="btn btn-danger" onClick={handleRemoveFromFavorite}>
          Remove from Favorites
        </button>
      ) : (
        <button className="btn btn-success" onClick={handleAddToFavorite}>
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;