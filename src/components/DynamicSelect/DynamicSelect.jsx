import React, { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import PropTypes from 'prop-types'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import './styleSheet/DynamicSelect.css'
import Button from '../Button/Button'

function DynamicSelect({
  id,
  options,
  onChange,
  placeholder,
  optionKey,
  isInvalid,
  invalidMessage,
  value,
  disabled,
  isMultipleValue,
  isFilterable,
  isFlipOptions,
  onClear,
}) {
  const [selected, setSelected] = useState([])
  const [icon, setIcon] = useState(null)

  useEffect(() => {
    const setDefaultSelected = () => {
      const primaryKey = optionKey?.valueKey
      let newSelected = []
      let icon = null

      if (value && Array.isArray(options) && options.length > 0) {
        if (isMultipleValue && Array.isArray(value)) {
          const intersectionSelected = options?.filter((option) =>
            value?.find((item) => item[primaryKey] === option[primaryKey]) ? true : false
          )
          newSelected = [...intersectionSelected]
        } else {
          const foundSelected = options?.find((item) => item[primaryKey] === value)

          if (foundSelected) {
            let copySelected = { ...foundSelected }
            if (copySelected?.icon) {
              icon = copySelected.icon
              delete copySelected.icon
            }
            newSelected.push({ ...copySelected })
          }
        }
      }

      setIcon(icon)

      setSelected(newSelected)
    }

    setDefaultSelected()
  }, [value, options])

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

  const handleOptionSelected = (selected) => {
    let value = ''
    let icon = null
    let newSelected = [...selected]

    // value
    if (!isMultipleValue && typeof selected[0] === 'object') {
      value = selected[0][optionKey?.valueKey]
    } else if (isMultipleValue) {
      value = [...selected]
    }

    //icon
    if (selected[0]?.icon) {
      icon = selected[0].icon
    }

    //selected
    if (selected[0]?.isEmpty) {
      newSelected = []
    }

    if (onChange) {
      onChange(value)
    }

    setSelected(newSelected)
    setIcon(icon)
  }

  const renderMenu = (option) => {
    const { icon } = option
    let newRender
    if (icon) {
      newRender = (
        <div className="d-flex align-items-center" style={{ columnGap: '5px' }}>
          <span style={{ height: '16px', width: '16px' }}>{icon}</span>
          <span>{optionLabel(option)}</span>
        </div>
      )
    } else {
      newRender = optionLabel(option)
    }
    return newRender
  }

  const filterField = () => {
    const { labelKey } = optionKey
    let filterField = []

    if (typeof labelKey === 'string') {
      filterField = [labelKey]
    } else if (Array.isArray(labelKey)) {
      filterField = labelKey
    }
    return filterField
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
    setSelected([])
  }

  return (
    <div>
      <div className="dynamicSelect_container">
        {icon ? <div className="iconBox">{icon}</div> : null}
        <Typeahead
          id={id}
          filterBy={isFilterable ? filterField() : () => true}
          selected={selected}
          options={[{ ...defaultOptions() }, ...options]}
          onChange={handleOptionSelected}
          renderMenuItemChildren={(option) => renderMenu(option)}
          labelKey={(option) => optionLabel(option)}
          multiple={isMultipleValue}
          flip={isFlipOptions}
          disabled={disabled}
          placeholder={selected?.length === 0 ? placeholder : ''}
          renderInput={({ inputRef, referenceElementRef, ...inputProps }) => {
            return (
              <>
                {/* <input
                  {...inputProps}
                  className={`form-control selectBox ${isInvalid ? 'is-invalid' : ''} `}
                  style={{
                    paddingLeft: icon ? '38px' : '',
                    paddingRight: selected.length && isFilterable ? '40px' : '20px',
                  }}
                  ref={input => {
                    inputRef(input)
                    referenceElementRef(input)
                  }}
                  readOnly={!isFilterable}
                />
                {selected?.length && isFilterable === true ? (
                  <Button type="closeCircle" style={{ position: 'absolute', top: 12, right: 20 }} onClick={() => handleClear()} disabled={disabled} />
                ) : null} */}
              </>
            )
          }}
        />
        {selected?.length && isFilterable === true ? (
          <Button
            type="closeCircle"
            style={{ position: 'absolute', top: 12, right: 20 }}
            onClick={() => handleClear()}
            disabled={disabled}
          />
        ) : null}
      </div>
      {isInvalid && <div className="invalid-feedback d-block">{invalidMessage}</div>}
    </div>
  )
}

DynamicSelect.propTypes = {
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
  isMultipleValue: PropTypes.bool,
  isFilterable: PropTypes.bool,
  isFlipOptions: PropTypes.bool,
}

DynamicSelect.defaultProps = {
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
  isMultipleValue: false,
  isFilterable: false,
  isFlipOptions: false,
}

export default DynamicSelect
