import React, { useEffect, useState } from 'react'
import './styleSheet/Tabs.css'
import PropTypes from 'prop-types'

function Tabs({ type, option, sectionLabel, onChange, menu, defaultActiveKey, iconPosition, containerStyle, containerType }) {
  const [activeKey, setActiveKey] = useState('')

  useEffect(() => {
    const setDefaultActiveId = () => {
      if (defaultActiveKey) {
        setActiveKey(defaultActiveKey)
      } else {
        setActiveKey(1)
      }
    }

    setDefaultActiveId()
  }, [defaultActiveKey])

  const onTabsChange = key => {
    if (onChange) {
      onChange(key)
    }
    setActiveKey(key)
  }

  const setMenuList = () => {
    let newMenu = [...menu]

    switch (option) {
      case 'step':
        for (let i = 1; i <= newMenu.length; i++) {
          newMenu[i - 1].key = i
          newMenu[i - 1].icon = <div className={'round'}>{i}</div>
        }

        break

      case 'section':
        for (let i = 1; i <= newMenu.length; i++) {
          const menuItem = newMenu[i - 1]

          newMenu[i - 1].key = menuItem?.key ? menuItem.key : i
          newMenu[i - 1].icon = menuItem.icon ? menuItem.icon : <div className={'round'}>{i}</div>
          newMenu[i - 1].label = menuItem.label ? menuItem.label : sectionLabel
        }

        break

      default:
        for (let i = 1; i <= newMenu.length; i++) {
          if (!newMenu[i - 1].key) {
            newMenu[i - 1].key = i
          }
        }
        break
    }

    return newMenu
  }

  const setIconPosition = () => {
    let newIconPosition = ''

    switch (option) {
      case 'step':
        newIconPosition = 'left'
        break
      case 'section':
        newIconPosition = 'right'
        break

      default:
        if (iconPosition) {
          newIconPosition = iconPosition
        }
        break
    }

    return newIconPosition
  }

  const setChildren = () => {
    let children = <></>
    const foundChildren = menu?.find(item => item.key === activeKey)

    if (foundChildren) {
      children = foundChildren.children
    }

    return children
  }

  const setTabClassName = (isActive, index) => {
    let newClassName

    switch (type) {
      case 'button':
        const isFirstTap = index === 0
        const isLastTap = Array.isArray(menu) && index === menu.length - 1
        const isOneTap = Array.isArray(menu) && menu.length === 1

        newClassName = `tab_button ${isActive ? 'tab_button_active' : ''} ${isFirstTap && !isOneTap ? 'first_tap' : ''} ${
          isLastTap && !isOneTap ? 'last_tap' : ''
        } ${isOneTap ? 'one_tap' : ''}`
        break

      case 'line':
        newClassName = `tab_line ${isActive ? 'tab_line_active' : ''}  `
        break

      default:
        break
    }

    return newClassName
  }

  const setTabsContainerClassName = () => {
    let newClassName

    switch (containerType) {
      case 'divider':
        newClassName = 'tab_divider '
        break
      case 'box':
        newClassName = 'tab_normalBox'
        break

      default:
        newClassName = ''
        break
    }
    return newClassName
  }

  return (
    <div>
      <div className={`tabs_container grayScrollBar ${setTabsContainerClassName()}`} style={containerStyle}>
        {Array.isArray(menu) &&
          setMenuList()?.map((item, index) => {
            return (
              <button
                key={item?.key}
                onClick={() => onTabsChange(item?.key)}
                className={setTabClassName(activeKey === item?.key, index)}
                style={{ flexDirection: setIconPosition() === 'right' ? 'row-reverse' : '' }}
                disabled={item?.disabled ? item?.disabled : false}
                type="button"
              >
                {item?.icon && <span>{item?.icon}</span>}
                <span>{item?.label} </span>
              </button>
            )
          })}
      </div>
      <div>{setChildren()}</div>
    </div>
  )
}

Tabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
      children: PropTypes.node,
    }),
  ).isRequired,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  option: PropTypes.oneOf(['step', 'section']),
  sectionLabel: PropTypes.string,
  containerStyle: PropTypes.object,
  type: PropTypes.oneOf(['button', 'line']),
  containerType: PropTypes.oneOf(['divider', 'box']),
}

Tabs.defaultProps = {
  onChange: () => {},
  menu: [],
  iconPosition: 'left',
  containerStyle: {},
  type: 'line',
}

export default Tabs
