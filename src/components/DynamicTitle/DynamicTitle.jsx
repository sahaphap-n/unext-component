import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/DynamicTitle.css'
import ContentGrayFrame from '../ContentGrayFrame/ContentGrayFrame'
import MenuAction from '../MenuAction/MenuAction'
import Button from '../Button/Button'

function DynamicTitle({ data, onInputChange, inputPlaceholder, onDelete, onAddPrimary, addPrimaryLabel, onAdd, addButtonLabel, disabled }) {
  return (
    <ContentGrayFrame>
      <div className="dynamicTitle_container">
        {!data || data.length === 0 ? (
          <ContentGrayFrame style={{ background: 'white', border: '1px solid rgba(24,28,33,0.1)', textAlign: 'center' }}>
            ไม่พบข้อมูล
          </ContentGrayFrame>
        ) : (
          data?.map((item, index) => {
            const { value, invalidMessage, disabledInput, isHideDelete } = item

            return (
              <div key={index}>
                <div className="info_box">
                  <input
                    className={`form-control ${invalidMessage ? 'is-invalid' : ''}`}
                    value={value}
                    onChange={e => onInputChange(e.target.value, index)}
                    placeholder={inputPlaceholder}
                    disabled={disabledInput || disabled}
                  />

                  {!isHideDelete && (
                    <div className="action_delete">
                      <MenuAction menu={[{ type: 'delete', onClick: () => onDelete(index), disabled: disabled, tooltipPlacement: 'left' }]} />
                    </div>
                  )}
                </div>
                {invalidMessage && <div className="invalid-feedback d-block">{invalidMessage}</div>}
              </div>
            )
          })
        )}

        {(onAddPrimary || onAdd) && (
          <div className="d-flex " style={{ columnGap: '16px' }}>
            {onAddPrimary && (
              <Button type={'addPrimary'} onClick={() => onAddPrimary()} disabled={disabled}>
                {addPrimaryLabel}
              </Button>
            )}

            {onAdd && (
              <Button type={'addInfo'} onClick={() => onAdd()} disabled={disabled}>
                {addButtonLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </ContentGrayFrame>
  )
}

DynamicTitle.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      invalidMessage: PropTypes.string,
      disabledInput: PropTypes.bool,
      isHideDelete: PropTypes.bool,
    }),
  ),
  onInputChange: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  addButtonLabel: PropTypes.string,
  onAddPrimary: PropTypes.func,
  addPrimaryLabel: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
}

DynamicTitle.defaultProps = {
  data: [],
  addButtonLabel: 'เพิ่มข้อมูล',
  addPrimaryLabel: 'เพิ่มข้อมูลตั้งต้น',
  inputPlaceholder: 'ระบุรายละเอียด',
  disabled: false,
}

export default DynamicTitle
