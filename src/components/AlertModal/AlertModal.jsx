import React, { useEffect } from 'react'
import './styleSheet/AlertModal.css'
import PropTypes from 'prop-types'
import { AlertModalImage } from './assets/AlertModalImage'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'

// version 1.0.4
function AlertModal({
  type,
  image,
  title,
  description,
  onClickConfirm,
  onClickCancel,
  confirmButtonText,
  cancelButtonText,
  isOpen,
  onRequestClose,
  style,
  autoClose,
}) {
  const { successIcon, errorIcon, questionIcon, warningIcon, deleteIcon } = AlertModalImage()

  const setImage = () => {
    let image

    switch (type) {
      case 'success':
        image = successIcon
        break
      case 'error':
        image = errorIcon
        break
      case 'confirm':
        image = questionIcon
        break
      case 'warning':
        image = warningIcon
        break
      case 'confirmDelete':
        image = deleteIcon
        break
      default:
        image = questionIcon
        break
    }

    return image
  }

  const setTitle = () => {
    let title = ''

    switch (type) {
      case 'success':
        title = 'ทำรายการสำเร็จ !'
        break
      case 'error':
        title = 'มีบางอย่างผิดพลาด !'
        break
      case 'confirm':
        title = 'ยันยันการทำรายการ'
        break
      case 'warning':
        title = 'มีบางอย่างผิดพลาด !'
        break
      case 'confirmDelete':
        title = 'ยืนยันการลบข้อมูล ?'
        break
      default:
        title = ''
        break
    }

    return title
  }

  const setDescription = () => {
    let description = ''

    switch (type) {
      case 'success':
        description = 'คุณทำรายการสำเร็จ'
        break
      case 'error':
        description = 'มีบางอย่างผิดพลาด โปรดทำรายการอีกครั้ง.'
        break
      case 'confirm':
        description = 'คุณต้องการยันยันการทำรายการหรือไม่ ?'
        break
      case 'warning':
        description = 'มีบางอย่างผิดพลาด โปรดทำรายการอีกครั้ง.'
        break
      case 'confirmDelete':
        description = 'คุณต้องการยืนยันการลบข้อมูล'
        break
      default:
        description = ''
        break
    }

    return description
  }

  useEffect(() => {
    if (autoClose && isOpen) {
      setTimeout(() => {
        onRequestClose()
      }, 3000)
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="alertModal_container" style={style}>
        <div>
          {/* close button */}
          {/* <div className="alertModal_close_icon">
            <Button type="close" onClick={() => onRequestClose()} />
          </div> */}

          {/* image */}
          <div className="alertModal_image">{image || setImage()}</div>

          {/* title */}
          <h3 className="alertModal_text_title">{title || setTitle()}</h3>

          {/* description */}
          <div className="alertModal_text_desc">{description || setDescription()}</div>

          {/* button */}
          <div className="confirmModal_buttom_btn_container">
            {type === 'success' ? null : ['error', 'warning'].includes(type) ? (
              <Button type={'primary'} onClick={() => onClickConfirm()}>
                {confirmButtonText || 'ยืนยัน'}
              </Button>
            ) : ['confirm', 'confirmDelete'].includes(type) ? (
              <>
                <Button type={'secondary'} onClick={() => onClickCancel()}>
                  {cancelButtonText || 'ยกเลิก'}
                </Button>
                <Button type={'primary'} onClick={() => onClickConfirm()}>
                  {confirmButtonText || 'ยืนยัน'}
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  )
}

// check data type of prop. they show wanning in console
AlertModal.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'confirm', 'warning', 'confirmDelete']).isRequired,
  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.node,
  onClickConfirm: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.object),
  autoClose: PropTypes.bool,
}

// defualt props
AlertModal.defaultProps = {
  type: 'confirm',
  image: null,
  title: '',
  description: '',
  onClickConfirm: () => {},
  onClickCancel: () => {},
  confirmButtonText: '',
  cancelButtonText: '',
  isOpen: false,
  onRequestClose: () => {},
  autoClose: false,
}

export default AlertModal
