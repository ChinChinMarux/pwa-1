import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  const handleAddToCart = (gun) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.gun.name === gun.name)
      if (existingIndex > -1) {
        const updated = [...prevCart]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        }
        return updated
      }
      return [...prevCart, { gun, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (gunName, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(gunName)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.gun.name === gunName ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleRemoveFromCart = (gunName) => {
    setCart((prevCart) => prevCart.filter((item) => item.gun.name !== gunName))
  }

  const handleClearCart = () => {
    setCart([])
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={totalCartCount} />

      <main className="main">
        {tab === 'Catalog' && (
          <Catalog
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
        {tab === 'Cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onNavigateToCatalog={() => setTab('Catalog')}
          />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />
    </div>
  )
}

export default App

