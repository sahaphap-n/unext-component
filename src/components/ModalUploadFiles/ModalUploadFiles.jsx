import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ContentModal from '../ContentModal/ContentModal'
import UploadFile from '../UploadFile/UploadFile'
import { useForm } from './hooks/useForm'
import ExportSvg from './assets/ExportSvg'

function ModalUploadFiles({ isOpen, onRequestClose, onUpload }) {
  const { data, errors, setData, setErrors, handleSubmitValidation, handleChangeValidation } = useForm({
    validations: {
      files: {
        required: {
          value: true,
          message: 'กรุณาเลือกไฟล์เพื่ออัปโหลดอย่างน้อย 1 ไฟล์',
        },
      },
    },
    initialValues: { files: [] },
    onSubmitSuccess: () => handleUploadConfirm(),
  })

  useEffect(() => {
    if (isOpen) {
      resetState()
    }
  }, [isOpen])

  const handleCloseModal = () => {
    if (onRequestClose) {
      onRequestClose()
    }
  }

  const handleUploadConfirm = () => {
    if (onUpload) {
      onUpload(data.files)
    }
  }

  const resetState = () => {
    setData({ files: [] })
    setErrors({})
  }

  return (
    <ContentModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      title={'นำเข้าไฟล์'}
      onConfirm={handleSubmitValidation}
      onCancel={handleCloseModal}
      confirmButtonLabel={'อัปโหลด'}
      confirmButtonIcon={<ExportSvg />}
    >
      <div>
        <UploadFile files={data.files} onFilesChange={(newFiles) => handleChangeValidation('files', newFiles)} />
        {errors.files && <div className="text-danger">{errors.files}</div>}
      </div>
    </ContentModal>
  )
}

ModalUploadFiles.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onUpload: PropTypes.func,
}

export default ModalUploadFiles
