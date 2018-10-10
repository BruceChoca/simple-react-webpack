import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Title from './component/title';
import Context from './component/context';

import { Provider, createStore, connect } from './component/my-redux';

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red',
    content: 'React Content1',
    title: 'React Title'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}
const store = createStore(themeReducer);

class Home extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'CHANGE_COLOR', themeColor: 'blue' });
  }

  render() {
    return (
      <div>
        <Title />
        <Context />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
Home = connect(mapStateToProps, Home)

ReactDom.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);