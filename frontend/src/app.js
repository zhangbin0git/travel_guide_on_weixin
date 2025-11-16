import { Component } from 'react'
import React from 'react'
import './app.scss'

// 确保React在全局作用域中可用，解决微信小程序环境中React未定义的问题
if (typeof global !== 'undefined') {
  global.React = React
}

class App extends Component {
  componentDidMount() {
    console.log('App mounted')
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // this.props.children 是将要被渲染的页面
    return this.props.children
  }
}

export default App