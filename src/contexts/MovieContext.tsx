import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { getGenres, getMovies } from "../apis/movieApi";
import { debounce } from "underscore";

export type Movie = {
  title: string;
  posterPath: string;
  genre: string[];
};

interface IMovieContext {
  movies: Movie[];
  filteredMovies: Movie[];
  isLoading: boolean;
  searchTerm: string;
  page: number;
  totalPages: number;
  setSearchTerm: (searchTerm: string) => void;
  setPage: (page: number) => void;
}

const defaultState = {
  movies: [] as Movie[],
  filteredMovies: [] as Movie[],
  isLoading: false,
  searchTerm: "",
  page: 1,
  totalPages: 1,
};

const MovieContext = createContext<IMovieContext>({
  ...defaultState,
  setSearchTerm: () => {},
  setPage: () => {},
});

export const MovieProvider: React.FC = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "setMovies":
        return {
          ...state,
          movies: action.movies,
          totalPages: action.totalPages,
        };
      case "setPage":
        return {
          ...state,
          page: action.page,
        };
      case "setSearchTerm":
        return {
          ...state,
          searchTerm: action.searchTerm,
          page: 1,
        };
      case "setIsLoading":
        return { ...state, isLoading: action.isLoading };
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const setSearchTerm = useCallback((searchTerm: string) => {
    const action = { type: "setSearchTerm", searchTerm: searchTerm };
    dispatch(action);
  }, []);

  const setPage = useCallback((page: number) => {
    const action = { type: "setPage", page: page };
    dispatch(action);
  }, []);

  const setMovies = useCallback((movies: Movie[], totalPages: number) => {
    const action = {
      type: "setMovies",
      movies: movies,
      totalPages: totalPages,
    };
    dispatch(action);
  }, []);

  const setIsLoading = useCallback((isLoading: boolean) => {
    const action = { type: "setIsLoading", isLoading: isLoading };
    dispatch(action);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const { results: movieData, total_pages: totalPages } = await getMovies(
        state.page,
        state.searchTerm
      );

      const genreData = await getGenres();

      const formattedMovieData = movieData.map((movie: any) => {
        const movieGenres = movie.genre_ids.map((genreId: number) => {
          const genre = genreData.find((g: any) => g.id === genreId);
          return genre.name;
        });
        return {
          title: movie.title,
          posterPath: movie.poster_path,
          genre: movieGenres,
        };
      });

      setMovies(formattedMovieData, totalPages > 500 ? 500 : totalPages);
      setIsLoading(false);
    };
    fetchData();
  }, [state.page, state.searchTerm]);

  const { movies, searchTerm, filteredMovies, isLoading, totalPages, page } =
    state;

  return (
    <MovieContext.Provider
      value={{
        movies,
        searchTerm,
        setSearchTerm,
        setPage,
        filteredMovies,
        isLoading,
        totalPages,
        page,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
