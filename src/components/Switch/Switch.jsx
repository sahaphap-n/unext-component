import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { flushSync } from 'react-dom'

// style
import './styleSheet/Switch.css'

function Switch({
  onClick,
  disabled,
  defaultChecked,
  type = '',
  checkedLabel = '',
  uncheckedLabel = '',
  checkedValue = '',
  uncheckedValue = '',
}) {
  if (type === 'status') {
    checkedLabel = 'ใช้งาน'
    uncheckedLabel = 'ไม่ใช้งาน'
    checkedValue = 'A'
    uncheckedValue = 'I'
  }

  const [isToggle, setIstoggle] = useState(true)

  const handleClick = e => {
    flushSync(() => setIstoggle(!isToggle))

    if (onClick) {
      onClick(
        e.target.value === 'true' && checkedValue ? checkedValue : e.target.value === 'false' && uncheckedValue ? uncheckedValue : e.target.value,
      )
    }
  }

  useEffect(() => {
    if (defaultChecked !== undefined) setIstoggle(defaultChecked)
  }, [defaultChecked])

  return (
    <div className="container_switch">
      <label className="switch">
        <input type="checkbox" disabled={disabled} value={isToggle} checked={isToggle} onChange={handleClick} />
        <span className="slider" />
      </label>
      {(checkedLabel || uncheckedLabel) && <span>{isToggle ? checkedLabel : uncheckedLabel}</span>}
    </div>
  )
}

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

Switch.defaultProps = {
  onChange: () => {},
  disabled: false,
  defaultChecked: true,
}

export default Switch
