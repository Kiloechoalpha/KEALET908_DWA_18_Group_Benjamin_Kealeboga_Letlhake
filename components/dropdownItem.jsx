import React from 'react';

const DropdownItem = ({ title, items }) => {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {title}
      </a>
      <ul className="dropdown-menu">
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

export default DropdownItem;