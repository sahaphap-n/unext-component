import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styleSheet/UploadFile.css'
import ContentGrayFrame from '../ContentGrayFrame/ContentGrayFrame'
import Button from '../Button/Button'
import MenuAction from '../MenuAction/MenuAction'
import DocumentSvg from './asset/DocumentSvg'
import AttachmentSvg from './asset/AttachmentSvg'
import FailSvg from './asset/FailSvg'
import AlertModal from '../AlertModal/AlertModal'
import { useDropzone } from 'react-dropzone'
import convertBytes from './utils/convertBytes'

function UploadFile({ files, onFilesChange, maxFiles, maxSize, fileTypes, onDownLoad, optionFileNameKeys }) {
  const [filesData, setFilesData] = useState([])
  const [errorModal, setErrorModal] = useState({ isShow: false, errorFiles: [] })
  const [isOverAddFile, setIsOverAddFile] = useState(false)

  const fileTypesCondition = useMemo(() => {
    const fileTypeData = [
      {
        type: 'word',
        mimeTypes: {
          'application/msword': ['.doc'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        extensions: ['.doc', '.docx'],
      },
      {
        type: 'pdf',
        mimeTypes: {
          'application/pdf': ['.pdf'],
        },
        extensions: ['.pdf'],
      },
      {
        type: 'excel',
        mimeTypes: {
          'application/vnd.ms-excel': ['.xls'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        extensions: ['.xls', '.xlsx'],
      },
      {
        type: 'image',
        mimeTypes: {
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg', '.jpg'],
        },
        extensions: ['.png', '.jpeg', '.jpg'],
      },
    ]

    const newAcceptFileTypes = fileTypeData.reduce(
      (currentAccept, fileType) => {
        const newCurrentAccept = { ...currentAccept }
        const { type, mimeTypes, extensions } = fileType

        if (
          (typeof fileTypes === 'string' && fileTypes === type) ||
          (Array.isArray(fileTypes) && fileTypes.includes(type))
        ) {
          newCurrentAccept.mimeTypes = { ...newCurrentAccept.mimeTypes, ...mimeTypes }
          newCurrentAccept.extensions = [...newCurrentAccept.extensions, ...extensions]
        }

        return newCurrentAccept
      },
      { mimeTypes: {}, extensions: [] }
    )

    return newAcceptFileTypes
  }, [])

  const fileTypeConditionDesc = useMemo(() => {
    const description = fileTypesCondition.extensions?.reduce((desc, type) => `${desc} ${type}`, '')
    return description
  }, [fileTypesCondition])

  const fileSize = useMemo(() => convertBytes(maxSize), [maxSize])

  const disabledAddFiles = useMemo(() => filesData.length === maxFiles, [filesData, maxFiles])

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: maxSize,
    accept: {
      ...fileTypesCondition.mimeTypes,
    },

    onDragOver: () => setIsOverAddFile(true),
    onDragLeave: () => setIsOverAddFile(false),
    disabled: disabledAddFiles,
    onDropAccepted: (successFiles) => handleSuccessDropAndAddFiles(successFiles),
    onDropRejected: (failFiles) => handleDropFail(failFiles),
  })

  useEffect(() => {
    if (Array.isArray(files)) {
      setFilesData(files)
    }
  }, [files])

  const handleSuccessDropAndAddFiles = (successFiles) => {
    const oldFilesNum = filesData.length
    const newSuccessFilesNum = successFiles.length

    let newFiles = [...successFiles]

    if (maxFiles > 0 && oldFilesNum + newSuccessFilesNum > maxFiles) {
      const newFilesNum = +maxFiles - oldFilesNum

      const overFiles = successFiles.slice(newFilesNum)
      const overFilesFormat = overFiles.map((item) => {
        item.errorMessage = `จำนวนไฟล์ที่เพิ่มเข้ามาเกิน ${maxFiles} ไฟล์`
        return item
      })
      setErrorModal((prev) => ({ ...prev, isShow: true, errorFiles: [...overFilesFormat] }))

      newFiles = successFiles.slice(0, newFilesNum)
    }

    const allFiles = [...filesData, ...newFiles]

    if (onFilesChange) {
      onFilesChange(allFiles)
    }

    setFilesData(allFiles)
  }

  const handleDropFail = (failFiles) => {
    const invalidFiles = failFiles.map((item) => {
      const { errors, file } = item
      const errorCode = errors[0]?.code
      let errorMessage = ''

      if (errorCode === 'file-invalid-type') {
        errorMessage = 'ประเภทไฟล์ไม่ถูกต้อง'
      } else if (errorCode === 'file-too-large') {
        errorMessage = `ขนาดไฟล์เกิน ${fileSize}`
      }
      return { name: file.name, errorMessage }
    })

    setErrorModal((prev) => ({ ...prev, isShow: true, errorFiles: [...invalidFiles] }))
  }

  const handleDeleteFile = (fileIndex) => {
    const newFilesData = [...filesData]
    newFilesData.splice(fileIndex, 1)

    if (onFilesChange) {
      onFilesChange(newFilesData)
    }

    setFilesData([...newFilesData])
  }

  return (
    <>
      <div className="d-flex flex-column" style={{ rowGap: '8px' }}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div
            onMouseOver={() => setIsOverAddFile(true)}
            onMouseLeave={() => setIsOverAddFile(false)}
            className={`uploadFile_dropFileBox ${disabledAddFiles ? 'uploadFile_disabled' : isOverAddFile ? 'uploadFile_borderHighLight' : ''}`}
          >
            <ContentGrayFrame className={'d-flex flex-column align-items-center'} style={{ rowGap: '16px' }}>
              <DocumentSvg />
              <div>
                <h5>คลิกหรือลากไฟล์เพื่อ Upload</h5>
                <p>
                  {maxFiles === 'infinity' ? '' : `Can upload Max ${maxFiles} files,`}
                  max size of {fileSize}. (Allowed file types: {fileTypeConditionDesc})
                </p>
              </div>
            </ContentGrayFrame>
          </div>
        </div>

        {filesData.map((fileItem, fileIndex) => {
          const fileName = fileItem[optionFileNameKeys.fileNameKey] || fileItem['name']

          return (
            <div key={fileIndex} className="d-flex justify-content-between" style={{ columnGap: '8px' }}>
              <div className="d-flex align-items-center" style={{ columnGap: '4px' }}>
                <AttachmentSvg />
                {onDownLoad ? (
                  <Button type={'info'} onClick={() => onDownLoad(fileItem)}>
                    {fileName}
                  </Button>
                ) : (
                  <div className="px-2">{fileName}</div>
                )}
              </div>
              <MenuAction
                menu={[{ type: 'delete', onClick: () => handleDeleteFile(fileIndex), tooltipPlacement: 'left' }]}
              />
            </div>
          )
        })}
      </div>

      <AlertModal
        style={{ height: '80vh', maxHeight: '460px' }}
        isOpen={errorModal.isShow}
        type="error"
        title={'การอัพโหลดไม่สำเร็จ'}
        description={<ErrorFiles errorFiles={errorModal.errorFiles} />}
        onClickConfirm={() => setErrorModal((prev) => ({ ...prev, isShow: false, errorFiles: [] }))}
        onRequestClose={() => setErrorModal((prev) => ({ ...prev, isShow: false, errorFiles: [] }))}
      />
    </>
  )
}

const ErrorFiles = ({ errorFiles }) => {
  return (
    <div className="grayScrollBar text-left" style={{ maxHeight: '100px' }}>
      {errorFiles.map((item) => {
        const { name, errorMessage } = item
        return (
          <div key={name} className="d-flex " style={{ gap: '12px' }}>
            <div className="flex-shrink-0">
              <FailSvg />
            </div>
            <div>
              <span>{name}</span>
              <div className="text-danger">{errorMessage}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

UploadFile.propTypes = {
  files: PropTypes.array,
  onFilesChange: PropTypes.func,
  maxFiles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxSize: PropTypes.number,
  fileTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onDownLoad: PropTypes.func,
  optionFileNameKeys: PropTypes.shape({ fileNameKey: PropTypes.string }),
}

UploadFile.defaultProps = {
  maxFiles: 'infinity',
  maxSize: 2097152,
  fileTypes: ['word', 'pdf', 'excel', 'image'],
  optionFileNameKeys: { fileNameKey: 'name' },
}

export default UploadFile
