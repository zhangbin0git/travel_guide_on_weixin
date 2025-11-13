import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class Home extends Component {
  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="home">
        <View className="container">
          <Text className="title">旅行攻略小程序</Text>
          <Text className="subtitle">发现精彩旅行目的地，规划完美行程</Text>
          <View className="button-group">
            <AtButton type="primary" size="large">
              开始探索
            </AtButton>
          </View>
        </View>
      </View>
    )
  }
}
