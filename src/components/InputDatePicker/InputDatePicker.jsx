import React, { useState, useRef, useEffect } from 'react'
import './styleSheet/InputDatePicker.css'
import PropTypes from 'prop-types'
import DatePicker from 'react-multi-date-picker'
import calendarThaiFormat from './utils/calendarThaiFormat'
import calendarThaiLanguage from './utils/calendarThaiLanguage'
import CalendarSvg from './asset/CalendarSvg'
import Button from '../Button/Button'

function InputDatePicker({ onChange, isInvalid, invalidMessage, placeholder, format, value, disabled, onClear, id }) {
  const [valueShow, setValueShow] = useState('')
  const dateRef = useRef()

  useEffect(() => {
    if (value) {
      setValueShow(value)
    } else {
      setValueShow('')
    }
  }, [value])

  const handleInputChange = (inputValue) => {
    const sanitizedInput = String(inputValue).replace(/[^0-9]/g, '')

    if (!sanitizedInput) {
      return setValueShow('')
    }

    let day = sanitizedInput.slice(0, 2)
    let month = sanitizedInput.slice(2, 4)
    let year = sanitizedInput.slice(4, 8)

    // Validate day and month
    // day = day ? parseInt(day, 10).toString().padStart(2, '0') : '';
    // month = month ? parseInt(month, 10).toString().padStart(2, '0') : '';

    let formattedDate = ''

    if (day) {
      formattedDate += day
    }

    if (month) {
      formattedDate += `/${month}`
    }

    if (year) {
      formattedDate += `/${year}`
    }
    setValueShow(formattedDate)
    onChange(formattedDate)
  }

  const handleDateChange = (value) => {
    const valueFormat = value.format()
    if (onChange && typeof onChange === 'function') {
      onChange(valueFormat)
    }

    setValueShow(valueFormat)
  }
  const handleClear = () => {
    if (onClear) {
      onClear()
    }
    setValueShow('')
  }
  return (
    <div className={`inputPicker_datePicker`}>
      <input
        id={id}
        className={`form-control ${isInvalid ? 'is-invalid' : ''} ${disabled ? 'disabled' : ''} `}
        onClick={() => dateRef.current.openCalendar()}
        placeholder={placeholder}
        value={valueShow}
        onChange={(e) => handleInputChange(e.target.value)}
        disabled={disabled}
      />
      {isInvalid && <div className="invalid-feedback d-block">{invalidMessage}</div>}
      <DatePicker
        id={`calendar-${id}`}
        inputClass={`d-none`}
        containerStyle={{
          width: '100%',
          position: 'absolute',
          bottom: '35%',
        }}
        disabled={disabled}
        calendar={calendarThaiFormat}
        format={format}
        value={valueShow}
        calendarPosition={'right-center'}
        onChange={(value) => handleDateChange(value)}
        locale={calendarThaiLanguage}
        showOtherDays
        ref={dateRef}
      />
      {valueShow ? (
        <Button
          type="closeCircle"
          style={{ position: 'absolute', top: 12, right: 34 }}
          onClick={() => handleClear()}
          disabled={disabled}
        />
      ) : null}
      <CalendarSvg onClick={() => dateRef.current.openCalendar()} className="icon" />
    </div>
  )
}

InputDatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  invalidMessage: PropTypes.string,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
}

InputDatePicker.defaultProps = {
  format: 'DD/MM/YYYY',
}

export default InputDatePicker
