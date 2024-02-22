import React from 'react'
import PropTypes from 'prop-types'
import MoreInformationSvg from './asset/MoreInformationSvg'
import './styleSheet/Label.css'
import Tooltip from '../Tooltip/Tooltip'

const menuStatus = [
  {
    icon: <div className="label_status_tooltip label_status_active "></div>,
    label: 'ใช้งาน',
  },
  {
    icon: <div className="label_status_tooltip label_status_inactive "></div>,
    label: 'ไม่ใช้งาน',
  },
]

//v1.0.0
function Label({ children, htmlFor, required, type, style, className, haveColon }) {
  return (
    <label htmlFor={htmlFor} className={`label_box ${className}`} style={style}>
      {children}

      {type === 'status' && (
        <Tooltip className="status margin_left" menu={menuStatus} contentBoxStyle={{ width: '11rem' }}>
          <MoreInformationSvg />
        </Tooltip>
      )}

      {required && <span className="required">*</span>}
      {haveColon && <span className="colon margin_left">:</span>}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['form', 'status', 'radio']),
  style: PropTypes.object,
  className: PropTypes.string,
  haveColon: PropTypes.bool,
}

Label.defaultProps = {
  children: '',
  htmlFor: '',
  required: false,
  type: 'form',
  style: {},
  className: '',
  haveColon: false,
}

export default Label
