import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../styles/customTheme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCss theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
