import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import Pagination from "./Pagination";
import MoviesTable from "./MoviesTable";
import { paginate } from "../util/paginate";
import List from "./List";
import Search from "./Search";
export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All movies" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  getMoviesByGenre = (movies, selectedGenre) => {
    if (selectedGenre && selectedGenre._id)
      return movies.filter((movie) => movie.genre._id === selectedGenre._id);
    return movies;
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  getPageMovies = () => {
    const {
      movies: allMovies,
      selectedGenre,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
    } = this.state;
    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );
    else filteredMovies = this.getMoviesByGenre(allMovies, selectedGenre);
    const { length: count } = filteredMovies;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);
    return { count, movies };
  };
  handleLiked = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    this.setState({
      movies: originalMovies.filter((m) => m._id !== movie._id),
    });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };
  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };
  render() {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { count, movies } = this.getPageMovies();
    return (
      <div className='row'>
        <div className='col-3'>
          <List
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className='col'>
          <Link
            to='/movie/new'
            style={{ marginBottom: 20 }}
            className='btn btn-primary'>
            Add Movie
          </Link>
          <Search value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            count={count}
            movies={movies}
            onDelete={this.handleDelete}
            onLiked={this.handleLiked}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
