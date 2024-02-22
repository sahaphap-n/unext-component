import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/Tooltip.css'

// version 1.0.0
function Tooltip({ style, className, children, menu, text, contentBoxStyle, placement }) {
  return (
    <div className={`tooltip_parent ${className ? className : ''}`} style={style}>
      {children}
      <div className="tooltip_children" style={contentBoxStyle} data-placement={placement || 'bottom'}>
        {text && <div className="tooltip_text">{text}</div>}
        {menu?.length === 0 ? null : (
          <div>
            {menu?.map((item, index) => (
              <div key={index} className="tooltip_menu_list_box">
                {/* icon */}
                <div className="tooltip_menu_icon_box">{item?.icon}</div>

                {/* label */}
                <div className="tooltip_menu_label">{item?.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  children: PropTypes.element,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
  ),
  text: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  contentBoxStyle: PropTypes.object,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
}

Tooltip.defaultProps = {
  children: null,
  menu: [],
  text: '',
  className: '',
  style: {},
  contentBoxStyle: {},
  placement: 'bottom',
}

export default Tooltip
