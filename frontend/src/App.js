import React from "react";

import { ThemeProvider } from "styled-components";
import theme from "./theme/Theme";
import GlobalStyle from "./theme/GlobalStyle";
import Header from "./components/Header";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}

export default App;
