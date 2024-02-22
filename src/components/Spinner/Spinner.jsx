import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/Spinner.css'

function Spinner({ size }) {
  const spinnerClassName = () => {
    switch (size) {
      case 'sm':
        return 'spinner_sm'
      case 'md':
        return 'spinner_md'
      case 'lg':
        return 'spinner_lg'
      default:
        return 'spinner_sm'
    }
  }
  return <span className={`spinner_box ${spinnerClassName()}`}></span>
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}

// defualt props
Spinner.defaultProps = {
  size: 'sm',
}

export default Spinner
