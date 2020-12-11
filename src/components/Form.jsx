import { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import Input from "./Input";
import Select from "./Select";
export default class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    const errors = {};
    if (error)
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (!_.isEmpty(errors)) return;
    this.doSubmit();
  };
  handleOnchange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    data[input.name] = input.value;
    const error = this.validateProperty(input.name, input.value);
    errors[input.name] = error;
    this.setState({ data, errors });
  };
  renderButton = (label) => (
    <button
      disabled={!_.isEmpty(this.validate())}
      type='submit'
      className='btn btn-primary'>
      {label}
    </button>
  );
  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        name={name}
        type={type}
        error={errors[name]}
        value={data[name]}
        handleOnchange={this.handleOnchange}
      />
    );
  };
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    const value = data[name] ? options.filter((g) => g._id === data[name]) : "";
    return (
      <Select
        label={label}
        name={name}
        options={options}
        error={errors[name]}
        value={value[0]}
        handleOnchange={this.handleOnchange}
      />
    );
  };
}
