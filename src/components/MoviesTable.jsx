import React, { Component, Fragment } from "react";
import Table from "./Table";
import auth from '../services/authService';
import Like from "./Like";
import { Link } from "react-router-dom";
export default class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "liked",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLiked(movie)} />
      ),
    },
   
  ];
  deleteButton=()=>{
    return  {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className='btn btn-danger btn-sm'>
          Delete
        </button>
      ),
    }
  };
  componentDidMount(){
    const user=auth.getCurrentUser()
    if(user&&user.isAdmin) this.columns.push(this.deleteButton())
  }
  render() {
    const { count, movies, onSort, sortColumn } = this.props;
    return (
      <Fragment>
        {count ? (
          <p> There are {count} movies in the Database</p>
        ) : (
          <p>There is no movie in database</p>
        )}
        <Table
          data={movies}
          onSort={onSort}
          columns={this.columns}
          sortColumn={sortColumn}
        />
      </Fragment>
    );
  }
}
