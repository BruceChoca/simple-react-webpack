import React, { Component } from 'react';

class Title extends Component {
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


Title.defaultProps = {
  color: 'red',
  text: 'React Title1'
}

export default Title;