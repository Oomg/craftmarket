// src/components/SearchPanel/SearchPanel.jsx
import PropTypes from 'prop-types';
import './search-panel.css'; // Можеш створити базові стилі тут

function SearchPanel({ value, onChange }) {
  return (
    <div className="search-panel">
      <label htmlFor="searchInput">Пошук товару</label>
      <input
        id="searchInput"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Введіть назву..."
      />
    </div>
  );
}

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchPanel;