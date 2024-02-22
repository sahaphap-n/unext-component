import React from 'react'
import './styleSheet/ContentModal.css'
import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'
import Divider from '../Divider/Divider'
import Button from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'

function ContentModal({
  children,
  isOpen,
  onRequestClose,
  title,
  header,
  footer,
  onConfirm,
  confirmButtonLabel,
  confirmButtonIcon,
  onCancel,
  cancelButtonLabel,
  containerStyle,
}) {
  const containerDefaultStyle = { width: '90vw', maxWidth: '770px', height: '80vh', maxHeight: '616px' }
  // calculate for scroll on the content
  const bodyStyle = {
    height: `calc(${containerStyle?.height || '80vh'} - 140px)`,
    maxHeight: `calc(${containerStyle?.maxHeight || '616px'} - 140px)`,
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="contentModal_container" style={{ ...containerDefaultStyle, ...containerStyle }}>
        {onRequestClose && (
          <Button type={'close'} onClick={onRequestClose} style={{ position: 'absolute', top: 16, right: 16, width: 18, height: 18 }} />
        )}

        {/*header */}
        {header || title ? (
          <div className="header">
            <div style={{ padding: '0 24px' }}>{header ?? <h3>{title}</h3>}</div>
            <Divider />
          </div>
        ) : null}

        {/*body*/}
        <div className="content grayScrollBar" style={bodyStyle}>
          {children}
        </div>

        {/*footer*/}
        {footer || onConfirm || onCancel ? (
          <div className="footer">
            <Divider />
            <div style={{ padding: '0 24px' }}>
              {footer ?? (
                <div className="d-flex justify-content-end">
                  <ButtonGroup
                    type={'confirm'}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                    confirmButtonLabel={confirmButtonLabel}
                    cancelButtonLabel={cancelButtonLabel}
                    confirmButtonIcon={confirmButtonIcon}
                  />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}

ContentModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmButtonLabel: PropTypes.string,
  confirmButtonIcon: PropTypes.node,
  cancelButtonLabel: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  containerStyle: PropTypes.object,
}

ContentModal.defaultProps = {
  title: '',
  onConfirm: () => {},
  onCancel: () => {},
  isOpen: false,
  onRequestClose: () => {},
  containerStyle: {},
}

export default ContentModal
