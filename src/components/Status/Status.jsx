import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/Status.css'

function Status({ text, status, type, color, className, style }) {
  const setCustomColorStyle = () => {
    let style = {}

    if (color && type === 'primary') {
      style = { background: color }
    } else if (color && type === 'secondary') {
      style = { border: `1px solid ${color}`, color: color }
    }

    return style
  }

  return (
    <div
      style={{ ...setCustomColorStyle(), ...style }}
      className={`status_box ${type === 'primary' ? 'status_primary' : type === 'secondary' ? 'status_secondary' : ''} ${className}`}
      data-status={status}
    >
      {text}
    </div>
  )
}

Status.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

Status.defaultProps = {
  text: '',
  status: '',
  type: 'secondary',
  color: '',
  className: '',
  style: {},
}

export default Status
