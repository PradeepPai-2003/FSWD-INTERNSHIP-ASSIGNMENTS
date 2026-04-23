# 🛍️ Mini E-Commerce Frontend

A modern, fully functional e-commerce store frontend built with **React** and **Vite**. Features product cards, advanced filtering, sorting, and responsive design.

## ✨ Features

### 🎯 Product Display
- Beautiful product cards with images, ratings, and pricing
- Hover effects and animations for better UX
- Product categories and stock status display
- Add to cart functionality with visual feedback

### 🔍 Advanced Filtering
- **Category Filter**: Filter products by electronics, fashion, home, sports
- **Price Range**: Dual-slider price filter from $0-$300
- **Stock Filter**: Show only in-stock items
- **Smart Reset**: Reset all filters with one click

### 📊 Sorting Options
- Sort by Name (A-Z)
- Sort by Price (Low to High)
- Sort by Price (High to Low)
- Sort by Highest Rating

### 📱 Responsive Design
- Desktop, tablet, and mobile optimized
- Sticky sidebar on desktop
- Responsive grid layout
- Touch-friendly controls on mobile

### ⚡ Performance
- Real-time filtering and sorting
- Smooth animations and transitions
- Optimized rendering with React hooks
- Lazy loading ready structure

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd A15_Product_Listing_UI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Main styles
├── index.css               # Global styles
├── components/
│   ├── ProductCard.jsx     # Product card component
│   └── FilterSidebar.jsx   # Filter sidebar component
└── styles/
    ├── ProductCard.css     # Product card styles
    └── FilterSidebar.css   # Filter sidebar styles
```

## 🧩 Components

### ProductCard
Displays individual product information including:
- Product image with hover zoom effect
- Product name and description
- Star rating display
- Category badge
- Price and add-to-cart button
- Out of stock indicator

**Props:**
```jsx
product: {
  id: number,
  name: string,
  price: number,
  category: string,
  rating: number,
  image: string,
  inStock: boolean
}
```

### FilterSidebar
Manages all filtering and sorting options:
- Category selection (radio buttons)
- Price range sliders
- Stock availability checkbox
- Sort dropdown

**Props:**
- `selectedCategory`: current category filter
- `setSelectedCategory`: update category
- `priceRange`: [min, max] price values
- `setPriceRange`: update price range
- `inStockOnly`: boolean for stock filter
- `setInStockOnly`: update stock filter
- `sortBy`: current sort option
- `setSortBy`: update sort option

## 🎨 Styling Features

### Color Palette
- **Primary**: #2563eb (Blue)
- **Secondary**: #1e40af (Dark Blue)
- **Accent**: #f59e0b (Amber)
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)

### Interactive Elements
- Smooth hover effects on cards
- Animated transitions for filters
- Button state feedback (hover, active, disabled)
- Loading and success states for add-to-cart

## 📊 Sample Data

The app includes 8 sample products across 4 categories:
- **Electronics**: Wireless Headphones, Smart Watch
- **Fashion**: Running Shoes, Winter Jacket
- **Home**: Coffee Maker, Desk Lamp
- **Sports**: Yoga Mat, Dumbbells Set

You can easily replace this with API data by modifying the `App.jsx` file.

## 🔧 Customization

### Adding More Products
Edit the `products` array in `App.jsx`:
```jsx
const products = [
  {
    id: 1,
    name: 'Product Name',
    price: 99.99,
    category: 'category-name',
    rating: 4.5,
    image: 'image-url',
    inStock: true,
  },
  // ... more products
]
```

### Changing Colors
Update the CSS variables in `App.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  /* ... other variables */
}
```

### Connecting to Backend API
Replace the static data with API calls:
```jsx
const [products, setProducts] = useState([])

useEffect(() => {
  fetchProducts().then(data => setProducts(data))
}, [])
```

## 🛠️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📦 Dependencies

- **React 19.2.4**: UI library
- **Vite 8.0.1**: Build tool and dev server

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎓 Learning Resources

This project demonstrates:
- React hooks (useState, useMemo)
- Component composition
- CSS Grid and Flexbox
- Event handling
- Conditional rendering
- Array filtering and sorting
- Responsive design principles

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available under the MIT License.

## 💡 Future Enhancements

- [ ] Shopping cart functionality
- [ ] Wishlist feature
- [ ] Product detail pages
- [ ] Customer reviews
- [ ] Payment integration
- [ ] User authentication
- [ ] Dark mode support
- [ ] Product search
- [ ] Pagination
- [ ] API integration

---

**Happy Shopping! 🛒**
