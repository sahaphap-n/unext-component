import React from 'react'
import PropTypes from 'prop-types'
import './style/ChapterList.css'
import CheckedSvg from './asset/CheckedSvg'
import ChapterBox from './component/ChapterBox/ChapterBox'

function ChapterList({ title, successDescription, chapterList, onClickFillData }) {
  return (
    <div>
      <div className="chapterList_header">
        <h5 className="title_main">{title}</h5>
        {successDescription && (
          <div>
            <CheckedSvg />
            <span className="discription">{successDescription} </span>
          </div>
        )}
      </div>
      <div className="chapterList_frame">
        {chapterList?.map((item) => (
          <ChapterBox
            key={item.seq}
            onClickFillData={() => onClickFillData(item.seq)}
            chapterName={item.page_name_th}
            isComplete={item.is_checked}
          />
        ))}
      </div>
    </div>
  )
}

ChapterList.propTypes = {
  title: PropTypes.string.isRequired,
  successDescription: PropTypes.string,
  chapterList: PropTypes.arrayOf(
    PropTypes.shape({
      seq: PropTypes.string.isRequired,
      page_name_th: PropTypes.string.isRequired,
      is_checked: PropTypes.bool,
    })
  ),
  onClickFillData: PropTypes.func.isRequired,
}

export default ChapterList
