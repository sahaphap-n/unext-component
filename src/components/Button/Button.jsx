import React, { useEffect, useState } from 'react'
import './styleSheet/Button.css'
import PropTypes from 'prop-types'
import ArrowLeftCircleSvg from './asset/ArrowLeftCircleSvg'
import ArrowLeftSvg from './asset/ArrowLeftSvg'
import CrossSvg from './asset/CrossSvg'
import PlusSvg from './asset/PlusSvg'
import PlusInfoSvg from './asset/PlusInfoSvg'
import ArrowDownSvg from './asset/ArrowDownSvg'
import DeleteSvg from './asset/DeleteSvg'
import NextSvg from './asset/NextSvg'
import ResetSvg from './asset/ResetSvg'
import Tooltip from '../Tooltip/Tooltip'
import ExportSvg from './asset/ExportSvg'

// v1.0.0
function Button(props) {
  const { type, collapseState, onClick } = props
  const [isShowCollapse, setIsShowCollapse] = useState(false)

  useEffect(() => {
    if (typeof collapseState === 'boolean') {
      setIsShowCollapse(collapseState)
    }
  }, [collapseState])

  // tooltip
  const setTextTooltip = () => {
    let text = ''

    switch (type) {
      case 'collapse':
        text = !isShowCollapse ? 'เพิ่มเติม' : 'ย่อ'
        break
      default:
        text = ''
    }

    return text
  }

  // collapse button
  const handleShowCollapse = () => {
    setIsShowCollapse((prevBool) => !prevBool)
    if (onClick) {
      onClick()
    }
  }

  const collapseIcon = (
    <div className={isShowCollapse ? 'button_collapse_rotate' : ''}>
      <ArrowDownSvg />
    </div>
  )

  return ['collapse'].includes(type) ? (
    <Tooltip text={setTextTooltip()} contentBoxStyle={!isShowCollapse ? { width: '80px' } : {}}>
      <ButtonMain {...props} onButtonClick={handleShowCollapse} icon={collapseIcon} />
    </Tooltip>
  ) : (
    <ButtonMain {...props} onButtonClick={onClick} />
  )
}

const ButtonMain = ({
  type,
  onButtonClick,
  disabled,
  children,
  icon,
  iconDirection,
  style,
  className,
  actionType,
  isHide,
  closeIconStyle,
}) => {
  // button style
  const setCssByButtonType = () => {
    let className = ''

    switch (type) {
      case 'primary':
        className = `button_btn button_md button_primary `
        break
      case 'dangerPrimary':
        className = `button_btn button_md button_primary button_dangerPrimary `
        break
      case 'secondary':
        className = `button_btn button_md button_secondary `
        break
      case 'dangerSecondary':
        className = `button_btn button_md button_secondary button_dangerSecondary `
        break
      case 'addPrimary':
        className = `button_btn button_md button_primary `
        break
      case 'addInfo':
        className = `button_btn button_md button_info  button_addInfo`
        break
      case 'delSecondary':
        className = `button_btn button_md button_secondary button_delete`
        break
      case 'back':
        className = 'button_btn button_md button_back'
        break
      case 'backStep':
        className = 'button_btn button_md button_secondary'
        break
      case 'upload':
        className = 'button_btn button_md button_secondary button_upload'
        break
      case 'close':
        className = 'button_close'
        break
      case 'closeCircle':
        className = 'button_closeCircle'
        break
      case 'next':
        className = `button_btn button_md button_secondary button_reverse`
        break
      case 'reset':
        className = `button_btn button_md button_reset `
        break
      case 'collapse':
        className = `button_collapse `
        break
      case 'info':
        className = `button_info button_textInfo button_iconInfo`
        break

      default:
        className = ''
        break
    }

    return className
  }

  const setIconDirection = () => {
    let className = ''

    switch (iconDirection) {
      case 'left':
        className = ''
        break
      case 'right':
        className = 'button_reverse'
        break

      default:
        className = ''
        break
    }

    return className
  }

  // icon
  const setIconByButtonType = () => {
    let icon = null
    switch (type) {
      case 'back':
        icon = <ArrowLeftCircleSvg />
        break
      case 'backStep':
        icon = <ArrowLeftSvg />
        break
      case 'upload':
        icon = <ExportSvg />
        break
      case 'close':
        icon = <CrossSvg style={closeIconStyle ?? {}} />
        break
      case 'closeCircle':
        icon = <CrossSvg color="white" style={closeIconStyle ?? { width: 8, height: 8 }} />
        break
      case 'addPrimary':
        icon = <PlusSvg />
        break
      case 'addInfo':
        icon = <PlusInfoSvg />
        break
      case 'delSecondary':
        icon = <DeleteSvg />
        break
      case 'next':
        icon = <NextSvg />
        break
      case 'reset':
        icon = <ResetSvg />
        break

      default:
        icon = null
    }

    return icon
  }

  return (
    <button
      style={style}
      onClick={onButtonClick}
      className={`${setCssByButtonType()} ${setIconDirection()} ${className}`}
      type={actionType}
      disabled={disabled}
      hidden={isHide}
    >
      {icon || setIconByButtonType() ? (
        <div style={{ lineHeight: 0, marginRight: !children ? '0' : '10px' }}>
          {icon ? icon : setIconByButtonType()}
        </div>
      ) : null}
      <div style={{ flexShrink: '0' }}>{children}</div>
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'dangerPrimary',
    'secondary',
    'dangerSecondary',
    'back',
    'backStep',
    'upload',
    'close',
    'closeCircle',
    'addPrimary',
    'addInfo',
    'delSecondary',
    'collapse',
    'reset',
    'next',
    'info',
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  icon: PropTypes.element,
  iconDirection: PropTypes.oneOf(['left', 'right']),
  collapseState: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  actionType: PropTypes.oneOf(['button', 'submit', 'reset']),
  isHide: PropTypes.bool,
}

Button.defaultProps = {
  type: 'primary',
  onClick: () => {},
  disabled: false,
  children: '',
  icon: null,
  iconDirection: 'left',
  collapseState: null,
  style: {},
  className: '',
  actionType: 'button',
  isHide: false,
}

export default Button
