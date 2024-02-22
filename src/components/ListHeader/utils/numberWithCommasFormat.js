const numberWithCommasFormat = number => {
  if (number) {
    const numberWithCommas = String(new Intl.NumberFormat().format(+number))

    return numberWithCommas
  } else {
    return number
  }
}

export default numberWithCommasFormat
