import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard, AtButton } from 'taro-ui'
import './index.scss'

export default class Guide extends Component {
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
      <View className='guide'>
        <View className='container'>
          <Text className='title'>旅行攻略</Text>
          
          <AtCard
            title='北京三日游'
            content='探索故宫、长城等著名景点，体验古都文化'
            thumb='https://img.qzonestyle.top/2020/05/24/beijing.png'
          />
          
          <AtCard
            title='上海周末游'
            content='外滩夜景、迪士尼乐园，感受现代都市魅力'
            thumb='https://img.qzonestyle.top/2020/05/24/shanghai.png'
          />
          
          <AtCard
            title='成都美食之旅'
            content='品尝正宗川菜，参观熊猫基地，享受慢生活'
            thumb='https://img.qzonestyle.top/2020/05/24/chengdu.png'
          />
          
          <View className='button-group'>
            <AtButton type='primary' size='normal'>
              创建新攻略
            </AtButton>
          </View>
        </View>
      </View>
    )
  }
}