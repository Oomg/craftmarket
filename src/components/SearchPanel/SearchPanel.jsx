import PropTypes from 'prop-types';

function SearchPanel({ value, onChange, total }) {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="rounded-card border border-line bg-paper p-4 shadow-card"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex-1">
          <label htmlFor="searchInput" className="sr-only">
            Пошук товару
          </label>
          <input
            id="searchInput"
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Введіть назву..."
            className="w-full rounded-btn border border-edge bg-paper px-3 py-2 text-ink placeholder:text-ink-muted focus:border-clay-600 focus:outline-2 focus:outline-offset-0 focus:outline-clay-600/40"
          />
        </div>

        {typeof total === 'number' && (
          <p role="status" className="text-sm text-ink-muted sm:mt-0">
            Знайдено: <span className="font-semibold text-ink">{total}</span>
          </p>
        )}
      </div>
    </form>
  );
}

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  total: PropTypes.number,
};

export default SearchPanel;