import React from "react";

import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import theme from "./theme/Theme";
import GlobalStyle from "./theme/GlobalStyle";
import Header from "./components/Header";
import SearchProduct from "./components/SearchProduct";
import OrderingDashboard from "./components/OrderingDashboard";
import Layout from "./components/Layout";

import "./i18n";

function App() {
  return (
    <IntlProvider locale={navigator.language}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Layout>
            <SearchProduct />
            <OrderingDashboard />
          </Layout>
          <GlobalStyle />
        </div>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
