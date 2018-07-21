import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Title from './component/title';
import Context from './component/context'

class Home extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <div>
        <Title/>
        <Context/>
      </div>
    );
  }
}

ReactDom.render(<Home />, document.getElementById('root'));