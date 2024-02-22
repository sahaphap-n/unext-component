import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/CheckboxGroup.css'

function CheckboxGroup({
  id,
  name,
  value,
  invalidMessage,
  options,
  optionKey,
  onChange,
  disabled,
  direction,
  type,
  separator,
  prefix,
}) {
  function checkboxNewChecklistOnChange(oldCheckList, newValue) {
    let newCheckList = []
    const clonedOldCheckList = JSON.parse(JSON.stringify(oldCheckList))

    if (clonedOldCheckList.includes(newValue)) {
      const removedSameValueCheckList = clonedOldCheckList?.filter((item) => item !== newValue)
      newCheckList = [...removedSameValueCheckList]
    } else {
      newCheckList = [...clonedOldCheckList, newValue]
    }

    return newCheckList
  }

  const handleCheckboxChange = (newValue) => {
    const newCheckList = checkboxNewChecklistOnChange(value, newValue)

    if (onChange) {
      onChange(newCheckList)
    }
  }

  const optionLabel = (option) => {
    const optionNameKey = optionKey?.labelKey
    let label = ''

    if (typeof option === 'object') {
      if (optionNameKey && typeof optionNameKey === 'string') {
        label = option[optionNameKey]
      } else if (Array.isArray(optionNameKey)) {
        optionNameKey.forEach((item, index) => {
          if (index < optionNameKey.length - 1) {
            label += option[item] + separator
          } else {
            label += option[item] || ''
          }
        })
      }
    }

    return label
  }

  return (
    <div
      id={id}
      name={name}
      className={`checkboxGroup_container ${direction === 'horizontal' ? 'checkboxHorizontalStyle' : ''}`}
    >
      {options?.map((option) => {
        const valueCheckbox = option[optionKey?.valueKey]
        const labelCheckbox = optionLabel(option)
        const tagId = `${id}-${valueCheckbox}-${labelCheckbox}`
        const checked = value?.includes(valueCheckbox)
        return type === 'options' ? (
          <div
            key={valueCheckbox}
            className={`checkboxGroup_checkboxItem typeOptions ${checked ? 'typeOptions_highlight' : ''}`}
            onClick={() => (type === 'options' ? handleCheckboxChange(valueCheckbox) : null)}
          >
            <input
              className="checkboxInput checkboxGroup_checkbox"
              id={tagId}
              type="checkbox"
              checked={checked}
              disabled={disabled}
            />
            <label className="checkboxGroup_label">
              {prefix}
              {labelCheckbox}
            </label>
          </div>
        ) : type === 'form' ? (
          <div key={valueCheckbox} className={`checkboxGroup_checkboxItem `}>
            <input
              className="checkboxInput checkboxGroup_checkbox"
              id={tagId}
              type="checkbox"
              onChange={() => handleCheckboxChange(valueCheckbox)}
              checked={checked}
              disabled={disabled}
            />
            <label className="checkboxGroup_label" htmlFor={tagId}>
              {prefix}
              {labelCheckbox}
            </label>
          </div>
        ) : null
      })}
      {invalidMessage && <div className="invalid-feedback d-block">{invalidMessage}</div>}
    </div>
  )
}

CheckboxGroup.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  optionKey: PropTypes.shape({
    valueKey: PropTypes.oneOfType([PropTypes.string]),
    labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }),
  invalidMessage: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  type: PropTypes.oneOf(['form', 'options']),
  separator: PropTypes.arrayOf(PropTypes.string),
}

CheckboxGroup.defaultProps = {
  id: '',
  name: '',
  value: [],
  onChange: null,
  disabled: false,
  options: [],
  optionKey: { valueKey: '', labelKey: '' },
  invalidMessage: '',
  direction: 'vertical',
  type: 'form',
  separator: ' - ',
  prefix: '',
}

export default CheckboxGroup
