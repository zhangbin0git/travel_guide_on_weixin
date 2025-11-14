import React from 'react'
import { View, Text } from '@tarojs/components'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const MyGuides = () => {
  const router = useRouter()

  return (
    <View className='my-guides'>
      <TopNavBar title='我的攻略' />
      
      <View className='my-guides-content'>
        {/* 攻略列表 */}
        <Card title='我的攻略' className='guides-list'>
          <View className='empty-state'>
            <Text className='empty-text'>暂无攻略</Text>
            <Button 
              type='primary' 
              size='medium'
              onClick={() => router.goToGuide()}
            >
              创建第一个攻略
            </Button>
          </View>
        </Card>
      </View>
    </View>
  )
}

export default MyGuides