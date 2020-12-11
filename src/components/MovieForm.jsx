import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import Form from "./Form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .greater(-1)
      .less(101)
      .required()
      .label("number in Stock"),
    dailyRentalRate: Joi.number()
      .greater(-1)
      .less(30)
      .required()
      .label("Daily Rental Rate"),
  };
  componentDidMount() {
    this.setState({ genres: getGenres() });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("./page404");
    this.setState({ data: this.mapToViewMode(movie) });
  }
  mapToViewMode = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <Fragment>
        <h1> Add Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </Fragment>
    );
  }
}

export default withRouter(MovieForm);
