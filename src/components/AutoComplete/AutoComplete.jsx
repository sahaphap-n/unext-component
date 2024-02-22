import React, { useState, useEffect } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import PropTypes from 'prop-types'
import SearchSvg from './asset/SearchSvg'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import './styleSheet/AutoComplete.css'
import Button from '../Button/Button'

function AutoComplete({
  id,
  options,
  onSelect,
  placeholder,
  searchLength,
  onSearchOptions,
  optionKey,
  middleSymbol,
  isInvalid,
  invalidMessage,
  value,
  disabled,
  isMultipleValue,
  renderOption,
  isLoading,
  onClear,
  onExtraSearch,
}) {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const setDefaultSelected = () => {
      const primaryKey = optionKey?.valueKey
      let newSelected = []

      if (value && Array.isArray(options) && options.length > 0) {
        if (isMultipleValue && Array.isArray(value)) {
          const intersectionSelected = options?.filter((option) =>
            value?.find((item) => item[primaryKey] === option[primaryKey]) ? true : false
          )
          newSelected = [...intersectionSelected]
        } else {
          const foundSelected = options?.find((item) => item[primaryKey] === value)

          if (foundSelected) {
            newSelected.push(foundSelected)
          }
        }
      }

      setSelected(newSelected)
    }

    setDefaultSelected()
  }, [value, options])

  const optionLabel = (option, optionNameKey, middleSymbol = null) => {
    let label = ''
    if (Array.isArray(optionNameKey)) {
      optionNameKey.forEach((item, index) => {
        if (index < optionNameKey.length - 1) {
          label += option[item] + (middleSymbol ? middleSymbol : ' ')
        } else {
          label += option[item]
        }
      })
    } else if (typeof optionNameKey === 'string') {
      label = option[optionNameKey]
    }

    return label
  }

  const handleOptionSelected = (selected) => {
    let value

    if (!isMultipleValue && typeof selected[0] === 'object') {
      value = selected[0][optionKey?.valueKey]
    } else if (isMultipleValue) {
      value = [...selected]
    }

    if (onSelect) {
      onSelect(value)
    }

    setSelected(selected)
  }
  const handleClear = () => {
    if (onClear) {
      onClear()
    }
    setSelected([])
  }
  return (
    <div>
      <div className="autocomplete_container">
        <div className="search_icon">
          <Button type={'info'} disabled={!onExtraSearch || disabled} onClick={onExtraSearch} icon={<SearchSvg />} />
        </div>
        <AsyncTypeahead
          filterBy={() => true}
          id={id}
          // clearButton
          isLoading={isLoading}
          options={options}
          onChange={handleOptionSelected}
          inputProps={{
            style: {
              border: isInvalid ? '1px solid #d9534f' : '',
              paddingLeft: 38,
            },
          }}
          selected={selected}
          renderMenuItemChildren={renderOption}
          labelKey={(option) => optionLabel(option, optionKey?.nameKeys, middleSymbol)}
          placeholder={placeholder || 'ค้นหา'}
          onSearch={onSearchOptions}
          disabled={disabled}
          multiple={isMultipleValue}
          minLength={searchLength}
          promptText="พิมพ์เพื่อค้นหาข้อมูล"
          searchText="กำลังค้นหาข้อมูล..."
          emptyLabel="ไม่พบข้อมูล."
        />
        {selected.length ? (
          <Button
            type="closeCircle"
            style={{ position: 'absolute', top: 12, right: 10 }}
            onClick={() => handleClear()}
            disabled={disabled}
          ></Button>
        ) : null}
      </div>
      {isInvalid && <div className="invalid-feedback d-block">{invalidMessage}</div>}
    </div>
  )
}

AutoComplete.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  searchLength: PropTypes.number,
  middleSymbol: PropTypes.string,
  onSearchOptions: PropTypes.func,
  optionKey: PropTypes.shape({
    valueKey: PropTypes.string,
    nameKeys: PropTypes.arrayOf(PropTypes.string),
  }),
  isInvalid: PropTypes.bool,
  invalidMessage: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)]),
  isMultipleValue: PropTypes.bool,
  renderOption: PropTypes.func,
  isLoading: PropTypes.bool,
  onExtraSearch: PropTypes.func,
  onClear: PropTypes.func,
}

AutoComplete.defaultProps = {
  id: '',
  options: [],
  placeholder: '',
  searchLength: 3,
  middleSymbol: ' ',
  onSearchOptions: () => null,
  optionKey: {
    valueKey: '',
    nameKeys: [''],
  },
  isInvalid: false,
  invalidMessage: '',
  disabled: false,
  value: '',
  isMultipleValue: false,
  isLoading: false,
}

export default AutoComplete
