import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.scss'

export default class Search extends Component {
  state = {
    value: '',
  }

  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onChange(value) {
    this.setState({ value })
  }

  onActionClick() {
    console.log('搜索内容:', this.state.value)
  }

  render() {
    return (
      <View className="search">
        <View className="container">
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
            placeholder="搜索目的地、景点或攻略"
          />
        </View>
      </View>
    )
  }
}
