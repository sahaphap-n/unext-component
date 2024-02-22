import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/PageVerticalLayout.css'

function PageVerticalLayout({ children }) {
  return <div className="pageVerticalLayout_container">{children}</div>
}

PageVerticalLayout.propTypes = {
  children: PropTypes.node,
}

export default PageVerticalLayout
