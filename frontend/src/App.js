import React from "react";

import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import theme from "./theme/Theme";
import GlobalStyle from "./theme/GlobalStyle";
import Header from "./components/Header";
import SearchProduct from "./components/SearchProduct";
import OrderingDashboard from "./components/OrderingDashboard";
import Layout from "./components/Layout";
import { connect } from "react-redux";

import messages from "./i18n";

const App = props => {
  return (
    <IntlProvider locale={props.locale} messages={messages[props.locale]}>
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
};

export default connect(
  (state, props) => ({
    locale: state.locale,
  }),
  {},
)(App);
