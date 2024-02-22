import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/SectionStatusBar.css'

function SectionStatusBar({ sectionStatus, label }) {
  return (
    <div className="sectionStatusBar_container" style={!label ? { gridTemplateColumns: '1fr' } : {}}>
      {label && <h6>{label} :</h6>}
      <div className="category_no">
        {sectionStatus?.map((item) => (
          <div className="circle circle_box_outer" key={item?.section} data-status={item?.status || '1'}>
            <div className="circle inner1">
              <div className="circle inner2" data-status={item?.status || '1'}>
                {item?.section}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

SectionStatusBar.propTypes = {
  sectionStatus: PropTypes.arrayOf(
    PropTypes.shape({
      section: PropTypes.number.isRequired,
      //1 = do not yet, 2= in progress and 3= done
      status: PropTypes.oneOf(['1', '2', '3']),
    })
  ),
}

SectionStatusBar.defaultProps = {
  sectionStatus: [],
}

export default SectionStatusBar
