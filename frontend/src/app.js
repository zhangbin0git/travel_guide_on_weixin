import { Component } from 'react'
import './app.scss'

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