import React from "react";
import { Center, Flex } from "native-base";
import Header from "../components/Header";
import Pagination from "./Pagination";

const Layout: React.FC = ({ children }) => {
  return (
    <Center>
      <Flex maxHeight="100%">
        <Header />
        {children}
        <Pagination />
      </Flex>
    </Center>
  );
};

export default Layout;
