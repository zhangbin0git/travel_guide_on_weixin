import React from 'react'
import { View, Text } from '@tarojs/components'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const Settings = () => {
  const router = useRouter()

  // 处理设置项点击
  const handleSettingClick = (type) => {
    switch (type) {
      case 'editProfile':
        router.goToEditProfile()
        break
      case 'feedback':
        router.goToFeedback()
        break
      case 'about':
        router.goToAbout()
        break
      default:
        console.log('点击了设置项:', type)
    }
  }

  return (
    <View className='settings'>
      <TopNavBar title='设置' />
      
      <View className='settings-content'>
        {/* 账号设置 */}
        <Card title='账号设置' className='account-settings'>
          <View 
            className='setting-item'
            onClick={() => handleSettingClick('editProfile')}
          >
            <Text className='setting-text'>编辑资料</Text>
            <Text className='setting-arrow'>></Text>
          </View>
        </Card>

        {/* 系统设置 */}
        <Card title='系统设置' className='system-settings'>
          <View 
            className='setting-item'
            onClick={() => handleSettingClick('feedback')}
          >
            <Text className='setting-text'>意见反馈</Text>
            <Text className='setting-arrow'>></Text>
          </View>
          <View 
            className='setting-item'
            onClick={() => handleSettingClick('about')}
          >
            <Text className='setting-text'>关于我们</Text>
            <Text className='setting-arrow'>></Text>
          </View>
        </Card>
      </View>
    </View>
  )
}

export default Settings