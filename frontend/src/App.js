import React from "react";

import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Route } from "react-router-dom";

import theme from "./theme/Theme";
import GlobalStyle from "./theme/GlobalStyle";

import Header from "./components/Header";

import POS from "./components/pos";
import Warehouse from "./components/warehouse";
import { connect } from "react-redux";

import messages from "./i18n";

const App = props => {
  return (
    <IntlProvider locale={props.locale} messages={messages[props.locale]}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Header />
            <Route path="/" exact component={POS} />
            <Route path="/warehouse" component={Warehouse} />
          </Router>
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
