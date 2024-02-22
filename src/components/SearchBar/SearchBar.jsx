import React, { useState, useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import './styleSheet/SearchBar.css'
import AutoComplete from '../AutoComplete/AutoComplete'
import Tooltip from '../Tooltip/Tooltip'
import Label from '../Label/Label'
import Paper from '../Paper/Paper'
import Button from '../Button/Button'
import SwToast from '../SwToast/SwToast'
import SearchSvg from './asset/SearchSvg'
import LessThanSvg from './asset/LessThanSvg'
import MoreThanSvg from './asset/MoreThanSvg'
import InfoIcon from './asset/InfoIcon'
import { useForm } from './hooks/useForm'
import AlertModal from '../AlertModal/AlertModal'

// version 1.0.0
function SearchBar({
  initialValue,
  title,
  inputShowGroup,
  value,
  //number of input or select box per row
  maxInputCollapsePerRow,

  //data the same as inputShowGroup
  inputCollapseGroup,

  isHaveStatus,

  handleClickAutoComplete,
  onClickSearch,
  onSearch,
  textSearchButton,
  onClickReset,
  isShowReset,
  onChangeRecordStatus,
  className,
  style,
  requestLessOneField,
}) {
  const [isShowModalData, setIsShowModalData] = useState({
    warning: false,
  })

  const validations = useMemo(() => {
    const inputAll = [...inputShowGroup, ...inputCollapseGroup]
    const validation = {}
    for (const item of inputAll) {
      const { isRequired, key } = item
      if (isRequired) {
        validation[key] = {
          required: {
            value: true,
            message: 'กรุณาระบุ',
          },
        }
      }
      // if (requestLessOneField) {
      //   requestLessOneField.forEach((field) => {
      //     validation[field] = {
      //       custom: {
      //         isValid: () => {
      //           return requestLessOneField?.some((field) => data[field])
      //         },
      //         message: 'กรุณากรอกข้อมูลอย่างน้อยหนึ่งฟิลด์',
      //       },
      //     }
      //   })
      // }
    }
    return validation
  }, [
    inputShowGroup,
    inputCollapseGroup,
    requestLessOneField,
    // data
  ])

  const { data, setData, setErrors, errors, handleSubmitValidation, handleChangeValidation } = useForm({
    validations,
    initialValues: { ...initialValue, recordStatus: 'A' },
    onSubmitSuccess: () => onClickSearch(data),
    onSubmitNotSuccess: () => {
      const hasRequiredError = Object.keys(errors).some((key) => validations[key]?.required?.value === true)
      if (hasRequiredError) {
        SwToast({ type: 'warning', titleTh: 'กรุณาตรวจสอบเงื่อนไขของการค้นหาอีกครั้ง' })
      } else {
        setIsShowModalData((prev) => ({ ...prev, warning: true }))
      }
    },
  })

  const [isShowMore, setIsShowMore] = useState(false)
  const typeahead = useRef(undefined)

  const recordStatusOption = {
    label: 'สถานะ',
    option: [
      {
        recordStatus: 'A',
        recordStatusName: 'ใช้งาน',
      },
      {
        recordStatus: 'I',
        recordStatusName: 'ไม่ใช้งาน',
      },
      {
        // send blank string because backend require blank to search All recordStatus
        recordStatus: '',
        recordStatusName: 'ทั้งหมด',
      },
    ],
  }

  useEffect(() => {
    if (value && typeof value === 'object') {
      setData((prevData) => ({ ...prevData, ...value }))
    }
  }, [value])

  useEffect(() => {
    if (requestLessOneField && Array.isArray(requestLessOneField)) {
      const hasMissingFields = requestLessOneField.some((field) => !value.hasOwnProperty(field))
      if (hasMissingFields) {
        setData((prevData) => ({
          ...prevData,
          ...requestLessOneField.reduce((acc, field) => ({ ...acc, [field]: '' }), {}),
        }))
      }
    }
  }, [requestLessOneField])

  //set data onChang each field
  const handleChangValue = (key, value, onChange = null, groupKey = null, order = null) => {
    let newData = { ...data, [key]: value }

    if (onChange) {
      // relation group
      if (groupKey && order) {
        // reset value of child order
        const allInputFieldList = [...inputShowGroup, ...inputCollapseGroup]
        const theSameGroupKeyListFilter = allInputFieldList?.filter((item) => item?.groupKey === groupKey)

        theSameGroupKeyListFilter.forEach((item) => {
          if (item?.order > order) {
            newData[item?.key] = ''
          }
        })
      }

      onChange(key === 'recordStatus' ? value : newData)
    }

    handleChangeValidation(key, value)

    if (onSearch) {
      onSearch(newData)
    }

    // Check if any of the fields in requestLessOneField have values
    const hasValueInRequiredFields = requestLessOneField?.some((field) => newData[field])

    // If any of the required fields have values, clear the errors associated with them
    if (hasValueInRequiredFields) {
      const updatedErrors = { ...errors }
      requestLessOneField.forEach((field) => {
        updatedErrors[field] = undefined
      })
      setErrors(updatedErrors)
    }
  }

  //reset button
  const handleClickReset = () => {
    setData({ ...initialValue, recordStatus: 'A' })
    setErrors({})
    onClickReset()
    if (typeahead.current) {
      typeahead.current.clear()
    }
  }

  const handleAutoCompleteInputChange = (key, value, onInputChange = null) => {
    setData({ ...data, [key]: value })
    if (onInputChange) {
      onInputChange(value)
    }
  }

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmitValidation()
    }
  }

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

  // render follow input type
  const showInputBoxByInputType = (dataItem) => {
    const {
      inputType,
      placeholder,
      key,
      onChange,
      groupKey,
      order,
      disabled,
      option,
      optionValueKey,
      optionNameKey,
      optionNameMiddleSymbol,
      onAutoCompleteTextChange,
      inputComponent,
      isLoading,
      isRequired,
    } = dataItem
    const errorMessage = errors && errors[key]
    const className = `form-control ${isRequired && !data[key] ? 'searchBarCurr_required' : ''} ${errorMessage ? 'is-invalid' : ''}  `
    const newPlaceholder = `${placeholder}${isRequired ? '*' : ''}`
    if (inputType === 'input') {
      return (
        <input
          id={`search-input-${key}`}
          type="text"
          className={className}
          placeholder={newPlaceholder}
          value={data[key] || ''}
          onChange={(e) => handleChangValue(key, e.target.value, onChange, groupKey, order)}
          onKeyDown={handlePressEnter}
          disabled={disabled}
        />
      )
    } else if (inputType === 'select') {
      return (
        <select
          id={`search-select-${key}`}
          className={className}
          style={
            !data[key]
              ? {
                  color: 'rgba(154, 158, 166, 1)',
                  fontWeight: '300',
                }
              : {}
          }
          value={data[key] || ''}
          onChange={(e) => handleChangValue(key, e.target.value, onChange, groupKey, order)}
          disabled={disabled}
        >
          <option style={{ color: '#000000' }} value="">
            {newPlaceholder}
          </option>
          {!Array.isArray(option)
            ? null
            : option?.map((item) => (
                <option
                  style={{ color: '#000000' }}
                  value={item[optionValueKey] || ''}
                  key={item[optionValueKey] || ''}
                >
                  {optionLabel(item, optionNameKey, optionNameMiddleSymbol)}
                </option>
              ))}
        </select>
      )
    } else if (inputType === 'autocomplete') {
      return (
        <div className="searchBarCurr_typeahead">
          <AutoComplete
            id={`search-autocomplete-${key}`}
            value={data[key] || ''}
            options={option}
            middleSymbol={optionNameMiddleSymbol}
            optionKey={{
              valueKey: optionValueKey,
              nameKeys: optionNameKey,
            }}
            placeholder={newPlaceholder}
            onSearchOptions={(text) => handleAutoCompleteInputChange(key, text, onAutoCompleteTextChange)}
            onSelect={(value) => handleChangValue(key, value, onChange, groupKey, order)}
            isLoading={isLoading || false}
            disabled={disabled}
            isInvalid={errorMessage ? true : false}
          />
        </div>
      )
    } else if (inputType === 'custom') {
      return inputComponent
    } else {
      return null
    }
  }

  return (
    <>
      <Paper>
        <div className={`searchBarCurr_container_search ${className}`} style={style}>
          <div className={'d-flex'} style={{ gap: '16px' }}>
            <span>{title !== '' && <h3>{title || 'ค้นหา'}</h3>} </span>
            {requestLessOneField && (
              <span className={'d-flex'} style={{ gap: '8px' }}>
                <InfoIcon color="#d9534f" /> <h5 className={'text-danger'}> กรุณาระบุอย่างน้อย 1 เงื่อนไข</h5>
              </span>
            )}
          </div>

          <div className="d-flex flex-column" style={{ gap: '16px' }}>
            <div className="d-flex flex-column" style={{ gap: 16 }}>
              {/* main group */}
              <div className="row">
                {/* initials input container  */}
                {!Array.isArray(inputShowGroup)
                  ? null
                  : inputShowGroup?.map((item) => (
                      <div
                        className={`${item.colSpan ? `col-${item.colSpan}` : `col-${12 / inputShowGroup.length}`}`}
                        key={item?.key}
                        hidden={item?.isHide}
                        style={{ padding: '0 8px' }}
                      >
                        {showInputBoxByInputType(item)}
                      </div>
                    ))}
              </div>

              {/* collapse group */}
              {!Array.isArray(inputCollapseGroup) || inputCollapseGroup.length === 0
                ? null
                : isShowMore && (
                    <div className="row" style={{ rowGap: 16 }}>
                      {inputCollapseGroup.map((item) => (
                        <div
                          key={item?.key}
                          className={`${item.colSpan ? `col-${item.colSpan}` : `col-${12 / maxInputCollapsePerRow}`}`}
                          hidden={item?.isHide}
                          style={{ padding: '0 8px' }}
                        >
                          {showInputBoxByInputType(item)}
                        </div>
                      ))}
                    </div>
                  )}

              {/* button group */}
              <div className={`d-flex justify-content-end`} style={{ gap: 12 }}>
                {/* show more button */}
                {!Array.isArray(inputCollapseGroup) || inputCollapseGroup.length === 0 ? null : (
                  <Tooltip text={isShowMore ? 'ย่อ' : 'เพิ่มเติม'} contentBoxStyle={{ width: '80px' }}>
                    <Button
                      type={'secondary'}
                      icon={isShowMore ? <LessThanSvg /> : <MoreThanSvg />}
                      onClick={() => setIsShowMore((prev) => !prev)}
                      style={{ minWidth: 0, width: 40 }}
                    />
                  </Tooltip>
                )}
                {/* search button */}
                <Button type={'primary'} icon={<SearchSvg />} onClick={handleSubmitValidation}>
                  {textSearchButton || 'ค้นหา'}
                </Button>

                {/* reset button */}
                {!isShowReset ? null : (
                  <Button type={'reset'} onClick={() => handleClickReset()}>
                    ล้างข้อมูล
                  </Button>
                )}
              </div>
            </div>

            {/* when click show selecter more button*/}
            {isHaveStatus && (
              <div className="searchBarCurr_radio_box">
                <div className="searchBarCurr_radio_container">
                  <Label type={'status'}> {recordStatusOption.label}</Label>
                  {recordStatusOption?.option?.map((item) => (
                    <div className="searchBarCurr_radio" key={item.recordStatus}>
                      <input
                        id="searchBarCurr__radio"
                        className=""
                        type="radio"
                        name=""
                        value={item.recordStatus || ''}
                        autoComplete="off"
                        onChange={(e) => handleChangValue('recordStatus', e.target.value, onChangeRecordStatus)}
                        checked={data.recordStatus === item.recordStatus}
                      />
                      <label className="form-check-label" htmlFor="searchBarCurr__radio">
                        {item.recordStatusName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Paper>
      <AlertModal
        isOpen={isShowModalData.warning}
        onRequestClose={() => setIsShowModalData((prev) => ({ ...prev, warning: false }))}
        type="warning"
        title="กรุณาระบุเงื่อนไขในการค้นหา"
        description={`กรุณาระบุอย่างน้อย 1 เงื่อนไข`}
        onClickCancel={() => setIsShowModalData((prev) => ({ ...prev, warning: false }))}
        onClickConfirm={() => setIsShowModalData((prev) => ({ ...prev, warning: false }))}
      />
    </>
  )
}

const inputGroupPropTypes = {
  inputType: PropTypes.oneOf(['input', 'select', 'autocomplete', 'custom']),
  key: PropTypes.string,
  placeholder: PropTypes.string,
  option: PropTypes.arrayOf(PropTypes.object),
  optionValueKey: PropTypes.string,
  optionNameKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  optionNameMiddleSymbol: PropTypes.string,
  onChange: PropTypes.func,
  onAutoCompleteTextChange: PropTypes.func,
  disabled: PropTypes.bool,
  groupKey: PropTypes.string,
  order: PropTypes.number,
  isHide: PropTypes.bool,
  colSpan: PropTypes.number,
  inputComponent: PropTypes.node,
  isLoading: PropTypes.bool,
  isRequired: PropTypes.bool,
}

// check data type of prop
SearchBar.propTypes = {
  initialValue: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  value: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  title: PropTypes.string,
  inputShowGroup: PropTypes.arrayOf(PropTypes.shape({ ...inputGroupPropTypes })),
  inputCollapseGroup: PropTypes.arrayOf(PropTypes.shape({ ...inputGroupPropTypes })),
  maxInputCollapsePerRow: PropTypes.number,
  onSearch: PropTypes.func,
  onClickSearch: PropTypes.func,
  textSearchButton: PropTypes.string,
  onClickReset: PropTypes.func,
  isShowReset: PropTypes.bool,
  isHaveStatus: PropTypes.bool,
  onChangeRecordStatus: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

// default value
SearchBar.defaultProps = {
  initialValue: {},
  inputShowGroup: [
    {
      inputType: 'input',
      key: '',
      placeholder: '',
      option: [],
      optionValueKey: '',
      optionNameKey: '',
      onChange: null,
      disabled: false,
      isHide: false,
    },
  ],
  maxInputCollapsePerRow: 3,
  inputCollapseGroup: [],
  onSearch: () => {},
  onClickSearch: () => {},
  textSearchButton: '',
  onClickReset: () => {},
  isShowReset: true,
  isHaveStatus: false,
  onChangeRecordStatus: null,
  className: '',
  style: {},
}

export default SearchBar
