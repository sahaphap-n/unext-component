import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '../Tooltip/Tooltip'
import AddSvg from './asset/AddSvg'
import EditSvg from './asset/EditSvg'
import ViewSvg from './asset/ViewSvg'
import DeleteSvg from './asset/DeleteSvg'
import SettingSvg from './asset/SettingSvg'
import DownloadSvg from './asset/DownloadSvg'
import CopySvg from './asset/CopySvg'
import SearchSvg from './asset/SearchSvg'
import MinusSvg from './asset/MinusSvg'
import './styleSheet/MenuAction.css'

//v1.2.1
function MenuAction({ menu }) {

  const setIcon = type => {
    let icon
    switch (type) {
      case 'add':
        icon = <AddSvg />
        break
      case 'subtract':
        icon = <MinusSvg />
        break
      case 'edit':
        icon = <EditSvg />
        break
      case 'view':
        icon = <ViewSvg />
        break
      case 'setting':
        icon = <SettingSvg />
        break
      case 'delete':
        icon = <DeleteSvg className={'deleteIcon'} />
        break
      case 'download':
        icon = <DownloadSvg />
        break
      case 'copy':
        icon = <CopySvg />
        break
      case 'search':
        icon = <SearchSvg className="searchIcon" />
        break
      default:
        icon = ''
        break
    }

    return icon
  }

  const setTooltipText = (type, labelTooltip) => {
    if (labelTooltip) return labelTooltip

    let label
    switch (type) {
      case 'add':
        label = 'เพิ่ม'
        break
      case 'subtract':
        label = 'ลด'
        break
      case 'edit':
        label = 'แก้ไข'
        break
      case 'view':
        label = 'ดู'
        break
      case 'setting':
        label = 'ตั้งค่า'
        break
      case 'delete':
        label = 'ลบ'
        break
      case 'download':
        label = 'ดาวน์โหลด'
        break
      case 'copy':
        label = 'คัดลอก'
        break
      case 'search':
        label = 'ค้นหา'
        break
      default:
        label = ''
        break
    }

    return label
  }

  const generateUniqueKey = () => {
    const word = 'abcdefghijklmnopqrstuvwxyz'
    const randomWord = word[Math.floor(Math.random() * word.length)]
    const randomNum = Math.floor(Math.random() * 1000000000)
    return `${randomWord}${randomNum}`
  }

  return (
    <div className="menuAction_list">
      {menu &&
        menu?.length > 0 &&
        menu?.map((item, index) => {
          const { label, type, text, icon, disabled, onClick, tooltipStyle, buttonStyle, tooltipPlacement } = item

          return (
            <Tooltip
              text={!text ? setTooltipText(type, label) : ''}
              key={generateUniqueKey()}
              contentBoxStyle={text ? { display: 'none' } : tooltipStyle}
              placement={tooltipPlacement}
            >
              <button
                onClick={onClick}
                className={`menuAction_button ${text ? 'menuAction_have_text' : ''}`}
                type="button"
                disabled={disabled}
                style={buttonStyle ?? {}}
              >
                {icon || setIcon(type) ? <div style={{ marginRight: !text ? '0' : '10px' }}>{icon ? icon : setIcon(type)}</div> : null}
                <div style={{ flexShrink: '0' }}>{text}</div>
              </button>
            </Tooltip>
          )
        })}
    </div>
  )
}

MenuAction.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['add', 'subtract', 'edit', 'view', 'setting', 'delete', 'download', 'copy', 'search']),
      icon: PropTypes.element,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      tooltipStyle: PropTypes.object,
      tooltipPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
      buttonStyle: PropTypes.object,
    }),
  ),
}

MenuAction.defaultProps = {
  menu: [],
}

export default MenuAction