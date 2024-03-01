import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DropdownItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`nav-item dropdown ${isOpen ? 'show' : ''}`}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        {title}
      </a>
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {items.map((item, index) => (
          <li key={index}>
            <a className="dropdown-item" href="#">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

DropdownItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropdownItem;
