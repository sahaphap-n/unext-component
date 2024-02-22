function checkboxNewChecklistOnChange(oldCheckList, newValue) {
  let newCheckList = []
  const clonedOldCheckList = JSON.parse(JSON.stringify(oldCheckList))

  if (clonedOldCheckList.includes(newValue)) {
    const removedSameValueCheckList = clonedOldCheckList?.filter(item => item !== newValue)
    newCheckList = [...removedSameValueCheckList]
  } else {
    newCheckList = [...clonedOldCheckList, newValue]
  }

  return newCheckList
}

export default checkboxNewChecklistOnChange
