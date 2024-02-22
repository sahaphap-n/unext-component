import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/RadioGroup.css'

function RadioGroup({ id, name, value, invalidMessage, options, optionKey, onChange, disabled, direction }) {
  const handleRadioChange = e => {
    const newValue = e.target.value

    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div id={id} name={name} className={`radioGroup_container ${direction === 'horizontal' ? 'radioHorizontalStyle' : ''}`}>
      {options?.map(item => {
        const valueRadio = item[optionKey?.valueKey]
        const labelRadio = item[optionKey?.labelKey]
        const tagId = `${id}-${valueRadio}-${labelRadio}`

        return (
          <div key={valueRadio} className="radioGroup_radioItem">
            <input
              className="radioInput radioGroup_radio"
              id={tagId}
              type="radio"
              value={valueRadio}
              onChange={handleRadioChange}
              checked={value === valueRadio}
              disabled={disabled}
            />
            <label className="radioGroup_label" htmlFor={tagId}>
              {labelRadio}
            </label>
          </div>
        )
      })}
      {invalidMessage && <div className="invalid-feedback d-block">{invalidMessage}</div>}
    </div>
  )
}

RadioGroup.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  optionKey: PropTypes.shape({
    valueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  invalidMessage: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
}

RadioGroup.defaultProps = {
  id: '',
  name: '',
  value: '',
  onChange: null,
  disabled: false,
  options: [],
  optionKey: { valueKey: '', labelKey: '' },
  invalidMessage: '',
  direction: 'vertical',
}

export default RadioGroup
