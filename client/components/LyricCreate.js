import React, { Component } from 'react';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    event.preventDefault();

  }

  render() {
    return(
      <form
      onSubmit={this.handleSubmit}>
        <label>Write Lyric</label>
        <input
        value={this.props.value}
        onChange={(event) => this.setState({ value: event.target.value })}
        />
      </form>
    );
  }
}

export default LyricCreate;
