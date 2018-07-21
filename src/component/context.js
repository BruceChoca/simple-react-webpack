import React, { Component } from 'react';

class Context extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <div style={{color: this.props.color}}>
        { this.props.text }
      </div>
    )
  }
}

Context.defaultProps = {
  color: 'blue',
  text: 'React Context'
}

export default Context;