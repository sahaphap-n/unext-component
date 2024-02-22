import React from 'react'
import PropTypes from 'prop-types'
import MenuAction from '../MenuAction/MenuAction'
import DocumentSvg from './asset/DocumentSvg'
import SpeakerSvg from './asset/SpeakerSvg'
import './styleSheet/ActionHeader.css'
import Paper from '../Paper/Paper'


function ActionHeader({ checkedAll, checkedTotal, onCheckAll, menuAction }) {
  const setMenuAction = () => {
    const menu = []
    if (Array.isArray(menuAction)) {
      for (let item of menuAction) {
        if (['download', 'delete', 'copy'].includes(item.type)) {
          menu.push({
            type: item.type,
            onClick: item.onClick ? item.onClick : null,
            disabled: item.disabled ? item.disabled : false,
          })
        }

        if (['offer'].includes(item.type)) {
          menu.push({
            icon: <DocumentSvg />,
            text: 'เสนอพิจารณา',
            onClick: item.onClick ? item.onClick : null,
            disabled: item.disabled ? item.disabled : false,
          })
        }

        if (['publish'].includes(item.type)) {
          menu.push({
            icon: <SpeakerSvg />,
            text: 'ประกาศใช้งาน',
            onClick: item.onClick ? item.onClick : null,
            disabled: item.disabled ? item.disabled : false,
          })
        }
      }
    }

    return menu
  }

  return (
    <Paper>
      <div className="actionHeader_container">
        <div className="check_all">
          <input
            className="checkboxInput"
            type={'checkbox'}
            name="ALL"
            id="ALL"
            value={'ALL'}
            checked={checkedAll}
            onChange={e => onCheckAll(e.target.value)}
          />
          <h5>
            เลือกทั้งหมด ({checkedTotal})
          </h5>
        </div>
        <MenuAction menu={setMenuAction()} />
      </div>
    </Paper>
  )
}

ActionHeader.propTypes = {
  checkedAll: PropTypes.bool.isRequired,
  checkedTotal: PropTypes.number.isRequired,
  onCheckAll: PropTypes.func.isRequired,
  menuAction: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['delete', 'offer', 'download', 'publish', 'copy']).isRequired,
      onClick: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
}

ActionHeader.defaultProps = {
  checkedAll: false,
  checkedTotal: 0,
  onCheckAll: () => {},
  menuAction: [],
}

export default ActionHeader
