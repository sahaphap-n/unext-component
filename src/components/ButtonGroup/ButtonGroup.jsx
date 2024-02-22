import React from 'react'
import PropTypes from 'prop-types'
import './styleSheet/ButtonGroup.css'
import Button from '../Button/Button'

function ButtonGroup({
  type,
  action,
  onStepChange,

  onReset,
  disabledResetButton,

  onConfirm,
  disabledConfirmButton,
  confirmButtonLabel,
  confirmButtonIcon,

  onCancel,
  disabledCancelButton,
  cancelButtonLabel,
  cancelButtonIcon,

  isHideNextButton,
  disabledNextButton,

  isHideBackButton,
  disabledBackButton,
}) {
  const setConfirmLabel = () => {
    let label
    switch (action) {
      case 'create':
        label = 'บันทึก'
        break
      case 'edit':
        label = 'แก้ไข'
        break
      case 'editing':
        label = 'บันทึก'
        break
      default:
        label = 'บันทึก'
        break
    }
    return label
  }
  return (
    <div className="buttonGroup_container">
      {type === 'step' && (
        <>
          <div style={{ width: '110px' }}>
            <Button isHide={isHideBackButton} disabled={disabledBackButton} type="backStep" className={'btn'} onClick={() => onStepChange(-1)}>
              ย้อนกลับ
            </Button>
          </div>
          <div className="btn_center_box">
            {action === 'editing' && (
              <Button disabled={disabledCancelButton} type={'secondary'} className={'btn-box'} onClick={() => onCancel()} icon={cancelButtonIcon}>
                {cancelButtonLabel || 'ยกเลิก'}
              </Button>
            )}

            <Button
              disabled={disabledConfirmButton}
              actionType="submit"
              type={'primary'}
              className={'btn'}
              onClick={() => onConfirm()}
              icon={confirmButtonIcon}
            >
              {confirmButtonLabel || setConfirmLabel()}
            </Button>

            {action === 'create' && (
              <Button disabled={disabledResetButton} type={'reset'} className={'btn-box'} onClick={() => onReset()}>
                เริ่มใหม่
              </Button>
            )}
          </div>

          <div style={{ width: '110px' }}>
            <Button disabled={disabledNextButton} isHide={isHideNextButton} type="next" className={'btn btn_next'} onClick={() => onStepChange(1)}>
              ถัดไป
            </Button>
          </div>
        </>
      )}

      {type === 'confirm' && (
        <div className="btn_center_box">
          <Button disabled={disabledCancelButton} type={'secondary'} className={'btn-box'} onClick={() => onCancel()} icon={cancelButtonIcon}>
            {cancelButtonLabel || 'ยกเลิก'}
          </Button>
          <Button
            disabled={disabledConfirmButton}
            actionType="submit"
            type={'primary'}
            className={'btn-box'}
            onClick={() => onConfirm()}
            icon={confirmButtonIcon}
          >
            {confirmButtonLabel || 'บันทึก'}
          </Button>
        </div>
      )}
    </div>
  )
}

ButtonGroup.propTypes = {
  type: PropTypes.oneOf(['step', 'confirm']),
  action: PropTypes.oneOf(['create', 'edit', 'editing']),
  onStepChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  disabledResetButton: PropTypes.bool,
  onConfirm: PropTypes.func,
  disabledConfirmButton: PropTypes.bool,
  confirmButtonLabel: PropTypes.string,
  confirmButtonIcon: PropTypes.node,
  onCancel: PropTypes.func,
  disabledCancelButton: PropTypes.bool,
  cancelButtonLabel: PropTypes.string,
  cancelButtonIcon: PropTypes.node,
  disabledNextButton: PropTypes.bool,
  disabledBackButton: PropTypes.bool,
  isHideNextButton: PropTypes.bool,
  isHideBackButton: PropTypes.bool,
}

ButtonGroup.defaultProps = {
  type: 'step',
  action: 'create',
  onStepChange: () => {},
  onReset: () => {},
  disabledResetButton: false,
  onConfirm: () => {},
  disabledConfirmButton: false,
  confirmButtonLabel: '',
  onCancel: () => {},
  cancelButtonLabel: '',
  disabledCancelButton: false,
  disabledNextButton: false,
  disabledBackButton: false,
  isHideNextButton: false,
  isHideBackButton: false,
}

export default ButtonGroup
