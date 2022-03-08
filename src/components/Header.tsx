import React, { useState } from "react";
import {
  Heading,
  Text,
  Input,
  Stack,
  PresenceTransition,
  Box,
} from "native-base";
import { useMovieContext } from "../contexts/MovieContext";

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  const { searchTerm, setSearchTerm } = useMovieContext();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm("");
    }
  };

  const handleChange = (text: string) => {
    setSearchTerm(text);
  };
  return (
    <Stack maxWidth="90%">
      <Heading>
        <Text onPress={toggleSearch} color="emerald.500">
          FikaSearch
        </Text>
      </Heading>
      {showSearch ? (
        <PresenceTransition
          visible={showSearch}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 250,
            },
          }}
        >
          <Box mt="1.5" mb="1.5" flexDir="row">
            <Input
              isFullWidth
              placeholder="Enter a movie title here"
              value={searchTerm}
              onChangeText={handleChange}
            />
          </Box>
        </PresenceTransition>
      ) : null}
    </Stack>
  );
};

export default Header;
