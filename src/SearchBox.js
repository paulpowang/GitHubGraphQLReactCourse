const SearchBox = ({
  totalCount,
  queryString,
  pageCount,
  onTotalChange,
  onQueryChange,
}) => {
  return (
    <div className="d-flex align-items-center bg-light px-3 py-2 small rounded-3">
      <div className="d-flex align-items-center flex-grow-1">
        <label htmlFor="queryString" className="me-2 fw-bold text-secondary">
          Search
        </label>
      </div>
      <input
        id="queryString"
        type="text"
        value={queryString}
        className="form-control form-control-sm me-2"
        onChange={(event) => {
          onQueryChange(event.target.value);
        }}
      />

      <div className="d-flex align-items-center flex-grow-1">
        <label htmlFor="pageCount" className="me-2 fw-bold text-secondary">
          Show
        </label>
      </div>
      <input
        id="pageCount"
        type="number"
        min="1"
        max="100"
        value={pageCount}
        className="form-control form-control-sm me-2"
        onChange={(event) => {
          onTotalChange(event.target.value);
        }}
      />

      <div>
        <b className="me-2 text-secondary">Total:</b>
        {totalCount}
      </div>
    </div>
  );
};

export default SearchBox;
