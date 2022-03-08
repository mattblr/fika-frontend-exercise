const moviesUrl = (page: number) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=${page}&include_adult=false`;
const searchUrl = (query: string, page: number) =>
  `https://api.themoviedb.org/3/search/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=${page}&include_adult=false&query=${query}`;
const genreUrl =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US";

export const getGenres = async () => {
  try {
    const res = await fetch(genreUrl);
    const genres = await res.json();

    return genres.genres;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMovies = async (pageNumber = 1, searchTerm?: string) => {
  try {
    if (searchTerm && searchTerm !== "") {
      const res = await fetch(searchUrl(searchTerm, pageNumber));
      const results = await res.json();

      return results;
    } else {
      const res = await fetch(moviesUrl(pageNumber));
      const movies = await res.json();

      return movies;
    }
  } catch (error) {
    throw new Error(error);
  }
};
