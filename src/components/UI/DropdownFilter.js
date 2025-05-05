import React from 'react'

export default function DropdownFilter({options, selected, onChangeFn, filterLabel, dataTestId}) {
  return (
    <>
      <label>{filterLabel}</label>
        <select className="ml-10" data-testId={dataTestId} value={selected} onChange={onChangeFn}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
    </>
  )
}
