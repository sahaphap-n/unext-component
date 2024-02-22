import React from 'react'
import PropTypes from 'prop-types'

function Divider({ type, size }) {
  const setSize = () => {
    let newSize

    switch (size) {
      case 'sm':
        newSize = '1px'
        break
      case 'md':
        newSize = '2px'
        break
      case 'lg':
        newSize = '3px'
        break

      default:
        newSize = '1px'
        break
    }

    return newSize
  }

  return <hr style={{ borderTop: `${setSize()} ${type} #E8E8E8`, margin: '16px 0' }} />
}

Divider.propTypes = {
  type: PropTypes.oneOf(['solid', 'dashed']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}

Divider.defaultProps = {
  type: 'solid',
  size: 'sm',
}

export default Divider
