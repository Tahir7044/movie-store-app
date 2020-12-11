import { Component, Fragment } from "react";
import "./App.css";
import Movies from "./components/movies";
import { Redirect, Route, Switch } from "react-router-dom";
import Rental from "./components/Rental";
import Customer from "./components/Customer";
import Page404 from "./components/Page404";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path='/movie/:id' exact component={MovieForm} />
            <Route path='/movies' exact component={Movies} />
            <Route path='/login' exact render={() => <LoginForm />} />
            <Route path='/signup' exact render={() => <Register />} />
            <Route path='/rentals' exact component={Rental} />
            <Route path='/customers' exact component={Customer} />
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
