import '../styles/FilterSidebar.css'

const categories = ['all', 'electronics', 'fashion', 'home', 'sports']

function FilterSidebar({
  category,
  setCategory,
  price,
  setPrice,
  sort,
  setSort,
}) {

  return (
    <aside className="filters glass">
      <div className="filter-group">
        <h3>Category</h3>
        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-label">
          <h3>Max Price</h3>
          <span className="price-value">${price}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="300" 
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))} 
          className="range-input"
        />
        <div className="range-labels">
          <span>$0</span>
          <span>$300</span>
        </div>
      </div>

      <div className="filter-group">
        <h3>Sort By</h3>
        <div className="sort-options">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="custom-select">
            <option value="name">Name</option>
            <option value="price">Price: Low to High</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </aside>
  )
}


export default FilterSidebar
