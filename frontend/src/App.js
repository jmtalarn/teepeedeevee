import React from "react";

import { ThemeProvider } from "styled-components";
import theme from "./theme/Theme";
import GlobalStyle from "./theme/GlobalStyle";
import Header from "./components/Header";
import SearchProduct from "./components/SearchProduct";
import TicketDashboard from "./components/TicketDashboard";
import Layout from "./components/Layout";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Layout>
          <SearchProduct />
          <TicketDashboard />
        </Layout>
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}

export default App;
