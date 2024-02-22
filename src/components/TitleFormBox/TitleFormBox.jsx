import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Divider from '../Divider/Divider'
import './styleSheet/TitleFormBox.css'

function TitleFormBox({ title, subTitles, hasCollapse }) {
  const [collapseList, setCollapseList] = useState([])
  const [isShowCollapse, setIsShowCollapse] = useState(true)

  useEffect(() => {
    const setInitialCollapseList = () => {
      const newList = []

      for (let i = 0; i < subTitles.length; i++) {
        newList.push(true)
      }
      setCollapseList(newList)
    }

    setInitialCollapseList()
  }, [])

  const handleClickCollapse = (index) => {
    const newCollapseList = [...collapseList]
    newCollapseList[index] = !newCollapseList[index]
    setCollapseList(newCollapseList)
  }

  return (
    <div>
      {title && (
        <div className="d-flex justify-content-between">
          <h4 className="titleFormBox_hearder">{title}</h4>
          {hasCollapse && (
            <Button
              type={'collapse'}
              style={{ border: '1px solid #f0f0f0' }}
              collapseState={isShowCollapse}
              onClick={() => setIsShowCollapse((prev) => !prev)}
            />
          )}
        </div>
      )}

      {isShowCollapse && (
        <div>
          {subTitles?.map((item, index) => (
            <div key={item.key || item.id || index}>
              {item.subTitle && (
                <div className="titleFormBox_subtitleBox">
                  <div className="titleFormBox_subtile">{item.subTitle}</div>
                  {item.hasCollapse && (
                    <Button
                      type={'collapse'}
                      style={{ border: '1px solid #f0f0f0' }}
                      collapseState={collapseList[index]}
                      onClick={() => handleClickCollapse(index)}
                    />
                  )}
                </div>
              )}

              {item?.formComponent &&
                (!item.hasCollapse || (item.hasCollapse && collapseList[index]) ? (
                  <div>{item.formComponent}</div>
                ) : null)}

              {index + 1 < subTitles?.length && <Divider type={'dashed'} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

TitleFormBox.propTypes = {
  title: PropTypes.string.isRequired,
  subTitles: PropTypes.arrayOf(
    PropTypes.shape({
      subTitle: PropTypes.string,
      formComponent: PropTypes.node,
      hasCollapse: PropTypes.bool,
    })
  ),
  hasCollapse: PropTypes.bool,
}
TitleFormBox.defaultProps = { title: '', subTitles: [], hasCollapse: false }

export default TitleFormBox
