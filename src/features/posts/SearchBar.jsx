import { useRef } from 'react'
import PropTypes from 'prop-types'

function SearchBar({ value, onSearchChange, onImmediateChange }) {
  const searchDebounceRef = useRef(null)

  const handleSearchChange = (e) => {
    const searchValue = event.target.value

    // update the searchItem immediately
    onImmediateChange(searchValue)

    // clear existing timeout if it exists
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }

    // set new timeout
    searchDebounceRef.current = setTimeout(() => {
      onSearchChange(searchValue)
    }, 500)
  }

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="Search..."
        onChange={handleSearchChange}
      />
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onImmediateChange: PropTypes.func.isRequired,
}

export default SearchBar
