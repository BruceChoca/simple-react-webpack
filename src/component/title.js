import React, { Component } from 'react';
import { connect } from './my-redux';
class Title extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <div style={{color: this.props.themeColor}}>
        { this.props.title }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
    title: state.title
  }
}
Title = connect(mapStateToProps, Title)

export default Title;