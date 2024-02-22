import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/ChapterBox.css'
import Button from '../../../Button/Button'
import CheckedSvg from '../../asset/CheckedSvg'

function ChapterBox({ onClickFillData, chapterName, isComplete }) {
  return (
    <div className="ChapterBox_container">
      <div className="ChapterBox_check">{typeof isComplete === 'boolean' && <CheckedSvg className={!isComplete ? 'notComplete' : ''} />}</div>

      <div>{chapterName}</div>

      <Button type="secondary" onClick={() => onClickFillData()}>
        จัดทำข้อมูล
      </Button>
    </div>
  )
}

ChapterBox.propTypes = {
  isComplete: PropTypes.bool,
  chapterName: PropTypes.string.isRequired,
  onClickFillData: PropTypes.func.isRequired,
}

export default ChapterBox
