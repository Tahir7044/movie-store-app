import React from "react";
import Input from "./Input";

const Search = (props) => {
  const { value, onChange } = props;
  return (
    <Input
      type='text'
      name='query'
      className='form-control my-3'
      placeholder='Search...'
      value={value}
      handleOnchange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Search;
