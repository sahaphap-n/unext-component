import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import './styleSheet/DynamicTable.css'
import NoData from '../NoData/NoData'
import SorterSvg from './assets/SorterSvg'

const DynamicTable = ({ columns, data, onRowClick, paginationComponent, footers, bordered, scroll }) => {
  const [sorter, setSorter] = useState({ type: 'none', column: '' })

  const handleSort = (field, onSort) => {
    if (field === sorter.column) {
      let sortType

      switch (sorter.type) {
        case 'asc':
          sortType = 'desc'
          break
        case 'desc':
          sortType = 'none'
          break
        case 'none':
          sortType = 'asc'
          break
        default:
          sortType = 'none'
          break
      }

      setSorter((prevSorter) => ({ ...prevSorter, type: sortType }))
      onSort(sortType)
    } else {
      setSorter((prevSorter) => ({ ...prevSorter, type: 'asc', column: field }))
      onSort('asc')
    }
  }

  const setTableHeaderData = () => {
    if (Array.isArray(columns)) {
      const formatColumns = columns.reduce(
        (accumulateFormat, currentColumn) => {
          const { children } = currentColumn
          const newAccumulateFormat = [...accumulateFormat]
          const parentColumns = newAccumulateFormat[0]

          if (children && Array.isArray(children)) {
            for (let item of parentColumns) {
              if (!item?.children) {
                item.rowSpan = 2
              }
            }

            parentColumns.push({ ...currentColumn, colSpan: children.length })

            if (newAccumulateFormat.length <= 1) {
              newAccumulateFormat.push([...children])
            } else {
              for (const item of children) {
                newAccumulateFormat[1].push({ ...item })
              }
            }
          } else {
            parentColumns.push({ ...currentColumn, rowSpan: newAccumulateFormat.length })
          }

          return newAccumulateFormat
        },
        [[]]
      )

      return [...formatColumns]
    }

    return []
  }

  const columnsFormat = useMemo(() => {
    const newColumns = []
    if (Array.isArray(columns)) {
      for (const column of columns) {
        const { children } = column

        if (children && Array.isArray(children)) {
          for (const columnChild of children) {
            newColumns.push(columnChild)
          }
        } else {
          newColumns.push(column)
        }
      }
    }

    return newColumns
  }, [columns])

  const allColumnsNum = useMemo(() => {
    if (Array.isArray(columns)) {
      let newColSpan = 0

      for (const item of columns) {
        const { children } = item

        if (children) {
          newColSpan += children.length
        } else {
          newColSpan += 1
        }
      }

      return newColSpan
    }

    return 1
  }, [columns])

  const getFooterRowColor = useCallback(
    (background) => {
      let newBackground = ''

      switch (background) {
        case 'primary':
          newBackground = '#b3d4f5'
          break
        case 'secondary':
          newBackground = '#daecff'
          break
        default:
          newBackground = background || ''
          break
      }
      return newBackground
    },
    [footers]
  )

  const getBodyRowStyle = useCallback(
    (rowStyle) => {
      let newRowStyle = ''

      switch (rowStyle) {
        case 'primary':
          newRowStyle = { background: '#f1f4ff80', fontWeigh: 500, color: '#171717' }
          break

        default:
          newRowStyle = rowStyle || {}
          break
      }
      return newRowStyle
    },
    [data]
  )

  return (
    <div className={scroll?.x || scroll?.y ? 'grayScrollBar' : ''}>
      <div
        className="dynamicTable"
        style={{
          minWidth: scroll?.x || 'none',
          maxHeight: scroll?.y || 'none',
          position: 'relative',
        }}
      >
        <table className={`${bordered ? 'bordered' : ''}`}>
          <thead>
            {setTableHeaderData()?.map((trItem, trIndex) => (
              <tr key={`tr-${trIndex}`}>
                {trItem.map((column, index) => {
                  return column?.onSort ? (
                    <th
                      key={`header-${index}`}
                      style={{ textAlign: column?.align || 'left', width: column?.width || '' }}
                      className={`sortBox`}
                      onClick={() => handleSort(column.field, column.onSort)}
                      colSpan={column?.colSpan ?? ''}
                      rowSpan={column?.rowSpan ?? ''}
                    >
                      <span>{column.label}</span>
                      <span className="sorter" data-sorttype={sorter.column === column.field ? sorter.type : 'none'}>
                        <SorterSvg />
                      </span>
                    </th>
                  ) : (
                    <th
                      key={`header-${index}`}
                      style={{ textAlign: column?.align || 'left', width: column?.width || '' }}
                      colSpan={column?.colSpan ?? ''}
                      rowSpan={column?.rowSpan ?? ''}
                    >
                      {column.label}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr className="none-hover">
                <td colSpan={allColumnsNum}>
                  <NoData />
                </td>
              </tr>
            ) : (
              <>
                {data.map((row, rowIndex) => {
                  const { isChecked, rowStyle } = row

                  return (
                    <tr
                      key={`row-${rowIndex}`}
                      className={`${onRowClick ? 'row_can_click' : ''} ${isChecked ? 'row_checked' : ''}`}
                      onClick={onRowClick ? () => onRowClick(row) : null}
                      style={{ ...getBodyRowStyle(rowStyle) }}
                    >
                      {columnsFormat.map((column, colIndex) => {
                        const cellData = row[column.field]

                        if (cellData === undefined) return null

                        const isCellProps = typeof cellData === 'object' && cellData?.value

                        const cellProps = {
                          colSpan: isCellProps ? cellData.colSpan : 1,
                          rowSpan: isCellProps ? cellData.rowSpan : '',
                          style: isCellProps ? cellData.style : {},
                          value: isCellProps ? cellData.value : cellData,
                        }

                        return (
                          <td
                            key={`cell-${rowIndex}-${colIndex}`}
                            style={{ textAlign: column.align || 'left', ...cellProps.style }}
                            colSpan={cellProps.colSpan}
                            rowSpan={cellProps.rowSpan}
                          >
                            {cellProps.value}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>

          {(Array.isArray(footers) || paginationComponent) && (
            <tfoot>
              {footers &&
                footers.map((footerItem, footerIndex) => {
                  const { component, background, align } = footerItem
                  return (
                    <tr key={`footer-${footerIndex}`} style={{ background: getFooterRowColor(background) }}>
                      {component ? (
                        <td colSpan={allColumnsNum}>{component}</td>
                      ) : (
                        columnsFormat.map((column, colIndex) => {
                          const alignCol = footerItem[`align_${column.field}`]
                          return (
                            <td
                              key={`cell-${footerIndex}-${colIndex}`}
                              style={{ textAlign: alignCol ? alignCol : align || 'left' }}
                            >
                              {footerItem[column.field]}
                            </td>
                          )
                        })
                      )}
                    </tr>
                  )
                })}

              {paginationComponent && (
                <tr>
                  <td colSpan={allColumnsNum}>{paginationComponent}</td>
                </tr>
              )}
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}

const columnShape = {
  label: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.string]),
  field: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  width: PropTypes.string,
  onSort: PropTypes.func,
  colSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

DynamicTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      ...columnShape,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          ...columnShape,
        })
      ),
    })
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool,
      rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf(['primary'])]),
    })
  ),
  onRowClick: PropTypes.func,
  paginationComponent: PropTypes.node,
  bordered: PropTypes.bool,
  scroll: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  footers: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.node,
      background: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(['primary', 'secondary'])]),
      align: PropTypes.oneOf(['left', 'center', 'right']),
    })
  ),
}

DynamicTable.defaultProps = {
  columns: [],
  data: [],
  bordered: false,
}

export default DynamicTable
