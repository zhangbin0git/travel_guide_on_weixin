import React, { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const EditProfile = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nickname: '旅行达人',
    bio: '热爱旅行，分享美好',
    location: '北京'
  })

  // 处理表单输入
  const handleInput = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 保存资料
  const handleSave = async () => {
    try {
      setLoading(true)
      // 这里应该调用保存API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 返回上一页
      router.navigateBack()
    } catch (error) {
      console.error('保存失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='edit-profile'>
      <TopNavBar title='编辑资料' />
      
      {loading && <Loading overlay text='保存中...' />}

      <View className='edit-profile-content'>
        {/* 基本信息 */}
        <Card title='基本信息' className='basic-info'>
          <View className='form-item'>
            <Text className='form-label'>昵称</Text>
            <Input
              className='form-input'
              placeholder='请输入昵称'
              value={formData.nickname}
              onInput={(e) => handleInput('nickname', e.detail.value)}
            />
          </View>
          <View className='form-item'>
            <Text className='form-label'>个人简介</Text>
            <Input
              className='form-input'
              placeholder='请输入个人简介'
              value={formData.bio}
              onInput={(e) => handleInput('bio', e.detail.value)}
            />
          </View>
          <View className='form-item'>
            <Text className='form-label'>所在地</Text>
            <Input
              className='form-input'
              placeholder='请输入所在地'
              value={formData.location}
              onInput={(e) => handleInput('location', e.detail.value)}
            />
          </View>
        </Card>

        {/* 保存按钮 */}
        <View className='save-button'>
          <Button 
            type='primary' 
            size='large'
            onClick={handleSave}
          >
            保存
          </Button>
        </View>
      </View>
    </View>
  )
}

export default EditProfile