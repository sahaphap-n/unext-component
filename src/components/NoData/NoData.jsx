import React from 'react'
import './styleSheet/NoData.css'
import NoDataSvg from './asset/NoDataSvg'
import PropTypes from 'prop-types'

// v1.1.0
function NoData({ image, imageClassName, imageStyle, description, button }) {
  return (
    <div className="noData_container">
      <div className="noData_content">
        {image ? (
          <div className={imageClassName} style={imageStyle}>
            {image}
          </div>
        ) : (
          <NoDataSvg className={'default_image'} />
        )}
        <div className="description">{description || 'ไม่พบข้อมูล'}</div>
        {button ? button : null}
      </div>
    </div>
  )
}

NoData.propTypes = {
  image: PropTypes.element,
  imageClassName: PropTypes.string,
  imageStyle: PropTypes.object,
  description: PropTypes.string.isRequired,
  button: PropTypes.element,
}

NoData.defaultProps = {
  image: <NoDataSvg />,
  imageClassName: '',
  imageStyle: {},
  description: '',
  button: null,
}

export default NoData
