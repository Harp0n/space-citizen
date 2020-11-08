import React from "react";

class ChangingProgressProvider extends React.Component {
  static defaultProps = {
    interval: 1000
  };

  state = {
    valuesIndex: 0
  };

  constructor() {
    super();
    setInterval(() => {
      this.setState({
        valuesIndex: 1 % 2
      });
    }, 0);
  }

    

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
