import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

function FormLayout({ children, containerStyle = {}, sortDirection, maxItems }) {
  const sortDirectionCss = useMemo(() => {
    let styleSheet = {}

    switch (sortDirection) {
      case 'topToBottom':
        styleSheet = {
          gridTemplateRows: !maxItems ? 'auto' : `repeat(${maxItems}, auto)`,
          gridAutoFlow: !maxItems ? 'row' : 'column',
        }

        break

      case 'leftToRight':
        styleSheet = {
          gridTemplateColumns: !maxItems ? 'auto' : `repeat(${maxItems}, 1fr)`,
          gridAutoFlow: !maxItems ? 'column' : 'row',
        }

        break

      default:
        break
    }

    return styleSheet
  }, [sortDirection, maxItems])

  const containerCustomStyle = {
    display: 'grid',
    rowGap: '24px',
    columnGap: '48px',
    ...sortDirectionCss,
    ...containerStyle,
  }

  return <div style={containerCustomStyle}>{children}</div>
}

FormLayout.propTypes = {
  children: PropTypes.node,
  containerStyle: PropTypes.object,
  maxItems: PropTypes.number,
  sortDirection: PropTypes.oneOf(['topToBottom', 'leftToRight']),
}

FormLayout.defaultProps = {
  sortDirection: 'leftToRight',
  maxItems: 1,
}

export default FormLayout
