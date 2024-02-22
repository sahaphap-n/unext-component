import React from 'react'
import './styleSheet/AttachFilesCard.css'
import MenuAction from '../MenuAction/MenuAction'
import PropTypes from 'prop-types'
import dateTimeThaiFormat from './utils/dateTimeThaiFormat'
import convertBytes from './utils/convertBytes'

function AttachFilesCard({ attachFileCard, onDownload, onDelete }) {
  const { attach_file_desc, updated_prefix_name_th, updated_first_name_th, updated_last_name_th, updated_dt, attach_file_size } = attachFileCard

  return (
    <div div className="d-flex" style={{ gap: '15px' }}>
      <>
        <div className="categoryUploadCard_container">
          <div className="categoryUploadCard_Title">{attach_file_desc}</div>

          <div className="d-flex justify-content-between">
            <div>
              <div className="categoryUploadCard_sub ">{`${updated_prefix_name_th}${updated_first_name_th} ${updated_last_name_th}`}</div>
              <div className="categoryUploadCard_sub ">{dateTimeThaiFormat(updated_dt)}</div>
              <div className="categoryUploadCard_sub ">{convertBytes(attach_file_size)}</div>
            </div>
            <div>
              <MenuAction
                menu={[
                  {
                    type: 'download',
                    onClick: () => onDownload(),
                  },
                  {
                    type: 'delete',
                    onClick: () => onDelete(),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

AttachFilesCard.propTypes = {
  attachFileCard: PropTypes.object,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
}
AttachFilesCard.defaultProps = {
  attachFileCard: {},
  onDownload: () => {},
  onDelete: () => {},
}

export default AttachFilesCard
