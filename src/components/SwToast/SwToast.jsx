import Swal from 'sweetalert2'
import './styleSheet/SwToast.css'

function SwToast({ type, titleTh, titleEn, language }) {
  const customToast = {
    closeButton: 'sw_btn-close-toast',
    title: 'sw_text-toast ',
    icon: 'sw_icon-toast',
    popup: `sw_popup-toast ${setBackgroundColorClassName(type)}`,
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 5000,
    customClass: customToast,
    iconColor: '#FFFFFF',
  })

  Toast.fire({
    icon: type,
    title: setSwTitle(type, language, titleTh, titleEn),
  })
}

const setSwTitle = (type, language, titleTh, titleEn) => {
  let swTitle = ''
  let newLanguage = language ? language : 'th-TH'
  let titleUser

  switch (newLanguage) {
    case 'th-TH':
      titleUser = titleTh
      break
    case 'en-US':
      titleUser = titleEn
      break
    default:
      titleUser = titleTh
      break
  }
  if (!titleUser) {
    switch (type) {
      case 'success':
        swTitle = newLanguage === 'th-TH' ? 'บันทึกรายการเรียบร้อยแล้ว' : newLanguage === 'en-US' ? 'The transaction has been saved' : ''

        break
      case 'warning':
        swTitle =
          newLanguage === 'th-TH' ? 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง' : newLanguage === 'en-US' ? ' Invalid data ,Please check again.' : ''

        break
      case 'error':
        swTitle =
          newLanguage === 'th-TH' ? 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง' : newLanguage === 'en-US' ? ' Invalid data ,Please check again.' : ''

        break
      default:
        swTitle = newLanguage === 'th-TH' ? 'บันทึกรายการเรียบร้อยแล้ว' : newLanguage === 'en-US' ? 'The transaction has been saved' : ''

        break
    }
  } else {
    swTitle = titleUser
  }
  return swTitle
}

const setBackgroundColorClassName = type => {
  let bgColorClass
  switch (type) {
    case 'success':
      bgColorClass = 'sw_success'

      break
    case 'warning':
      bgColorClass = 'sw_warning'

      break
    case 'error':
      bgColorClass = 'sw_error'

      break
    default:
      bgColorClass = 'sw_success'

      break
  }
  return bgColorClass
}

export default SwToast
