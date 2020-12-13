import React, { Fragment } from "react";
import Joi from "joi-browser";
import * as userService from '../services/userService';
import { withRouter } from "react-router-dom";
import Form from "./Form";
import { toast } from 'react-toastify';
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name:""
    },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async() => {
    try{
      const response=await userService.register(this.state.data)
      toast.success("successfuly registered")
      localStorage.setItem("token",response.headers['x-auth-token'])
      this.props.history.push("/login");
    }catch(ex){
      if(ex.response&&ex.response.status===400){
        const errors={...this.state.errors};
        errors.username=ex.response.data;
        this.setState({errors})
      }
    }
  };

  render() {
    return (
      <Fragment>
        <h1> Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "text")}
          {this.renderButton("Register")}
        </form>
      </Fragment>
    );
  }
}

export default withRouter(RegisterForm);
