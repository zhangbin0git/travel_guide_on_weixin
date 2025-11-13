import { Component } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.scss'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onChange(value) {
    this.setState({ value })
    console.log('搜索内容:', value)
  }

  render() {
    return (
      <View className='search'>
        <View className='container'>
          <Text className='title'>搜索目的地</Text>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            placeholder='请输入搜索关键词'
          />
        </View>
      </View>
    )
  }
}