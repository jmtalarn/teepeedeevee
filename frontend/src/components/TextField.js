import React from "react";
import styled from "styled-components";

const Input = styled.input`
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  padding: 0.5rem;
  font-size: 2rem;
  font-weight: 100;
`;

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      typing: false,
      typingTimeout: 0,
    };

    if (props.lazy) {
      this.handleChange = this.handleChangeLazy.bind(this);
    } else {
      this.handleChange = this.handleChangeImmediate.bind(this);
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      value: props.value,
    };
  }
  handleChangeImmediate(event) {
    this.setState(
      Object.assign({}, this.state, {
        value: event.target.value,
      }),
    );
    this.props.onChange(event);
  }
  handleChangeLazy(event) {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.setState({
      value: event.target.value,
      typingTimeout: setTimeout(() => {
        this.props.onChange({ target: { value: this.state.value } });
      }, this.props.timeout || 500),
    });
  }
  render() {
    const props = { ...this.props };
    props.value = this.state.value;
    props.onChange = this.handleChange;

    return <Input {...props} />;
  }
}

export default TextField;
