import '../styles/ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card glass">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
        <span className="category-badge">{product.category}</span>
      </div>
      <div className="card-info">
        <h4>{product.name}</h4>
        <div className="rating-row">
          <div className="stars">{'★'.repeat(Math.floor(product.rating))}</div>
          <span className="rating-text">{product.rating}</span>
        </div>
        <div className="card-footer">
          <p className="price">${product.price}</p>
          <button className="btn" onClick={onAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}



export default ProductCard
