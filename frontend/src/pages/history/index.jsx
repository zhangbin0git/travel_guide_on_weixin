import React from 'react'
import { View, Text } from '@tarojs/components'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const History = () => {
  const router = useRouter()

  return (
    <View className='history'>
      <TopNavBar title='历史记录' />
      
      <View className='history-content'>
        {/* 历史记录列表 */}
        <Card title='浏览历史' className='history-list'>
          <View className='empty-state'>
            <Text className='empty-text'>暂无浏览记录</Text>
            <Button 
              type='primary' 
              size='medium'
              onClick={() => router.goToSearch()}
            >
              去浏览
            </Button>
          </View>
        </Card>
      </View>
    </View>
  )
}

export default History