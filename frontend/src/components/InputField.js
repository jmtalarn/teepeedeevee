import React from "react";
import styled from "styled-components";

const Input = styled.input`
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  padding: 0.5rem;
  font-size: 2rem;
  font-weight: 100;
  display: block;
  width: 100%;
`;

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      typingTimeout: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {
      target: { value },
    } = event;
    const { lazy } = this.props;

    console.log("HANDLE CHANGE!", value);
    if (lazy) {
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      const typingTimeout = setTimeout(() => {
        this.props.onChange({ target: { value: value } });
      }, this.props.timeout || 500);
      this.setState({ value, typingTimeout });
    } else {
      this.setState({ value });
      this.props.onChange({ target: { value: value } });
    }
  }
  render() {
    return (
      <Input
        type={this.props.type}
        size={this.props.size}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default InputField;
