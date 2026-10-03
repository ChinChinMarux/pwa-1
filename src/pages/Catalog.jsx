import { useState, useMemo } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ cart = [], onAddToCart, onUpdateQuantity }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  const weaponTypes = useMemo(() => {
    const types = Array.from(new Set(GUNS.map((g) => g.type)))
    return ['All', ...types]
  }, [])

  const filteredGuns = useMemo(() => {
    return GUNS.filter((gun) => {
      const matchesType = selectedType === 'All' || gun.type === selectedType
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        gun.name.toLowerCase().includes(query) ||
        gun.type.toLowerCase().includes(query) ||
        gun.caliber.toLowerCase().includes(query) ||
        gun.description.toLowerCase().includes(query)

      return matchesType && matchesSearch
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      return 0
    })
  }, [searchQuery, selectedType, sortBy])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedType('All')
    setSortBy('default')
  }

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, shotguns, SMGs, and sniper rifles. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section className="catalog-section">
        {/* Controls Bar: Search, Type Filters, and Sort */}
        <div className="controls-bar">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, type, or caliber..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          <div className="filter-sort-group">
            <div className="filter-group">
              <span className="control-label">Type:</span>
              <div className="filter-pills">
                {weaponTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`filter-pill ${selectedType === type ? 'active' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="sort-group">
              <label htmlFor="sort-select" className="control-label">Sort:</label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A - Z</option>
                <option value="name-desc">Name: Z - A</option>
              </select>
            </div>
          </div>
        </div>

        {/* List Header */}
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">
            {filteredGuns.length === GUNS.length
              ? `${GUNS.length} pieces`
              : `${filteredGuns.length} of ${GUNS.length} pieces`}
          </span>
        </div>

        {/* Grid or Fallback */}
        {filteredGuns.length > 0 ? (
          <ul className="stock">
            {filteredGuns.map((gun) => {
              const cartItem = cart.find((item) => item.gun.name === gun.name)
              const cartQuantity = cartItem ? cartItem.quantity : 0
              return (
                <GunCard
                  key={gun.name}
                  gun={gun}
                  cartQuantity={cartQuantity}
                  onAddToCart={onAddToCart}
                  onUpdateQuantity={onUpdateQuantity}
                />
              )
            })}
          </ul>
        ) : (
          <div className="no-guns-container">
            <div className="no-guns-card">
              <svg className="no-guns-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <h3 className="no-guns-title display">No Guns Match</h3>
              <p className="no-guns-desc">
                We couldn't find any weapons matching your search or filter criteria.
              </p>
              <button type="button" className="reset-filter-btn" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Catalog

