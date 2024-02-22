function convertBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const newDecimals =  decimals < 0 ? 0 : decimals,
      power = Math.floor(Math.log(+bytes) / Math.log(1024))
    return `${parseFloat((+bytes / Math.pow(1024, power)).toFixed(newDecimals))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][power]}`
  }

export default convertBytes