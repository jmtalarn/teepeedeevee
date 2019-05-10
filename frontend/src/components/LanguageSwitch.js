import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import theme from "../theme/Theme";
import { connect } from "react-redux";
import { switchLocale } from "../actions/localeActions";

const options = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

const LanguageSelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 3rem 0 auto;
  color: ${props => props.theme.offWhite};
  font-size: 1.5rem;
  font-weight: 300;
`;
const LanguageSelect = styled(Select)`
  width: 10rem;
  margin-left: 1rem;
  font-size: 1rem;
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: theme.black,
  }),
};

const LanguageSelector = props => {
  return (
    <LanguageSelectContainer>
      <FormattedMessage id="language.language" defaultMessage="Language" />
      <LanguageSelect
        styles={customStyles}
        options={options}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
        isSearchable={false}
        value={options.filter(option => option.value === props.locale)}
        onChange={(option, action) => {
          props.switchLocale(option.value);
        }}
      />
    </LanguageSelectContainer>
  );
};

export default connect(
  (state, props) => ({
    locale: state.locale,
  }),
  dispatch => ({
    switchLocale: locale => {
      dispatch(switchLocale(locale));
    },
  }),
)(LanguageSelector);
