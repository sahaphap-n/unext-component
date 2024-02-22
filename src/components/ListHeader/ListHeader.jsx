import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import './styleSheet/ListHeader.css'
import Button from '../Button/Button'
import numberWithCommasFormat from './utils/numberWithCommasFormat'

function ListHeader({ title, total, onClickAdd, addButtonText, hideAddButton }) {
  const currentTotal = useMemo(() => numberWithCommasFormat(total), [total])
  return (
    <div className="listHeader_container">
      <div>
        <h3>{title || 'รายการ'}</h3>
        <div className="listHeader_list_total">
          <span className="text"> ทั้งหมด</span>
          <span className="mx-2 total">{currentTotal}</span>
          <span>รายการ</span>
        </div>
      </div>
      <div className="d-flex" style={{ gap: '12px', visibility: hideAddButton ? 'hidden' : 'visible' }}>
        <Button type={'addPrimary'} onClick={onClickAdd ? () => onClickAdd() : null}>
          {addButtonText}
        </Button>
      </div>
    </div>
  )
}

ListHeader.propTypes = {
  total: PropTypes.number.isRequired,
  onClickAdd: PropTypes.func,
  addButtonText: PropTypes.string,
  hideAddButton: PropTypes.bool,
}

ListHeader.defaultProps = {
  hideAddButton: false,
  title: '',
}

export default ListHeader
