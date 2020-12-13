import { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movies";
import Rental from "./components/Rental";
import Customer from "./components/Customer";
import Page404 from "./components/Page404";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import auth from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }
  render() {
    return (
      <Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className='container'>
          <Switch>
            <Route path='/movie/:id' exact component={MovieForm} />
            <Route path='/movies' exact component={Movies} />
            <Route path='/login' exact render={() => <LoginForm />} />
            <Route path='/signup' exact render={() => <Register />} />
            <Route path='/logout' exact render={() => <Logout />} />
            <Route path='/rentals' exact component={Rental} />
            <Route path='/customers' exact component={Customer} />
            <Route path='/profile' exact component={Profile} />
            <Route path='/page404' exact component={Page404} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/page404' />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
