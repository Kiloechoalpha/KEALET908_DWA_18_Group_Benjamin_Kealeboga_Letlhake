import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import DropdownItem from './DropdownItem';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false); // State to track whether the search button has been clicked

  // Function to handle the search action when the search button is clicked
  const handleSearchButtonClick = () => {
    setSearchClicked(true); // Set the search button clicked state to true
  };

  return (
    <navbar>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                < Link to="/" className="navbar-brand" href="#">
                  <img src="images\podcast.png" width="50" height="50" alt="Podcast Logo" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/show" className="nav-link" aria-current="page" href="/">
                  Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/season" className="nav-link" >
                  Seasons
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/LandingPage" className="nav-link" aria-current="page" href="#">
                 Login
                </Link>
              </li>
              <DropdownItem title="⭐" items={['All Favorites', 'New Favorites', 'Old Favorites']} />
              
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state as the user types
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleSearchButtonClick} // Handle the search action when the search button is clicked
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {searchClicked && searchTerm.trim() !== '' && (
        <SearchFilter searchTerm={searchTerm} />
      )}
    </navbar>
  );
}