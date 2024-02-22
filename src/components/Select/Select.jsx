import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/Select.css'

//v1.0.0
function Select({
  id,
  name,
  value,
  isInvalid,
  invalidMessage,
  placeholder,
  options,
  optionKey,
  onChange,
  onBlur,
  disabled,
  style,
  className,
  disabledEmptyOption,
  renderHidden,
  returnType,
}) {
  const setOptions = () => {
    let newOption = []
    if (Array.isArray(options)) {
      newOption = [...options].map(item => ({
        value: item[optionKey.valueKey],
        label: Array.isArray(optionKey.labelKey) ? setManyLabel(item) : item[optionKey.labelKey],
        hidden: renderHidden ? renderHidden(item) : false,
      }))
    }

    return newOption
  }

  const setManyLabel = OptionsItem => {
    const keys = optionKey.labelKey
    let newLabel = ''

    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        newLabel += OptionsItem[keys[i]] + ' - '
      } else {
        newLabel += OptionsItem[keys[i]]
      }
    }

    return newLabel
  }

  const handleChange = e => {
    if (onChange) {
      switch (returnType) {
        case 'event':
          onChange(e)
          break
        case 'object':
          const foundObject = options.find(item => item[optionKey.valueKey] === e.target.value)
          if (foundObject) {
            onChange(foundObject)
          }
          break
        default:
          break
      }
    }
  }

  return (
    <div>
      <select
        id={id}
        name={name}
        value={value}
        className={`form-control ${!value ? 'select_placholder' : ''} ${isInvalid ? 'is-invalid' : ''} ${className}`}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        style={style}
      >
        <option value="" key={''} disabled={disabledEmptyOption}>
          {placeholder || 'กรุณาเลือก'}
        </option>
        {setOptions().map(item => (
          <option value={item.value} key={item.value} className="select_black" hidden={item.hidden}>
            {item.label}
          </option>
        ))}
      </select>
      {isInvalid && <div className="invalid-feedback d-block">{invalidMessage}</div>}
    </div>
  )
}

Select.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  optionKey: PropTypes.shape({
    valueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  placeholder: PropTypes.string,
  isInvalid: PropTypes.bool,
  invalidMessage: PropTypes.string,
  disabledEmptyOption: PropTypes.bool,
  renderHidden: PropTypes.func,
  returnType: PropTypes.oneOf(['event', 'object']),
}

Select.defaultProps = {
  id: '',
  name: '',
  value: '',
  onChange: null,
  style: {},
  className: '',
  disabled: false,
  options: [],
  optionKey: { valueKey: '', labelKey: '' },
  placeholder: '',
  isInvalid: false,
  invalidMessage: '',
  disabledEmptyOption: false,
  renderHidden: () => false,
  returnType: 'event',
}

export default Select
