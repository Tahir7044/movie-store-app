import React from "react";

export default function Input({
  type,
  error,
  handleOnchange,
  label,
  value,
  name,
  className,
  placeholder
}) {
  return (
    <div className='form-group'>
      {label&&<label htmlFor={name}>{label}</label>}
      <input
        type={type}
        onChange={handleOnchange}
        value={value}
        name={name}
        placeholder={placeholder}
        className={className||'form-control'}
        id={name}
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
}
