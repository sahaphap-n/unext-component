import React from 'react'
import Tooltip from '../Tooltip/Tooltip'
import PropTypes from 'prop-types'

function TextTruncate({ text, rows }) {
  return (
    <Tooltip text={text} contentBoxStyle={{ width: 300 }}>
      <div style={{ display: '-webkit-box', WebkitLineClamp: rows, WebkitBoxOrient: 'vertical', overflow: ' hidden' }}>
        {text}
      </div>
    </Tooltip>
  )
}

TextTruncate.propTypes = {
  text: PropTypes.string,
  rows: PropTypes.number,
}

TextTruncate.defaultProps = {
  text: '',
  rows: 1,
}

export default TextTruncate
