# 🚀 Usage Guide & Best Practices

## Quick Start

### 1. Installation & Setup
```bash
# Navigate to project
cd A15_Product_Listing_UI

# Install dependencies
npm install

# Start development server
npm run dev

# Server runs at http://localhost:5174
```

### 2. File Modifications Needed

#### To add more products:
Edit `src/App.jsx` - Find the `products` array:
```jsx
const products = [
  {
    id: 1,
    name: 'Your Product Name',
    price: 99.99,
    category: 'category-slug',  // electronics, fashion, home, sports
    rating: 4.5,
    image: 'https://your-image-url.jpg',
    inStock: true
  },
  // Add more products here...
]
```

#### To change colors:
Edit `src/App.css` - Modify CSS variables:
```css
:root {
  --primary-color: #2563eb;        /* Change button color */
  --secondary-color: #1e40af;      /* Change hover color */
  --accent-color: #f59e0b;         /* Change highlight color */
  --success-color: #10b981;        /* Change success color */
}
```

#### To modify sidebar:
Edit `src/components/FilterSidebar.jsx` - Change categories:
```jsx
const categories = ['all', 'electronics', 'fashion', 'home', 'sports']
// Add or remove category options
```

---

## 🎯 Component Integration Examples

### Example 1: Adding a Search Feature

**In App.jsx:**
```jsx
import { useState, useMemo } from 'react'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')  // NEW
  // ... other state
  
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      const stockMatch = !inStockOnly || product.inStock
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase())  // NEW
      
      return categoryMatch && priceMatch && stockMatch && searchMatch
    })
    // ... sorting logic
    return filtered
  }, [selectedCategory, priceRange, inStockOnly, sortBy, searchTerm])  // Include searchTerm
  
  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {/* ... rest of component */}
    </div>
  )
}
```

### Example 2: Adding Cart Functionality

**In App.jsx:**
```jsx
import { useState } from 'react'

function App() {
  const [cart, setCart] = useState([])
  
  const addToCart = (product) => {
    setCart([...cart, product])
    // Optional: Save to localStorage
    localStorage.setItem('cart', JSON.stringify([...cart, product]))
  }
  
  return (
    <div className="app">
      <header>
        <h1>E-Commerce Store</h1>
        <p>Cart Items: {cart.length}</p>
      </header>
      {/* Pass function to ProductCard */}
    </div>
  )
}
```

**In ProductCard.jsx:**
```jsx
import { useState } from 'react'

function ProductCard({ product, onAddToCart }) {  // New prop
  const handleAddToCart = () => {
    onAddToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }
  
  return (
    // ... component JSX
  )
}
```

### Example 3: Connecting to Backend API

**In App.jsx:**
```jsx
import { useState, useEffect, useMemo } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.example.com/products')
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])  // Empty dependency array = runs once on mount
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    // ... rest of component
  )
}
```

---

## 🎨 CSS Customization Guide

### Change Card Style

**In src/styles/ProductCard.css:**
```css
.product-card {
  /* Current styles */
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  
  /* Modify to your preference */
  background: #f9f9f9;           /* Light gray background */
  border: 2px solid #ddd;        /* Thicker border */
  border-radius: 8px;            /* Less rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);  /* Different shadow */
}
```

### Customize Button Colors

**In src/styles/ProductCard.css:**
```css
.add-to-cart-btn {
  background-color: #e74c3c;     /* Red button */
  border: none;
  border-radius: 6px;
  padding: 10px 15px;
  color: white;
  font-weight: bold;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #c0392b;     /* Darker red on hover */
}

.add-to-cart-btn.added {
  background-color: #27ae60;     /* Green when added */
}
```

### Modify Grid Layout

**In src/App.css:**
```css
/* Show 2 items per row on mobile instead of grid */
@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);  /* Change from 2 to 1 for single column */
    gap: 12px;                               /* Adjust gap as needed */
  }
}
```

---

## 📊 Data Management Patterns

### Pattern 1: Local State Management
```jsx
const [state, setState] = useState(initialValue)

// Update state
setState(newValue)

// Functional update (for complex updates)
setState(prevState => ({
  ...prevState,
  key: newValue
}))
```

