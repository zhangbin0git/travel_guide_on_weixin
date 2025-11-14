import React from 'react'
import { View, Text } from '@tarojs/components'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const Favorites = () => {
  const router = useRouter()

  return (
    <View className='favorites'>
      <TopNavBar title='收藏夹' />
      
      <View className='favorites-content'>
        {/* 收藏列表 */}
        <Card title='我的收藏' className='favorites-list'>
          <View className='empty-state'>
            <Text className='empty-text'>暂无收藏</Text>
            <Button 
              type='primary' 
              size='medium'
              onClick={() => router.goToSearch()}
            >
              去搜索
            </Button>
          </View>
        </Card>
      </View>
    </View>
  )
}

export default Favorites