import React, { useState } from 'react'
import Paper from '../Paper/Paper'
import './styleSheet/Card.css'
import Button from '../Button/Button'

function Card({ key, title, subTitle, header, actions, children, collapse, collapseContent, inputBox }) {
  const [isShowCollapse, setIsShowCollapse] = useState(true)

  return (
    <>
      <Paper>
        <div className="cardContainer">
          <div className="headerBox">
            <div className="d-flex">
              {inputBox && (
                <div className="d-flex" style={{ width: 32, alignItems: 'center' }}>
                  {inputBox}
                </div>
              )}
              <div>
                {header ?? (
                  <>
                    <div className="headerTitle">{title}</div>
                    <div className="subTitle">{subTitle}</div>
                  </>
                )}
              </div>
            </div>
            <div className="d-flex  align-items-center" style={{ gap: 16 }}>
              <div className="actionBox">{actions}</div>
              {collapse && <Button type="collapse" onClick={() => setIsShowCollapse((prev) => !prev)}></Button>}
            </div>
          </div>
          <div className={`bodyBox ${inputBox ? 'checkbox' : ''}`}>
            <div>
              {children}
              {collapse && isShowCollapse ? collapseContent : null}
            </div>
          </div>
        </div>
      </Paper>
    </>
  )
}

export default Card
