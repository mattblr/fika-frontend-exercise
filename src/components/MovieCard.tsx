import React from "react";
import { Movie } from "../hooks/useFetchMovies";
import { Box, HStack, VStack, Image, Divider, View, Text } from "native-base";

interface IProps {
  movie: Movie;
}

const MovieCard: React.FC<IProps> = ({ movie }) => {
  const posterUri = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500/${movie.posterPath}`
    : null;
  return (
    <Box
      bgColor="light.100"
      borderRadius="md"
      padding="2"
      shadow="1"
      mt="2"
      maxWidth="100%"
    >
      <HStack space="3">
        <VStack w="2/6" alignItems="center" justifyContent="center">
          <Image
            source={{
              uri: posterUri,
            }}
            size="md"
            alt={`Movie poster for ${movie.title}`}
          />
        </VStack>
        <Divider my="2" orientation="vertical" />
        <View w="3/6" m="1">
          <Text fontWeight="medium">{movie.title}</Text>
          {movie.genre.map((genre: string, index: number) => {
            return (
              <Text key={index} fontWeight="light">
                {genre}
              </Text>
            );
          })}
        </View>
      </HStack>
    </Box>
  );
};

export default MovieCard;
