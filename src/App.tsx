import React from "react";
import { SafeAreaView } from "react-native";
import MovieList from "./screens/MovieList";
import registerRootComponent from "expo/build/launch/registerRootComponent";
import { NativeBaseProvider } from "native-base";
import Layout from "./components/Layout";
import { MovieProvider } from "./contexts/MovieContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <MovieProvider>
        <SafeAreaView>
          <Layout>
            <MovieList />
          </Layout>
        </SafeAreaView>
      </MovieProvider>
    </NativeBaseProvider>
  );
}

registerRootComponent(App);
