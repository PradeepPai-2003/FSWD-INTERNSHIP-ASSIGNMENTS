import { useState, useMemo } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import FilterSidebar from './components/FilterSidebar'
import CartDrawer from './components/CartDrawer'

const products = [
  { id: 1, name: 'Premium Headphones', price: 79, category: 'electronics', rating: 4.5, image: '/headphones.png' },
  { id: 2, name: 'Astro Smart Watch', price: 199, category: 'electronics', rating: 4.8, image: '/watch.png' },
  { id: 3, name: 'Ultra Boost Shoes', price: 99, category: 'fashion', rating: 4.3, image: '/shoes.png' },
  { id: 4, name: 'Arctic Winter Jacket', price: 149, category: 'fashion', rating: 4.6, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Barista Coffee Maker', price: 129, category: 'home', rating: 4.4, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'Minimalist Desk Lamp', price: 45, category: 'home', rating: 4.2, image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400' },
  { id: 7, name: 'Pro Yoga Mat', price: 35, category: 'sports', rating: 4.7, image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=400' },
  { id: 8, name: 'Steel Dumbbells', price: 89, category: 'sports', rating: 4.5, image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=400' },
]

function App() {

  const [category, setCategory] = useState('all')
  const [price, setPrice] = useState(300)
  const [sort, setSort] = useState('name')
  const [search, setSearch] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  const filtered = useMemo(() => {
    let items = products.filter(p =>
      (category === 'all' || p.category === category) &&
      p.price <= price &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )

    if (sort === 'price') items.sort((a, b) => a.price - b.price)
    else if (sort === 'rating') items.sort((a, b) => b.rating - a.rating)
    else items.sort((a, b) => a.name.localeCompare(b.name))

    return items
  }, [category, price, sort, search])

  return (
    <div className="app">
      <header className="header glass">
        <div className="header-content">
          <h1>PAI<span>SHOP</span></h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="cart-indicator" onClick={() => setIsCartOpen(true)}>
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </header>

      <div className="container">
        <FilterSidebar
          category={category}
          setCategory={setCategory}
          price={price}
          setPrice={setPrice}
          sort={sort}
          setSort={setSort}
        />

        <main className="products">
          <div className="results-header">
            <p>{filtered.length} Products Found</p>
          </div>
          <div className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={() => addToCart(p)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">📂</span>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
      />
    </div>
  )
}


export default App
