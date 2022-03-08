import React from "react";
import { Text, ScrollView } from "native-base";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMovieContext, Movie } from "../contexts/MovieContext";

const MovieList: React.FC = () => {
  const { isLoading, movies } = useMovieContext();

  return (
    <ScrollView>
      {isLoading ? (
        <LoadingSpinner />
      ) : movies.length > 0 ? (
        movies.map((movie: Movie, index: number) => {
          return <MovieCard key={index} movie={movie} />;
        })
      ) : (
        <Text>No results :(</Text>
      )}
    </ScrollView>
  );
};

export default MovieList;