### Pattern 2: Filtering Data
```jsx
// Single filter
products.filter(p => p.category === selectedCategory)

// Multiple filters (AND logic)
products.filter(p => 
  p.category === selectedCategory &&
  p.price >= minPrice &&
  p.price <= maxPrice &&
  (!inStockOnly || p.inStock)
)

// OR logic
products.filter(p =>
  p.category === 'electronics' ||
  p.category === 'gadgets'
)
```

### Pattern 3: Sorting Data
```jsx
// Sort by string (alphabetically)
products.sort((a, b) => a.name.localeCompare(b.name))

// Sort by number (ascending)
products.sort((a, b) => a.price - b.price)

// Sort by number (descending)
products.sort((a, b) => b.price - a.price)

// Sort by multiple criteria
products.sort((a, b) => {
  if (a.category !== b.category) {
    return a.category.localeCompare(b.category)
  }
  return a.price - b.price
})
```

---

## 🔒 Best Practices

### 1. Always Use Keys in Lists
```jsx
// ✅ Good
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}

// ❌ Bad
{products.map((product, index) => (
  <ProductCard key={index} product={product} />
))}
```

### 2. Use Memoization for Performance
```jsx
// ✅ Good - Prevents unnecessary recalculations
const filteredProducts = useMemo(() => {
  return products.filter(/* ... */)
}, [products, filterCriteria])

// ❌ Bad - Recalculates on every render
const filteredProducts = products.filter(/* ... */)
```

### 3. Handle Loading and Error States
```jsx
// ✅ Good
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
return <ProductList products={products} />

// ❌ Bad
return <ProductList products={products} />  // Might be undefined
```

### 4. Separate Concerns
```jsx
// ✅ Good - Each component has single responsibility
<FilterSidebar {...filterProps} />
<ProductList products={filteredProducts} />

// ❌ Bad - Mixing too much logic in one component
function App() {
  // All filtering, sorting, rendering in one component
}
```

### 5. Use Consistent Naming
```jsx
// ✅ Good - Clear, descriptive names
const [selectedCategory, setSelectedCategory] = useState('all')
const [priceRange, setPriceRange] = useState([0, 300])

// ❌ Bad - Unclear names
const [cat, setCat] = useState('all')
const [pr, setPr] = useState([0, 300])
```

---

## 🧪 Testing the App

### Test Filtering
1. Click different categories
2. Adjust price sliders
3. Toggle "In Stock Only"
4. Verify product list updates

### Test Sorting
1. Select each sort option
2. Verify order changes correctly
3. Check sorting persists with filters

### Test Responsive Design
1. Resize browser window
2. Use DevTools device emulation
3. Test on actual mobile devices
4. Verify touch interactions work

### Test Add to Cart
1. Click "Add to Cart" button
2. Verify button changes to green "✓ Added"
3. Button returns to normal after 2 seconds
4. Test on out-of-stock items (should be disabled)

---

## 🚀 Deployment Checklist

- [ ] Test all filters and sorting
- [ ] Check responsive design on mobile
- [ ] Replace placeholder images with real images
- [ ] Update product data with actual products
- [ ] Test on different browsers
- [ ] Optimize images for web
- [ ] Remove console.log statements
- [ ] Add error boundaries if needed
- [ ] Test touch interactions on mobile
- [ ] Check accessibility (keyboard navigation)
- [ ] Build for production: `npm run build`
- [ ] Test production build locally: `npm run preview`
- [ ] Deploy to hosting (Netlify, Vercel, GitHub Pages)

---

## 🐛 Debugging Tips

### Check Browser Console
```javascript
// Log state changes
console.log('Products:', products)
console.log('Filtered:', filteredProducts)
console.log('Selected Category:', selectedCategory)
```

### Use React DevTools
- Install React DevTools browser extension
- Inspect component state and props
- Trace re-renders
- Profile performance

### Debug CSS Issues
- Use browser DevTools Inspector
- Check CSS specificity conflicts
- Verify media query breakpoints
- Test on different screen sizes

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [MDN CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [MDN Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

**Happy coding! If you have questions, refer to the main README.md or DOCUMENTATION.md files.**
