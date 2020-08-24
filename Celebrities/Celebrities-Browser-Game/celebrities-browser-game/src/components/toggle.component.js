import React, { Component } from 'react';

class Toggle extends Component {
  state = {
    on: false,
    off: true,
  };

  toggle = () => {
    this.setState({
      on: !this.state.on,
      off: !this.state.off,
    });
  };

  render() {
    const { display } = this.props;
    return (
      <div>
        {display({
          on: this.state.on,
          off: this.state.off,
          toggle: this.toggle,
        })}
      </div>
    );
  }
}

export default Toggle;
