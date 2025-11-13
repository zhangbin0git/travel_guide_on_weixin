import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'
import './index.scss'

export default class Profile extends Component {
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
      <View className='profile'>
        <View className='container'>
          <View className='user-info'>
            <AtAvatar 
              circle 
              size='large'
              text='用户'
            />
            <Text className='username'>用户名</Text>
          </View>
          
          <AtList>
            <AtListItem 
              title='我的攻略' 
              arrow='right'
              onClick={() => console.log('我的攻略')}
            />
            <AtListItem 
              title='收藏夹' 
              arrow='right'
              onClick={() => console.log('收藏夹')}
            />
            <AtListItem 
              title='历史记录' 
              arrow='right'
              onClick={() => console.log('历史记录')}
            />
            <AtListItem 
              title='设置' 
              arrow='right'
              onClick={() => console.log('设置')}
            />
          </AtList>
        </View>
      </View>
    )
  }
}