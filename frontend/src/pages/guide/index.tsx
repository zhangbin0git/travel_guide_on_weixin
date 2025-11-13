import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtCard, AtButton } from 'taro-ui'
import './index.scss'

export default class Guide extends Component {
  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="guide">
        <View className="container">
          <AtCard
            title="北京三日游攻略"
            content="探索北京的历史文化，品尝地道美食，体验传统与现代的完美融合。"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89a71f2.png"
          />
          <AtCard
            title="上海周末游指南"
            content="感受上海的繁华与浪漫，漫步外滩，探索弄堂文化，享受都市生活。"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89a71f2.png"
          />
          <AtCard
            title="成都美食之旅"
            content="品尝正宗川菜，探索熊猫基地，体验悠闲的茶馆文化，感受天府之国的魅力。"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89a71f2.png"
          />
          <View className="button-group">
            <AtButton type="primary" size="large">
              创建新攻略
            </AtButton>
          </View>
        </View>
      </View>
    )
  }
}
