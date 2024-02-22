// version 1.0.0

import React from 'react'
import PropTypes from 'prop-types'

// styles
import './styleSheet/Stepper.css'

export default function Stepper({ activeStep, progress, steps, onStepClick, successStep }) {
  const getCurrentStatus = (no) => {
    if (+successStep >= +no && +no !== +activeStep) {
      return 'finished'
    } else if (+no === +activeStep) {
      return 'active'
    } else {
      return ''
    }
  }

  const handleClickStep = (no) => {
    if (onStepClick) onStepClick(no)
  }

  return (
    <section id="stepper">
      {steps.map((item, no) => {
        const itemNo = no + 1
        const status = getCurrentStatus(itemNo)
        const lineActiveClassName = itemNo < activeStep || itemNo < successStep ? 'lineActive' : ''

        return (
          <div
            key={item.title}
            onClick={status === 'finished' ? () => handleClickStep(itemNo) : null}
            className={`step-progress ${status} ${lineActiveClassName} `}
            role={onStepClick ? 'button' : 'progress'}
          >
            <div
              className="step-no"
              style={status === 'active' ? { background: `conic-gradient(#1890ff ${progress}%, #fff 0%)` } : null}
              data-step={itemNo}
              data-progress={progress}
            ></div>
            <div className="step-label">{item.title}</div>
          </div>
        )
      })}
    </section>
  )
}

Stepper.propTypes = {
  activeStep: PropTypes.number,
  progress: PropTypes.number,
  onStepClick: PropTypes.func,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
  successStep: PropTypes.bool,
}

Stepper.defaultProps = {
  activeStep: 0,
  steps: [],
}
