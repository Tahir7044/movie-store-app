export const genres = [
  { _id: "104", name: "Sci-fy" },
  { _id: "102", name: "Suspense" },
  { _id: "100", name: "Action" },
  { _id: "101", name: "Comedy" },
  { _id: "103", name: "Drama" },
];

export function getGenres() {
  return genres;
}

export function getGenreById(id) {
  return genres.filter((g) => g._id === id);
}
