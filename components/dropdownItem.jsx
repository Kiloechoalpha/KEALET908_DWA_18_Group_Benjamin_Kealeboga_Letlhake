import PropTypes from 'prop-types';

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

DropdownItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropdownItem;
