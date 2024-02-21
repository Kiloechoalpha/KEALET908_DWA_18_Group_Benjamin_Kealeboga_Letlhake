import React, { useEffect, useState } from 'react';
import supabase from './supabase'; // Import your initialized Supabase client

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's favorite shows from Supabase
    const fetchFavorites = async () => {
      const user = supabase.auth.user();
      if (user) {
        const { data, error } = await supabase
          .from('favorites')
          .select()
          .eq('user_id', user.id);
        if (data) {
          setFavorites(data);
        }
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const addToFavorites = async (show) => {
    const user = supabase.auth.user();
    if (user) {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: user.id, show_id: show.id }]);
      if (!error) {
        setFavorites([...favorites, data[0]]);
      }
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', favoriteId);
    if (!error) {
      setFavorites(favorites.filter((favorite) => favorite.id !== favoriteId));
    }
  };

  return (
    <div>
      <h2>Favorites</h2>
      {loading ? (
        <div>Loading...</div>
      ) : favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <h3>{favorite.title}</h3>
              <p>{favorite.description}</p>
              {/* Add other show details as needed */}
              <button onClick={() => removeFromFavorites(favorite.id)}>Remove from favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No favorite shows added yet.</div>
      )}
    </div>
  );
};

export default Favorites;
