import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/ContentGrayFrame.css'

function ContentGrayFrame({ children, className, style }) {
  return (
    <div className={`contentGrayFrame_container ${className}`} style={style}>
      {children}
    </div>
  )
}

ContentGrayFrame.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
}

ContentGrayFrame.defaultProps = {
  children: <></>,
  style: {},
  className: '',
}

export default ContentGrayFrame
