import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/ContentFrame.css'
import Divider from '../Divider/Divider'
import Paper from '../Paper/Paper'

function ContentFrame({ children, footer, header, title, topRight }) {
  return (
    <Paper>
      <div className="contentFrame_container">
        {header ?? (
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="contentFrame_title_primary">{title}</h3>
            {topRight ?? null}
          </div>
        )}

        <Divider size={'md'} />

        <div className="contentFrame_body">{children}</div>
        {footer && (
          <>
            <Divider size={'md'} />
            <div className="footer">{footer}</div>
          </>
        )}
      </div>
    </Paper>
  )
}

ContentFrame.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  header: PropTypes.node,
  title: PropTypes.string,
  topRight: PropTypes.node,
}

ContentFrame.defaultProps = {
  title: '',
}

export default ContentFrame
