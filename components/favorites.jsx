import React from 'react';
import supabase from './supabase'; // Import your initialized Supabase client

const Favorites = () => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
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
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <h3>{favorite.title}</h3>
              <p>{favorite.description}</p>
              {/* Add other show details as needed */}
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