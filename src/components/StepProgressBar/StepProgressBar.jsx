import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/StepProgressBar.css'

function StepProgressBar({ steps, activeStep }) {
  return (
    <div className="d-flex">
      {steps?.map((item, index) => {
        const { title } = item
        const step = index + 1

        return (
          <span key={step} data-no={step} className={`stepProgressBar_box ${step <= +activeStep ? 'active' : ''}`}>
            {title || ''}
          </span>
        )
      })}
    </div>
  )
}

StepProgressBar.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
  activeStep: PropTypes.number.isRequired,
}

StepProgressBar.defaultProps = {
  steps: [],
  activeStep: 0,
}

export default StepProgressBar
