import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'
import './index.scss'

export default class Profile extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='profile'>
        <View className='user-info'>
          <AtAvatar
            circle
            size='large'
            image='https://jdc.jd.com/img/200.png'
          />
          <Text className='username'>旅行爱好者</Text>
        </View>
        
        <View className='menu-list'>
          <AtList>
            <AtListItem
              title='我的攻略'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89a71f2.png'
            />
            <AtListItem
              title='收藏夹'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89a71f2.png'
            />
            <AtListItem
              title='历史记录'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89a71f2.png'
            />
            <AtListItem
              title='设置'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89a71f2.png'
            />
          </AtList>
        </View>
      </View>
    )
  }
}