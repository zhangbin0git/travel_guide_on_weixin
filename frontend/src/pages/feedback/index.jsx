import React, { useState } from 'react'
import { View, Text, Textarea } from '@tarojs/components'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const Feedback = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: '功能建议',
    content: '',
    contact: ''
  })

  // 反馈类型选项
  const feedbackTypes = ['功能建议', 'Bug反馈', '使用问题', '其他']

  // 处理类型选择
  const handleTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      type
    }))
  }

  // 处理内容输入
  const handleContentInput = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }))
  }

  // 处理联系方式输入
  const handleContactInput = (value) => {
    setFormData(prev => ({
      ...prev,
      contact: value
    }))
  }

  // 提交反馈
  const handleSubmit = async () => {
    if (!formData.content.trim()) {
      // 这里应该显示提示信息
      console.log('请输入反馈内容')
      return
    }

    try {
      setLoading(true)
      // 这里应该调用提交反馈API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 返回上一页
      router.navigateBack()
    } catch (error) {
      console.error('提交失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='feedback'>
      <TopNavBar title='意见反馈' />
      
      {loading && <Loading overlay text='提交中...' />}

      <View className='feedback-content'>
        {/* 反馈类型 */}
        <Card title='反馈类型' className='feedback-type'>
          <View className='type-options'>
            {feedbackTypes.map(type => (
              <View
                key={type}
                className={`type-option ${formData.type === type ? 'active' : ''}`}
                onClick={() => handleTypeSelect(type)}
              >
                <Text className='type-text'>{type}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* 反馈内容 */}
        <Card title='反馈内容' className='feedback-content-card'>
          <Textarea
            className='content-textarea'
            placeholder='请详细描述您的反馈内容，我们会认真对待每一条建议'
            value={formData.content}
            onInput={(e) => handleContentInput(e.detail.value)}
            maxlength={500}
          />
          <Text className='content-count'>{formData.content.length}/500</Text>
        </Card>

        {/* 联系方式 */}
        <Card title='联系方式（选填）' className='feedback-contact'>
          <Textarea
            className='contact-textarea'
            placeholder='请留下您的联系方式，方便我们回复您'
            value={formData.contact}
            onInput={(e) => handleContactInput(e.detail.value)}
            maxlength={100}
          />
        </Card>

        {/* 提交按钮 */}
        <View className='submit-button'>
          <Button 
            type='primary' 
            size='large'
            onClick={handleSubmit}
          >
            提交反馈
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Feedback