import React from "react";

export default function Select({
  options,
  name,
  label,
  value,
  error,
  handleOnchange,
}) {
  // console.log(rest)
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={handleOnchange}
        className='form-control'>
        <option value={value && value._id}>{value && value.name}</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
}
