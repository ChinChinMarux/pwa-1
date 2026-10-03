function Cart({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart, onNavigateToCatalog }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.gun.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-card">
          <svg className="cart-empty-icon" viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h2 className="cart-empty-title display">Your Cart is Empty</h2>
          <p className="cart-empty-desc">
            You have no weapons in your cart yet. Explore our stock to add items.
          </p>
          <button type="button" className="btn-primary" onClick={onNavigateToCatalog}>
            Browse Catalog
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <section className="masthead">
        <h1 className="display">Shopping Cart</h1>
        <p className="lede">
          Review your selected hardware specs, adjust quantities, or proceed to checkout.
        </p>
      </section>

      <section className="cart-section">
        <div className="cart-head">
          <h2>Items ({totalItems})</h2>
          <button type="button" className="clear-cart-link" onClick={onClearCart}>
            Clear Cart
          </button>
        </div>

        <ul className="cart-list">
          {cart.map(({ gun, quantity }) => (
            <li key={gun.name} className="cart-item">
              <div className="cart-item-img-wrap">
                <img src={gun.image} alt={gun.name} className="cart-item-img" />
              </div>

              <div className="cart-item-details">
                <h3 className="cart-item-name display">{gun.name}</h3>
                <span className="cart-item-type">
                  {gun.type} · {gun.caliber}
                </span>
                <span className="cart-item-unit-price">
                  ${gun.price.toLocaleString()} each
                </span>
              </div>

              <div className="cart-item-actions">
                <div className="qty-controls">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(gun.name, quantity - 1)}
                    aria-label={`Decrease quantity of ${gun.name}`}
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(gun.name, quantity + 1)}
                    aria-label={`Increase quantity of ${gun.name}`}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ${(gun.price * quantity).toLocaleString()}
                </div>

                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() => onRemoveFromCart(gun.name)}
                  aria-label={`Remove ${gun.name} from cart`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <div className="summary-row total-row">
            <span>Total Amount</span>
            <span className="total-price">${subtotal.toLocaleString()}</span>
          </div>

          <div className="cart-checkout-actions">
            <button
              type="button"
              className="btn-primary checkout-btn"
              onClick={() => alert(`Order placed successfully! Total: $${subtotal.toLocaleString()}`)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cart
