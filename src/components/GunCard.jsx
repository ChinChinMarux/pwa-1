import { useRef } from 'react'

function GunCard({ gun, cartQuantity = 0, onAddToCart, onUpdateQuantity }) {
  const popup = useRef(null)

  const handleDecrease = (e) => {
    e.stopPropagation()
    onUpdateQuantity?.(gun.name, cartQuantity - 1)
  }

  const handleIncrease = (e) => {
    e.stopPropagation()
    onUpdateQuantity?.(gun.name, cartQuantity + 1)
  }

  const handleAdd = (e) => {
    e.stopPropagation()
    onAddToCart?.(gun)
  }

  return (
    <li className="card">
      <button className="card-btn" onClick={() => popup.current?.showModal()}>
        <div className="card-img-container">
          <img className="card-img" src={gun.image} alt={gun.name} />
        </div>
        <div className="card-body">
          <span className="name display">{gun.name}</span>
          <span className="type">
            {gun.type} · {gun.caliber}
          </span>
          <div className="card-footer-row">
            <span className="price">${gun.price.toLocaleString()}</span>

            {cartQuantity > 0 ? (
              <div className="card-qty-controls" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="card-qty-btn"
                  onClick={handleDecrease}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="card-qty-value">{cartQuantity}</span>
                <button
                  type="button"
                  className="card-qty-btn"
                  onClick={handleIncrease}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="add-cart-btn"
                onClick={handleAdd}
                title="Add to Cart"
              >
                + Add
              </button>
            )}
          </div>
        </div>
      </button>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <div className="popup-img-container">
          <img className="popup-img" src={gun.image} alt={gun.name} />
        </div>
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p className="popup-desc">{gun.description}</p>
        <div className="popup-actions">
          {cartQuantity > 0 ? (
            <div className="popup-qty-bar">
              <span className="popup-qty-label">In Cart:</span>
              <div className="qty-controls">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => onUpdateQuantity?.(gun.name, cartQuantity - 1)}
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className="qty-value">{cartQuantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => onUpdateQuantity?.(gun.name, cartQuantity + 1)}
                  aria-label="Increase quantity"
                >
                  &#43;
                </button>
              </div>
              <span className="popup-total-price">
                ${(gun.price * cartQuantity).toLocaleString()}
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="btn-primary popup-cart-btn"
              onClick={() => onAddToCart?.(gun)}
            >
              Add to Cart — ${gun.price.toLocaleString()}
            </button>
          )}
          <form method="dialog" className="popup-close-form">
            <button className="popup-close">Close</button>
          </form>
        </div>
      </dialog>
    </li>
  )
}

export default GunCard



