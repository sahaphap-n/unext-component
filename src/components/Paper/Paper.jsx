import React from 'react'
import PropTypes from 'prop-types'

const Paper = ({ children, elevation, containerStyle }) => {
  const styles = {
    boxShadow: `0px ${elevation}px ${2 * elevation}px rgba(0, 0, 0, 0.1)`,
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    width: '100%',
    ...containerStyle,
  }

  return <div style={styles}>{children}</div>
}

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.number,
  containerStyle: PropTypes.object,
}

Paper.defaultProps = {
  elevation: 1,
  containerStyle: {},
}

export default Paper
