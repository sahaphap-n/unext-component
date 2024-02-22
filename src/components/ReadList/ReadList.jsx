import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import './styleSheet/ReadList.css'
import Label from '../Label/Label'
import TextTruncate from '../TextTruncate/TextTruncate'

function ReadList({ menu, labelWidth, type, sortDirection, maxItems }) {
  const getTemplateColumn = columnNum => {
    const columnPercent = 100 / columnNum
    const overGap = (8 * (columnNum - 1)) / columnNum

    return `repeat(${columnNum}, calc(${columnPercent}% - ${overGap}px))`
  }

  const sortDirectionCss = useMemo(() => {
    let styleSheet = {}

    switch (sortDirection) {
      case 'topToBottom':
        const columnTopToBottomNum = Math.ceil(menu?.length / +maxItems)
        styleSheet = {
          gridTemplateRows: !maxItems ? 'auto' : `repeat(${maxItems}, auto)`,
          gridTemplateColumns: !maxItems ? 'auto' : getTemplateColumn(columnTopToBottomNum),
          gridAutoFlow: !maxItems ? 'row' : 'column',
        }

        break

      case 'leftToRight':
        styleSheet = {
          gridTemplateColumns: !maxItems ? 'auto' : getTemplateColumn(maxItems),
          gridAutoFlow: !maxItems ? 'column' : 'row',
        }

        break

      default:
        break
    }

    return styleSheet
  }, [sortDirection, maxItems])

  const containerStyle = {
    display: 'grid',
    gap: '8px',
    ...sortDirectionCss,
  }

  return (
    <div style={containerStyle}>
      {menu &&
        Array.isArray(menu) &&
        menu?.map(item => (
          <div className="readList_detail_box" key={item.label}>
            <Label
              style={{ width: item.labelWidth ? item.labelWidth : labelWidth || '' }}
              className={`label  ${type === 'card' ? 'label_card' : 'label_form'}`}
              haveColon={type === 'card' ? true : false}
            >
              {item.label}
            </Label>
            {item.value ? (
              item.isTruncate ? (
                <>
                  <TextTruncate text={item.value} />
                </>
              ) : (
                <div>{item.value}</div>
              )
            ) : null}
          </div>
        ))}
    </div>
  )
}

ReadList.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      isTruncate: PropTypes.bool,
      labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['card', 'form']),
  maxItems: PropTypes.number,
  sortDirection: PropTypes.oneOf(['topToBottom', 'leftToRight']),
}

ReadList.defaultProps = {
  menu: [],
  labelWidth: '',
  type: 'card',
  sortDirection: 'topToBottom',
}

export default ReadList
