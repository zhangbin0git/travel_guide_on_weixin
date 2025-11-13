import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='home'>
        <View className='container'>
          <Text className='title'>旅行攻略小程序</Text>
          <Text className='subtitle'>发现精彩旅程，规划完美出行</Text>
          <View className='button-group'>
            <AtButton 
              type='primary' 
              size='normal'
              onClick={() => {
                console.log('开始探索')
              }}
            >
              开始探索
            </AtButton>
          </View>
        </View>
      </View>
    )
  }
}