import React, { Component } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentWillMount() {}

  componentDidMount() {
    // 从本地存储获取搜索参数
    const searchKeyword = Taro.getStorageSync('searchKeyword')
    const searchDestination = Taro.getStorageSync('searchDestination')
    
    if (searchKeyword) {
      this.setState({ value: searchKeyword })
      // 清除存储的参数
      Taro.removeStorageSync('searchKeyword')
      // 执行搜索
      this.handleSearch(searchKeyword)
    } else if (searchDestination) {
      this.setState({ value: searchDestination })
      // 清除存储的参数
      Taro.removeStorageSync('searchDestination')
      // 执行搜索
      this.handleSearch(searchDestination)
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onChange(value) {
    this.setState({ value })
    console.log('搜索内容:', value)
  }

  /**
   * 执行搜索
   */
  handleSearch = (keyword) => {
    console.log('执行搜索:', keyword)
    // 这里可以调用搜索API
    // TODO: 实现搜索逻辑
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