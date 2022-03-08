import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { Flex, Spacer, Button, Text } from "native-base";

const Pagination = () => {
  const { totalPages, page, setPage } = useMovieContext();

  return (
    <Flex
      direction="row"
      justifyContent="center"
      alignItems="center"
      pt="5"
      width="95%"
    >
      <Button isDisabled={page === 1} onPress={() => setPage(1)}>
        {"<<"}
      </Button>
      <Spacer />
      <Button isDisabled={page === 1} onPress={() => setPage(page - 1)}>
        {"<"}
      </Button>
      <Spacer />
      <Text>{page}</Text>
      <Spacer />
      <Button
        isDisabled={page === totalPages}
        onPress={() => setPage(page + 1)}
      >
        {">"}
      </Button>
      <Spacer />
      <Button
        isDisabled={page === totalPages}
        onPress={() => setPage(totalPages)}
      >
        {">>"}
      </Button>
    </Flex>
  );
};

export default Pagination;
