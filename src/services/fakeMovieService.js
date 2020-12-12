import { getGenreById } from "./fakeGenreService";
let movies = [
  {
    _id: "1",
    title: "Inception",
    genre: { _id: "104", name: "Sci-fy" },
    numberInStock: 6,
    dailyRentalRate: 20.2,
    publishDate: "2015-01-03T19:04:28.214",
    liked: false,
  },
  {
    _id: "2",
    title: "Tenet",
    genre: { _id: "102", name: "Suspense" },
    numberInStock: 5,
    dailyRentalRate: 15.2,
    publishDate: "2020-12-03T19:04:28.214",
    liked: false,
  },
  {
    _id: "3",
    title: "Gone Case",
    genre: { _id: "100", name: "Action" },
    numberInStock: 8,
    dailyRentalRate: 3.5,
    publishDate: "2018-12-23T19:04:28.214",
    liked: false,
  },
  {
    _id: "4",
    title: "Lucy",
    genre: { _id: "104", name: "Sci-fy" },
    numberInStock: 6,
    dailyRentalRate: 6.2,
    publishDate: "2018-01-03T19:04:28.214",
    liked: false,
  },
  {
    _id: "5",
    title: "3 Idiots",
    genre: { _id: "101", name: "Comedy" },
    numberInStock: 16,
    dailyRentalRate: 9.2,
    publishDate: "2016-10-03T19:04:28.214",
    liked: false,
  },
  {
    _id: "6",
    title: "Friends",
    genre: { _id: "103", name: "Drama" },
    numberInStock: 5,
    dailyRentalRate: 5.8,
    publishDate: "2018-05-022T19:04:28.214",
    liked: false,
  },
  {
    _id: "7",
    title: "Breaking Bad",
    genre: { _id: "103", name: "Drama" },
    numberInStock: 3,
    dailyRentalRate: 8.2,
    publishDate: "2020-11-03T19:05:28.214",
    liked: false,
  },
  {
    _id: "8",
    title: "underground 6",
    genre: { _id: "100", name: "Action" },
    numberInStock: 10,
    dailyRentalRate: 5.2,
    publishDate: "2008-01-03T19:04:28.214",
    liked: false,
  },
  {
    _id: "9",
    title: "Dark",
    genre: { _id: "102", name: "Suspense" },
    numberInStock: 2,
    dailyRentalRate: 10.2,
    publishDate: "2018-03-03T19:05:28.214",
    liked: false,
  },
  {
    _id: "10",
    title: "rainy day",
    genre: { _id: "101", name: "Comedy" },
    numberInStock: 10,
    dailyRentalRate: 6.2,
    publishDate: "2019-01-03T19:04:28.214",
    liked: false,
  },
];

export const deleteMovie = (id) => {
  movies = movies.filter((movie) => movie._id !== id);
};

export const getMovie = (id) => {
  return movies.find((m) => m._id === id);
};
export function saveMovie(movie) {
  movie._id
    ? deleteMovie(movie._id)
    : (movie._id = JSON.stringify(movies.length + 1));
  const genre = getGenreById(movie.genreId);
  const item = {
    _id: movie._id,
    title: movie.title,
    genre: genre[0],
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  };
  movies.push(item);
}
