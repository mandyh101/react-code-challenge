import React from 'react'

export default function DropdownFilter({options, selected, onChangeFn, filterName, datatestId}) {
  return (
    <>
      <label className="ml-20">Filter by {filterName}: </label>
        <select className="ml-10" data-testId={datatestId} value={selected} onChange={(e) => onChangeFn(e.target)}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
    </>
  )
}
