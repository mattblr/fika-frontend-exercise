import React from "react";
import { Spinner, Heading, Flex } from "native-base";

const LoadingSpinner: React.FC = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </Flex>
  );
};

export default LoadingSpinner;
