import React from 'react'

const ArrowLeftCircleSvg = ({ style, className, color = '#636465' }) => (
  <svg style={style} className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 20C15.5225 20 20 15.5225 20 10C20 4.4775 15.5225 0 10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20ZM5.24417 9.41083L8.5775 6.0775C8.74 5.915 8.95333 5.83333 9.16667 5.83333C9.38 5.83333 9.59333 5.915 9.75583 6.0775C10.0817 6.40333 10.0817 6.93 9.75583 7.25583L7.845 9.16667H14.1667C14.6267 9.16667 15 9.53917 15 10C15 10.4608 14.6267 10.8333 14.1667 10.8333H7.845L9.75583 12.7442C10.0817 13.07 10.0817 13.5967 9.75583 13.9225C9.43 14.2483 8.90333 14.2483 8.5775 13.9225L5.24417 10.5892C4.91833 10.2633 4.91833 9.73667 5.24417 9.41083Z"
      fill={color}
    />
  </svg>
)

export default ArrowLeftCircleSvg
