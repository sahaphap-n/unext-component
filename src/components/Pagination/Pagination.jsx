import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import './styleSheet/pagination.css'
import ArrowRightSvg from './asset/ArrowRightSvg'
import ArrowLeftSvg from './asset/ArrowLeftSvg'
import numberWithCommasFormat from './utils/numberWithCommasFormat'

//version 1.0.0
function Pagination({ isShowItemTotal, itemTotal, currentPageNo, pageSize, onChangePage }) {
  const pageSizeOption = [5, 10, 15, 20]

  const pageTotal = Math.ceil(+itemTotal / +pageSize)

  const minPagesize = Math.min(...pageSizeOption)

  //on page change , call back (currentPage,pageSize)
  const handleClickPreviosPage = () => {
    if (+currentPageNo > 1) {
      onChangePage(+currentPageNo - 1, +pageSize)
    }
  }

  const handleClickNextPage = () => {
    if (+currentPageNo < pageTotal) {
      onChangePage(+currentPageNo + 1, +pageSize)
    }
  }

  const handleClickPageNo = (pageNo) => {
    onChangePage(pageNo, +pageSize)
  }

  const handleChangePageSize = (e) => {
    const newPageSize = Number(e.target.value)
    const newPageTotal = Math.ceil(+itemTotal / newPageSize)
    if (newPageTotal < +currentPageNo) {
      onChangePage(newPageTotal, newPageSize)
    } else {
      onChangePage(+currentPageNo, newPageSize)
    }
  }

  // generate pageNo
  const pageGen = () => {
    let arr = []

    if (pageTotal <= 7) {
      if (+itemTotal === 0) {
        arr.push(1)
      } else {
        for (let i = 1; i <= pageTotal; i++) {
          arr.push(i)
        }
      }
    } else {
      if (+currentPageNo <= 3) {
        arr = [1, 2, 3, 4, 5, '...', pageTotal]
      } else if (+currentPageNo === 4) {
        arr = [1, 2, 3, 4, 5, 6, '...', pageTotal]
      } else if (+currentPageNo > 4) {
        let centerPagePatternArr = []
        for (let i = +currentPageNo - 2; i <= +currentPageNo + 2; i++) {
          centerPagePatternArr.push(i)
        }

        if (+currentPageNo < pageTotal - 3) {
          arr = [1, '...', ...centerPagePatternArr, '...', pageTotal]
        } else if (+currentPageNo === pageTotal - 3) {
          arr = [1, '...', ...centerPagePatternArr, pageTotal]
        } else {
          arr = [1, '...', pageTotal - 4, pageTotal - 3, pageTotal - 2, pageTotal - 1, pageTotal]
        }
      }
    }

    return arr
  }

  const itemTotalFormat = useMemo(() => numberWithCommasFormat(+itemTotal), [itemTotal])

  return (
    <div className={`paginationCurr_container_main ${!isShowItemTotal && 'paginationCurr_end'}`}>
      {isShowItemTotal && <div className="paginationCurr_total_item ">Total {itemTotalFormat} items</div>}

      <div className=" paginationCurr_right_container">
        <div className="paginationCurr_icon_group_container">
          {/* previos button */}
          <div
            className={
              +currentPageNo === 1 || +itemTotal === 0 ? 'paginationCurr_disable' : 'paginationCurr_next_prev_button'
            }
            onClick={+currentPageNo === 1 ? null : () => handleClickPreviosPage()}
          >
            <ArrowLeftSvg className="paginationCurr_icon" />
          </div>
        </div>

        {/* page no */}
        <div className="paginationCurr_pageno_group_container">
          {pageGen()?.map((pageNoItem, index) => (
            <div
              className={
                +itemTotal === 0
                  ? 'paginationCurr_disable'
                  : pageNoItem === '...'
                    ? 'paginationCurr_frame_dashes'
                    : +currentPageNo === pageNoItem
                      ? 'paginationCurr_frame_org'
                      : 'paginationCurr_frame_white'
              }
              onClick={
                pageNoItem === '...' || pageTotal === 0 || +currentPageNo === pageNoItem
                  ? null
                  : () => handleClickPageNo(pageNoItem)
              }
              key={index}
            >
              {typeof pageNoItem === 'number' ? numberWithCommasFormat(pageNoItem) : pageNoItem}
            </div>
          ))}
        </div>

        <div className="paginationCurr_icon_group_container">
          {/* next button */}
          <div
            className={
              +currentPageNo === pageTotal || pageTotal === 0
                ? 'paginationCurr_disable'
                : 'paginationCurr_next_prev_button'
            }
            onClick={+currentPageNo === pageTotal || pageTotal === 0 ? null : () => handleClickNextPage()}
          >
            <ArrowRightSvg className="paginationCurr_icon" />
          </div>
        </div>

        {/* select page size */}
        <select
          value={pageSize}
          className={
            minPagesize >= +itemTotal ? 'paginationCurr_pagesize_disale' : ' paginationCurr_pagesize_container'
          }
          disabled={minPagesize >= +itemTotal ? true : false}
          onChange={handleChangePageSize}
        >
          {pageSizeOption?.map((item) => (
            <option value={item} key={item}>
              {item} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

// check data type of prop. they show wanning in console
Pagination.propTypes = {
  itemTotal: PropTypes.number.isRequired,
  isShowItemTotal: PropTypes.bool,
  currentPageNo: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
}

// defualt props
Pagination.defaultProps = {
  itemTotal: 0,
  isShowItemTotal: true,
  currentPageNo: 1,
  pageSize: 5,
  onChangePage: () => {},
}

export default Pagination
