import React, { useEffect, useState } from 'react'
import PropTypes, { number } from 'prop-types'

const formatDigits = (number) => {
  return new Intl.NumberFormat('th-TH', {
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(setCurrencyStringToNumber(number))
}

const setCurrencyStringToNumber = (valueString) => {
  const splitPointList = String(valueString).split('.')

  const splitCommaList = splitPointList[0].split(',')
  let value = ''
  splitCommaList.forEach((item) => {
    value += item
  })

  let allValue

  if (splitPointList[1]) {
    allValue = +(value + '.' + splitPointList[1])
  } else if (value !== '') {
    allValue = +value
  } else {
    allValue = ''
  }

  return allValue
}

function InputNumber({ type, id, name, value, onChange, onBlur, placeholder, isInvalid, disabled }) {
  const [inputValue, setInputValue] = useState()
  const [displayNumber, setDisplayNumber] = useState(
    typeof value === 'number' && type === 'currency' ? formatDigits(value) : typeof value === 'number' ? value : ''
  )

  useEffect(() => {
    if (value || value === 0) {
      setInputValue(setInitialValue())
      setDisplayNumber(setInitialValue())
    } else {
      setInputValue('')
      setDisplayNumber('')
    }
  }, [value])

  const setInitialValue = () => {
    let initialValue

    switch (type) {
      case 'number':
        initialValue = new Intl.NumberFormat().format(+value)
        break
      case 'currency':
        initialValue = setCurrencyNumberToString(value)
        break
      case 'percent':
        initialValue = setCurrencyNumberToString(value)
        break

      default:
        initialValue = new Intl.NumberFormat().format(+value)
        break
    }

    return initialValue
  }

  const setCurrencyNumberToString = (valueNumber) => {
    const splitPointList = String(valueNumber).split('.')
    const valueTwoDigits =
      String(new Intl.NumberFormat().format(+splitPointList[0])) + (splitPointList[1] ? `.${splitPointList[1]}` : '')

    return valueTwoDigits
  }

  const setIsValidNumber = (value) => {
    let valid

    switch (type) {
      case 'number':
        valid = RegExp('^[,0-9]+$').test(value)

        break
      case 'currency':
        valid = RegExp('^([,0-9]+)(.[0-9]{0,2}){0,1}$').test(value)
        break
      case 'percent':
        valid = RegExp('^([0-9]+)(.[0-9]{0,2}){0,1}$').test(value) && +value <= 100
        break

      default:
        valid = false
        break
    }

    return valid
  }

  const autoFormatCurrencyTwoDigits = (value) => {
    if (setIsValidNumber(value) || value === '') {
      let currencyFormat

      if (value) {
        if (value.includes('.')) {
          const valueSplitPointList = value.split('.')
          if (valueSplitPointList.length <= 1) {
            const valueSplitCommaList = valueSplitPointList[0].split(',')
            let valueNumber = ''
            valueSplitCommaList.forEach((item) => {
              valueNumber += item
            })
            currencyFormat = new Intl.NumberFormat().format(+valueNumber) + '.' + valueSplitPointList[1]
          }
        } else {
          const valueSplitCommaList = value.split(',')
          let valueNumber = ''
          valueSplitCommaList.forEach((item) => {
            valueNumber += item
          })

          if (String(+valueNumber) === 'NaN') {
            currencyFormat = new Intl.NumberFormat().format(+valueNumber.slice(0, -1))
          } else {
            currencyFormat = new Intl.NumberFormat().format(+valueNumber)
          }
        }
      } else {
        currencyFormat = ''
      }

      return currencyFormat
    } else {
      return value.slice(0, -1)
    }
  }

  const handleChangeInputCurrency = (e) => {
    const autoFormat = autoFormatCurrencyTwoDigits(e.target.value)
    setDisplayNumber(autoFormat)
    setInputValue(autoFormat)
    if (onChange && autoFormat !== inputValue) {
      const value =
        type === 'currency'
          ? Math.floor(Number(setCurrencyStringToNumber(e.target.value)) * 100) / 100
          : Number(setCurrencyStringToNumber(e.target.value))
      onChange(value)
    }
  }

  const setPlaceholder = () => {
    let newPlaceholder

    switch (type) {
      case 'number':
        newPlaceholder = '0'
        break
      case 'currency':
        newPlaceholder = '0.00'
        break
      case 'percent':
        newPlaceholder = '0.00'
        break

      default:
        newPlaceholder = placeholder || '0'
        break
    }

    return newPlaceholder
  }

  return (
    <input
      id={id}
      name={name}
      placeholder={setPlaceholder()}
      className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
      value={displayNumber}
      onChange={handleChangeInputCurrency}
      onBlur={(e) => {
        if (type === 'currency') {
          setDisplayNumber(e.target.value ? formatDigits(e.target.value) : '')
        }
        onBlur && onBlur(e)
      }}
      disabled={disabled}
    />
  )
}

InputNumber.propTypes = {
  type: PropTypes.oneOf(['number', 'currency', 'percent']),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  isInvalid: PropTypes.bool,
}

InputNumber.defaultProps = {
  type: 'number',
  id: '',
  name: '',
  value: '',
  onChange: null,
  disabled: false,
  placeholder: '0',
  isInvalid: false,
}

export default InputNumber
