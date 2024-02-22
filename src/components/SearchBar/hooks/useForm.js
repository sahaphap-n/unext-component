import { useState } from 'react'

const setInitialErrors = options => {
  let newErrors = {}
  const validation = options?.validations
  for (const prop in validation) {
    const validateArrObj = validation[prop]?.arrayOfObject
    const initialValueByProp = options?.initialValues[prop]

    if (validateArrObj && initialValueByProp && Array.isArray(initialValueByProp)) {
      const copyPropObj = {}
      for (const arrProp in validateArrObj) {
        copyPropObj[arrProp] = ''
      }
      const errorArr = initialValueByProp?.map(item => {
        return { ...copyPropObj }
      })

      newErrors[prop] = errorArr
    } else {
      newErrors[prop] = ''
    }
  }

  return newErrors
}

export const useForm = options => {
  const [data, setData] = useState(options?.initialValues || {})
  const [errors, setErrors] = useState(options?.validations ? setInitialErrors(options) : {})

  //array of object submit check
  const setErrorArrayOfObjectOnSubmit = (valueArr, keys) => {
    let validArr = true
    const errorArr = valueArr.map(item => {
      let errorObj = {}

      if (typeof item === 'object') {
        for (let prop in item) {
          const validation = keys[prop]
          const value = item[prop]

          //required
          const required = validation?.required
          if (
            validation &&
            required?.value &&
            (!value || (typeof value === 'string' && value.trim().length === 0) || (Array.isArray(value) && value.length === 0))
          ) {
            validArr = validArr && false
            errorObj[prop] = required?.message
          }

          // pattern
          const pattern = validation?.pattern
          if (validation && pattern?.value && !RegExp(pattern?.value).test(value)) {
            validArr = validArr && false
            errorObj[prop] = pattern?.message
          }

          // custom
          const custom = validation?.custom
          if (validation && custom?.isValid && !custom.isValid(value)) {
            validArr = validArr && false
            errorObj[prop] = custom?.message
          }
        }
      }

      return errorObj
    })

    return { errorArr, validArr }
  }

  const setErrorArrayOfObjectOnChange = (key, value, arrOfObjKey, arrOfObjIndex, arrayOfObject) => {
    let newError = [...errors[key]]
    let valid = true
    const validation = arrayOfObject[arrOfObjKey]

    // required
    const required = validation?.required
    if (
      validation &&
      required?.value &&
      (!value || (typeof value === 'string' && value.trim().length === 0) || (Array.isArray(value) && value.length === 0))
    ) {
      valid = false
      newError[arrOfObjIndex][arrOfObjKey] = required?.message
    }

    // pattern
    const pattern = validation?.pattern
    if (validation && pattern?.value && !RegExp(pattern?.value).test(value)) {
      valid = false
      newError[arrOfObjIndex][arrOfObjKey] = pattern?.message
    }

    // custom
    const custom = validation?.custom
    if (validation && custom?.isValid && !custom.isValid(value)) {
      valid = false
      newError[arrOfObjIndex][arrOfObjKey] = custom?.message
    }

    //valid
    if (valid && newError[arrOfObjIndex]) {
      newError[arrOfObjIndex][arrOfObjKey] = ''
    }

    return newError
  }

  const setEmptyErrorsObj = key => {
    let newErrors = {}
    const validateArrObj = options?.validations[key]?.arrayOfObject

    if (validateArrObj && typeof validateArrObj === 'object') {
      for (const arrProp in validateArrObj) {
        newErrors[arrProp] = ''
      }
    }

    return newErrors
  }

  //array of object add
  const handleAddObjectToArray = (key, newValueObj, newValueObjIndex) => {
    let newData = [...data[key]]
    let newError = [...errors[key]]

    //have index position to add
    if (newValueObjIndex && typeof newValueObjIndex === 'number') {
      newData.splice(newValueObjIndex, 0, { ...newValueObj })
      newError.splice(newValueObjIndex, 0, { ...setEmptyErrorsObj(key) })

      //add last index
    } else {
      newData.push({ ...newValueObj })
      newError.push({ ...setEmptyErrorsObj(key) })
    }

    setData(prev => ({ ...prev, [key]: newData }))
    setErrors(prev => ({ ...prev, [key]: newError }))
  }

  //array of object delete
  const handleDeleteObjectFromArray = (key, indexDelete) => {
    const newData = [...data[key]]
    const newError = [...errors[key]]

    newData.splice(indexDelete, 1)
    newError.splice(indexDelete, 1)

    setData(prev => ({ ...prev, [key]: newData }))
    setErrors(prev => ({ ...prev, [key]: newError }))
  }

  //array of object has children set format
  const setArrayChlidrenToArrayRecord = (arrayChildren, childrenKey) => {
    const arrayRecord = []

    for (const item of arrayChildren) {
      if (typeof item === 'object') {
        let otherKeyObj = {}
        for (const prop in item) {
          if (prop !== String(childrenKey)) {
            otherKeyObj[prop] = item[prop]
          }
        }

        if (Array.isArray(item[childrenKey])) {
          for (const childItem of item[childrenKey]) {
            arrayRecord.push({ ...otherKeyObj, ...childItem })
          }
        }
      }
    }

    return arrayRecord
  }

  //array of object has children set format
  const setArrayRecordToArrayChlidren = (arrayRecord, primaryKey, otherKeys, childrenKey) => {
    const groupArrayObject = arrayRecord.reduce((group, cerrentObj) => {
      const primaryValue = String(cerrentObj[primaryKey])
      group[primaryValue] = group[primaryValue] ?? []
      group[primaryValue].push(cerrentObj)
      return group
    }, {})

    let arrayChildren = []
    let indexKey = 0

    for (const prop in groupArrayObject) {
      let obj = {}
      let newChildren = [...groupArrayObject[prop]]

      //set index key in children
      for (let item of newChildren) {
        item.indexKey = indexKey

        indexKey += 1
      }

      //set other key
      if (Array.isArray(groupArrayObject[prop]) && groupArrayObject[prop].length > 0) {
        for (const otherKey of otherKeys) {
          obj[otherKey] = groupArrayObject[prop][0][otherKey]
        }
      }

      obj[primaryKey] = prop
      obj[childrenKey] = newChildren
      arrayChildren.push({ ...obj })
    }

    return arrayChildren
  }

  //handle change value validation
  const handleChangeValidation = (key, value, arrOfObjKey, arrOfObjIndex) => {
    //array of object

    if (arrOfObjKey && typeof arrOfObjIndex === 'number' && arrOfObjIndex >= 0 && Array.isArray(data[key])) {
      let newDataArr = [...data[key]]

      newDataArr[arrOfObjIndex][arrOfObjKey] = value

      setData(prev => ({ ...prev, [key]: newDataArr }))

      //other
    } else {
      setData(prev => ({ ...prev, [key]: value }))
    }

    const validations = options?.validations

    if (validations) {
      const validation = validations[key]
      const required = validation?.required
      const arrayOfObject = validation?.arrayOfObject
      const custom = validation?.custom
      const pattern = validation?.pattern

      //required value
      if (required?.value && (!value || (typeof value === 'string' && value.trim().length === 0))) {
        setErrors(prev => ({ ...prev, [key]: required?.message }))

        //required array
      } else if (required?.value && Array.isArray(value) && value.length === 0) {
        setErrors(prev => ({ ...prev, [key]: required?.message }))

        //array of object
      } else if (arrayOfObject && typeof arrayOfObject === 'object' && arrayOfObject[arrOfObjKey]) {
        setErrors(prev => ({ ...prev, [key]: setErrorArrayOfObjectOnChange(key, value, arrOfObjKey, arrOfObjIndex, arrayOfObject) }))

        // custom
      } else if (custom?.isValid && !custom?.isValid(value)) {
        setErrors(prev => ({ ...prev, [key]: custom?.message }))

        //pattern
      } else if (pattern?.value && !RegExp(pattern?.value).test(value)) {
        setErrors(prev => ({ ...prev, [key]: pattern?.message }))
      } else {
        setErrors(prev => ({ ...prev, [key]: '' }))
      }
    }
  }

  //handle submit form validation
  const handleSubmitValidation = e => {
    if (e) {
      e.preventDefault()
    }

    const validations = options?.validations

    if (validations) {
      let valid = true
      const newErrors = {}

      for (const key in validations) {
        const value = data[key]
        const validation = validations[key]

        // pattern
        const pattern = validation?.pattern
        if (pattern?.value && !RegExp(pattern?.value).test(value)) {
          valid = false
          newErrors[key] = pattern?.message
        }

        // custom
        const custom = validation?.custom
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false
          newErrors[key] = custom?.message
        }

        //required
        const required = validation?.required
        if (required?.value && (!value || (typeof value === 'string' && value.trim().length === 0) || (Array.isArray(value) && value.length === 0))) {
          valid = false
          newErrors[key] = required?.message
        }

        //array of object
        const arrayOfObject = validation?.arrayOfObject
        if (arrayOfObject && Array.isArray(value)) {
          const { errorArr, validArr } = setErrorArrayOfObjectOnSubmit(value, arrayOfObject)

          //maybe valid is true or false
          if (!validArr) {
            valid = validArr
          }
          newErrors[key] = errorArr
        }
      }

      setErrors(newErrors)

      if (!valid) {
        if (options?.onSubmitNotSuccess) {
          options.onSubmitNotSuccess()
        }

        return
      }
    }

    if (options?.onSubmitSuccess) {
      options.onSubmitSuccess()
    }
  }

  return {
    data,
    setData,
    errors,
    setErrors,
    handleChangeValidation,
    handleSubmitValidation,
    handleAddObjectToArray,
    handleDeleteObjectFromArray,
    setArrayChlidrenToArrayRecord,
    setArrayRecordToArrayChlidren,
  }
}
