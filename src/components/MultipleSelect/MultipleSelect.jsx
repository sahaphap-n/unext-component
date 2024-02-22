import React, { useMemo, useState, useRef, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import PropTypes from 'prop-types'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import './styleSheet/MultipleSelect.css'
import checkboxNewChecklistOnChange from './utils/checkboxNewChecklistOnChange'

function MultipleSelect({
  id,
  options,
  onChange,
  placeholder,
  optionKey,
  isInvalid,
  invalidMessage,
  value,
  disabled,
  isFilterable,
  isFlipOptions,
  onClear,
  style,
}) {
  const [multiSelections, setMultiSelections] = useState([])
  useEffect(() => {
    const setDefaultSelected = () => {
      const primaryKey = optionKey?.valueKey
      let newSelected = []
      const intersectionSelected = options?.filter((option) =>
        value?.find((item) => item[primaryKey] === option[primaryKey]) ? true : false
      )
      newSelected = [...intersectionSelected]
      setMultiSelections(newSelected)
    }

    setDefaultSelected()
  }, [options])

  const optionLabel = (option) => {
    const optionNameKey = optionKey?.labelKey
    let label = ''

    if (typeof option === 'object') {
      if (option.isEmpty) {
        label = option.emptyName
      } else if (Array.isArray(optionNameKey)) {
        optionNameKey.forEach((item, index) => {
          if (index < optionNameKey.length - 1) {
            label += option[item] + ' - '
          } else {
            label += option[item] || ''
          }
        })
      } else if (optionNameKey && typeof optionNameKey === 'string') {
        label = option[optionNameKey]
      }
    }

    return label
  }

  const handleCheckboxChange = (newValue) => {
    const newCheckList = checkboxNewChecklistOnChange(value, newValue)

    if (onChange) {
      onChange(newCheckList)
    }
  }

  const renderMenu = (option) => {
    const valueCheckbox = option[optionKey?.valueKey]
    const labelCheckbox = optionLabel(option)

    if (valueCheckbox === '') {
      return null
    }
    return (
      <div
        key={valueCheckbox}
        className={`checkboxGroup_checkboxItem typeOptions`}
        onClick={() => handleCheckboxChange(valueCheckbox)}
        style={style}
      >
        <label className={`checkboxGroup_label`} style={{ marginBottom: 0 }}>
          {labelCheckbox}
        </label>
      </div>
    )
  }

  const defaultOptions = () => {
    const emptyOption = { [optionKey?.valueKey]: '', emptyName: placeholder, isEmpty: true }
    const { labelKey } = optionKey
    if (typeof labelKey === 'string') {
      emptyOption[labelKey] = ''
    } else if (Array.isArray(labelKey)) {
      for (const key of labelKey) {
        emptyOption[key] = ''
      }
    }
    return emptyOption
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
    }
  }
  const selected = useMemo(() => {
    const primaryKey = optionKey?.valueKey
    let newSelected = []

    if (Array.isArray(value) && Array.isArray(options) && options.length > 0 && value.length > 0) {
      const intersectionSelected = options?.filter((option) => value.includes(option[primaryKey]))
      newSelected = [...intersectionSelected]
    }

    return newSelected
  }, [value, options])

  const handleMultiSelectionsChange = (multiSelections) => {
    setMultiSelections(multiSelections)
    onChange(multiSelections)
  }

  return (
    <div>
      <div className={`multipleSelect_container `} style={style}>
        {/* ${isInvalid ? 'is-invalid' : ''}  */}
        <Typeahead
          id={id}
          multiple
          className={`${isInvalid ? 'is-invalid' : ''}`}
          options={[{ ...defaultOptions() }, ...options]}
          selected={multiSelections.filter((option) => option[optionKey?.valueKey] !== '')}
          renderMenuItemChildren={(option) => renderMenu(option)}
          onChange={handleMultiSelectionsChange}
          labelKey={(option) => optionLabel(option)}
          flip={isFlipOptions}
          disabled={disabled}
          placeholder={multiSelections?.length === 0 ? placeholder : ''}
          // renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
          //   <input
          //     {...inputProps}
          //     className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
          //     ref={input => {
          //       inputRef(input)
          //       referenceElementRef(input)
          //     }}
          //   />
          // )}
        />
      </div>
      {isInvalid && <div className="invalid-feedback d-block">{invalidMessage}</div>}
    </div>
  )
}

MultipleSelect.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  optionKey: PropTypes.shape({
    valueKey: PropTypes.string,
    labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }),
  isInvalid: PropTypes.bool,
  invalidMessage: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)]),
  isFilterable: PropTypes.bool,
  isFlipOptions: PropTypes.bool,
}

MultipleSelect.defaultProps = {
  id: '',
  options: [],
  placeholder: 'เลือก',
  optionKey: {
    valueKey: '',
    labelKey: '',
  },
  isInvalid: false,
  invalidMessage: '',
  disabled: false,
  value: '',
  isFilterable: false,
  isFlipOptions: false,
}

export default MultipleSelect
