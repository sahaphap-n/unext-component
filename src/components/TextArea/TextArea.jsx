import React from 'react'
import PropTypes from 'prop-types'

//import style
import './styleSheet/textArea.css'

const TextArea = ({ id, value, placeholder, onChange, maxCount, isInvalid, isInvalidMessage, disabled, style }) => {
  const characterCount = value?.length

  return (
    <div>
      <textarea
        id={id}
        className={`form-control grayScrollBar ${isInvalid ? 'is-invalid' : ''}`}
        rows={3}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxCount}
        disabled={disabled}
        style={style}
      />
      <div className="d-flex justify-content-between">
        <span className="invalid-feedback d-block text-left">{isInvalid ? isInvalidMessage : ''}</span>
        <p className="character-count">{maxCount ? `${characterCount}/${maxCount} Characters` : ''}</p>
      </div>
    </div>
  )
}

TextArea.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  maxCount: PropTypes.number,
  isInvalid: PropTypes.bool,
  isInvalidMessage: PropTypes.string,
  disabled: PropTypes.bool,
}

TextArea.defaultProps = {
  value: '',
  placeholder: '',
  isInvalid: false,
  isInvalidMessage: '',
  disabled: false,
}

export default TextArea
