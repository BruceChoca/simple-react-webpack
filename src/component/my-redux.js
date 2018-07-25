import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux思路 将控件包装一层设置this.context 绑定dispacth更新数据远 渲染之后通过this.context作为prop绑定到主控件
// 通过统一的dispatch入口更新数据 通过监听者监听内容变化渲染
// 每次变更通过对比旧对象 控制渲染内容 所以每个变更的返回需要通过...state新建对象{ ..state, title: '' }

// let appState = { // 初始化数据和渲染整合进createStore中
//   title: {
//     text: 'React Title',
//     color: 'red',
//   },
//   content: {
//     text: 'React Context',
//     color: 'blue'
//   }
// }

// const store = createStore(themeReducer);
// let oldState = store.getState() // 缓存旧的 state
// store.subscribe(() => {  // 新增渲染函数，每次变动重新渲染
//   // 渲染之前需要对比数据，控制重复渲染，子组件也一样
//   const newState = store.getState() // 数据可能变化，获取新的 state
//   renderApp(newState, oldState);
//   oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
// }) 

// store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'go' });

export function createStore(reducer) {
  let state = null;
  const listeners = [];
  const getState = () => state;
  const subscribe = (listener) => { listeners.push(listener); };
  const dispatch = (action) => { 
    state = reducer(state, action) // 覆盖原对象
    listeners.forEach(l => l());
  };

  dispatch({}) // 初始化 state 并整合初始化渲染

  return { getState, dispatch, subscribe }
}

/****************************优化版本 ******************************************/

// 通过connect封装 通过高级组件方式 传入组件生成新组件
/**
 * mapStateToProps: 渲染map 组件该控制context哪些参数Key => 告知了 Connect 应该如何去 store 里面取数据
 * const mapStateToProps = (state) => {
 *   return {
 *     themeColor: state.themeColor,
 *     themeName: state.themeName,
 *     fullName: `${state.firstName} ${state.lastName}`
 *     ...
 *   }
 * }
 * WrappedComponent 组件
 * 用法Header = connect(mapStateToProps, Header)
 */
export var connect = (mapStateToProps, WrappedComponent) => {
  class Connect extends Component {
    // TODO: 如何从 store 取数据？
    constructor (props) {
      super(props)
      this.state = { allProps: {} }
    }

    componentWillMount () {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    // 更新渲染 参数存入state
    _updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入 props，让获取数据更加灵活方便
      this.setState({
        allProps: { // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...this.props,
          dispatch: store.dispatch
        }
      })
    }

    render () {
      return <WrappedComponent {...this.state.allProps} />; // 通过props赋值
    }
  }

  Connect.contextTypes = {
    store: PropTypes.object
  }

  return Connect
}

export class Provider extends Component {
  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}

Provider.propTypes = {
  store: PropTypes.object,
  children: PropTypes.any
}

Provider.childContextTypes = {
  store: PropTypes.object
}