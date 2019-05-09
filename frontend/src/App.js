import React from "react";
import logo from "./logo.svg";
import { ThemeProvider } from "styled-components";
import theme from "./theme/Theme";
import GlobalStyle from "./theme/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}

export default App;
