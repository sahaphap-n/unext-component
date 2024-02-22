import React from 'react'
//import components
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

const Modal = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles} ariaHideApp={false}>
      {children}
    </ReactModal>
  )
}

export default Modal

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9998,
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 15,
    padding: 0,
    backgroundColor: '#fff',
  },
}
