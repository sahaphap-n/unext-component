import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/FormItem.css'
import Label from '../Label/Label'

function FormItem({ children, direction, label, labelWidth, htmlFor, required }) {
  return (
    <div className={direction === 'vertical' ? 'formItem_vertical' : direction === 'horizontal' ? 'formItem_horizontal' : ''}>
      {label && (
        <Label
          htmlFor={htmlFor}
          required={required}
          style={{ width: direction === 'horizontal' ? labelWidth : '', flexShrink: '0' }}
          haveColon={direction === 'horizontal'}
        >
          {label}
        </Label>
      )}
      <div className="formItem_input">{children}</div>
    </div>
  )
}

FormItem.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  label: PropTypes.string,
  labelWidth: PropTypes.string,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
}

FormItem.defaultProps = {
  children: <></>,
  direction: 'vertical',
  label: '',
  labelWidth: '',
  htmlFor: '',
  required: false,
}

export default FormItem
