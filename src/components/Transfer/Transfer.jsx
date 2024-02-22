import React, { useMemo, useState } from 'react'
import Button from '../Button/Button'
import './styleSheet/Transfer.css'
import LeftSvg from './assets/LeftSvg'
import RightSvg from './assets/RightSvg'
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup'
import NoData from '../NoData/NoData'
import FormItem from '../FormItem/FormItem'

function Transfer({ titles, required, onChange, dataSource, dataSourceKey, targetData, messageError }) {
  const [selected, setSelected] = useState({
    source: [],
    target: [],
  })

  const options = useMemo(() => {
    const newSource = dataSource?.reduce(
      (accumulateValue, currentValue) => {
        const isTarget = targetData?.includes(currentValue[dataSourceKey?.valueKey])
        if (isTarget) {
          accumulateValue.target.push(currentValue)
        } else {
          accumulateValue.source.push(currentValue)
        }
        return accumulateValue
      },
      { source: [], target: [] },
    )
    return newSource
  }, [dataSource, dataSourceKey, targetData])

  const handleChangeSelectOptions = (id, newCheckList) => {
    setSelected(prev => ({ ...prev, [id]: newCheckList }))
  }

  const handleTransferAll = () => {
    const targetKeys = dataSource?.map(item => {
      return item[dataSourceKey?.valueKey]
    })
    if (onChange) {
      onChange(targetKeys)
    }
    setSelected(prev => ({ ...prev, source: [] }))
  }

  const handleTransferSourceToTarget = () => {
    const targetKeys = [...targetData, ...selected.source]
    if (onChange) {
      onChange(targetKeys)
    }
    setSelected(prev => ({ ...prev, source: [] }))
  }

  const handleTransferTargetToSource = () => {
    const targetKeys = targetData.filter(item => !selected.target.includes(item))
    if (onChange) {
      onChange(targetKeys)
    }
    setSelected(prev => ({ ...prev, target: [] }))
  }

  // const handle
  return (
    <div className="transfer_layout ">
      <TransferBox
        id={'source'}
        title={titles?.source}
        options={options?.source}
        optionsKey={dataSourceKey}
        selectedKey={selected?.source}
        onChange={handleChangeSelectOptions}
        required={required?.source}
        messageError={messageError?.source}
      />
      <div className="transfer_button">
        <Button type="primary" disabled={options?.source?.length === 0} iconDirection={'right'} icon={<RightSvg />} onClick={handleTransferAll}>
          เลือกทั้งหมด
        </Button>

        <Button
          type="secondary"
          disabled={selected?.source?.length === 0}
          iconDirection={'right'}
          icon={<RightSvg />}
          onClick={handleTransferSourceToTarget}
        >
          เลือก
        </Button>
        <Button
          type="dangerSecondary"
          disabled={selected?.target?.length === 0}
          iconDirection={'left'}
          icon={<LeftSvg />}
          onClick={handleTransferTargetToSource}
        >
          ลบ
        </Button>
        <Button
          type="dangerPrimary"
          disabled={options?.target?.length === 0}
          onClick={() => {
            if (onChange) {
              onChange([])
              setSelected(prev => ({ ...prev, target: [] }))
            }
          }}
          iconDirection={'left'}
          icon={<LeftSvg />}
        >
          ลบทั้งหมด
        </Button>
      </div>
      <TransferBox
        id={'target'}
        title={titles?.target}
        options={options?.target}
        optionsKey={dataSourceKey}
        selectedKey={selected?.target}
        onChange={handleChangeSelectOptions}
        required={required?.target}
        messageError={messageError?.target}
      />
    </div>
  )
}
const TransferBox = ({ id, title, options, optionsKey, selectedKey, onChange, required, messageError }) => {
  return (
    <div>
      <FormItem label={title} required={required}>
        <div className="d-flex  transfer_box">
          {options?.length === 0 ? (
            <div className="flex-fill">
              <NoData />
            </div>
          ) : (
            <CheckboxGroup
              id={id}
              value={selectedKey}
              options={options}
              optionKey={optionsKey}
              onChange={newCheckList => onChange(id, newCheckList)}
              type={'options'}
            />
          )}
        </div>
        <div className="text-danger">{messageError}</div>
      </FormItem>
      {/* <div>{title}</div> */}
    </div>
  )
}

export default Transfer
