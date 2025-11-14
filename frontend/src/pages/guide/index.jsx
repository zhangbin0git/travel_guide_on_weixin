import React, { useState, useEffect } from 'react'
import { View, Text, Textarea, Picker, Input, Button as TaroButton } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

/**
 * 攻略生成页组件
 */
const Guide = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [guideType, setGuideType] = useState('create') // create, destination, popular, nearby, map
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('3')
  const [budget, setBudget] = useState('2000')
  const [travelStyle, setTravelStyle] = useState('leisure')
  const [requirements, setRequirements] = useState('')
  const [generatedGuide, setGeneratedGuide] = useState(null)

  // 页面参数
  useEffect(() => {
    const params = Taro.getCurrentInstance().router.params
    if (params.type) {
      setGuideType(params.type)
    }
    if (params.name) {
      setDestination(params.name)
    }
  }, [])

  // 旅行天数选项
  const durationOptions = [
    { label: '1天', value: '1' },
    { label: '2天', value: '2' },
    { label: '3天', value: '3' },
    { label: '4天', value: '4' },
    { label: '5天', value: '5' },
    { label: '一周', value: '7' },
    { label: '两周', value: '14' }
  ]

  // 预算选项
  const budgetOptions = [
    { label: '500元以下', value: '500' },
    { label: '500-1000元', value: '1000' },
    { label: '1000-2000元', value: '2000' },
    { label: '2000-5000元', value: '5000' },
    { label: '5000-10000元', value: '10000' },
    { label: '10000元以上', value: '20000' }
  ]

  // 旅行风格选项
  const styleOptions = [
    { label: '休闲度假', value: 'leisure' },
    { label: '文化探索', value: 'culture' },
    { label: '美食之旅', value: 'food' },
    { label: '户外探险', value: 'adventure' },
    { label: '购物血拼', value: 'shopping' },
    { label: '亲子游', value: 'family' }
  ]

  // 生成攻略
  const handleGenerateGuide = async () => {
    if (!destination.trim()) {
      Taro.showToast({
        title: '请输入目的地',
        icon: 'none'
      })
      return
    }

    setLoading(true)
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 模拟生成的攻略数据
      const mockGuide = {
        title: `${destination}${duration}日游完美攻略`,
        destination: destination,
        duration: duration,
        budget: budget,
        style: travelStyle,
        itinerary: [
          {
            day: 1,
            title: '抵达与初探',
            activities: [
              '上午：抵达目的地，酒店入住',
              '下午：游览市中心主要景点',
              '晚上：品尝当地特色美食'
            ]
          },
          {
            day: 2,
            title: '深度游览',
            activities: [
              '上午：参观著名景点A',
              '下午：游览景点B，拍照留念',
              '晚上：体验当地夜生活'
            ]
          },
          {
            day: 3,
            title: '文化体验',
            activities: [
              '上午：参观博物馆或文化场所',
              '下午：购买纪念品，休闲购物',
              '晚上：返程'
            ]
          }
        ],
        tips: [
          '建议提前预订门票，避免排队',
          '注意当地天气变化，准备合适衣物',
          '尝试当地特色美食，体验地道文化'
        ]
      }
      
      setGeneratedGuide(mockGuide)
      Taro.showToast({
        title: '攻略生成成功',
        icon: 'success'
      })
    } catch (error) {
      Taro.showToast({
        title: '生成失败，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  // 保存攻略
  const handleSaveGuide = () => {
    Taro.showToast({
      title: '攻略已保存',
      icon: 'success'
    })
  }

  // 分享攻略
  const handleShareGuide = () => {
    Taro.showToast({
      title: '分享功能开发中',
      icon: 'none'
    })
  }

  /**
   * 跳转到攻略详情页
   */
  const goToGuideDetail = (guideId, title) => {
    router.goToGuideDetail(guideId, title)
  }

  // 渲染创建攻略表单
  const renderCreateForm = () => (
    <View className='create-form'>
      <Card title='基本信息' className='form-card'>
        <View className='form-item'>
          <Text className='form-label'>目的地 *</Text>
          <Input
            className='form-input'
            placeholder='请输入目的地'
            value={destination}
            onInput={(e) => setDestination(e.detail.value)}
          />
        </View>

        <View className='form-item'>
          <Text className='form-label'>旅行天数</Text>
          <Picker
            mode='selector'
            range={durationOptions}
            rangeKey='label'
            value={durationOptions.findIndex(item => item.value === duration)}
            onChange={(e) => setDuration(durationOptions[e.detail.value].value)}
          >
            <View className='picker-text'>
              {durationOptions.find(item => item.value === duration)?.label || '请选择'}
            </View>
          </Picker>
        </View>

        <View className='form-item'>
          <Text className='form-label'>预算范围</Text>
          <Picker
            mode='selector'
            range={budgetOptions}
            rangeKey='label'
            value={budgetOptions.findIndex(item => item.value === budget)}
            onChange={(e) => setBudget(budgetOptions[e.detail.value].value)}
          >
            <View className='picker-text'>
              {budgetOptions.find(item => item.value === budget)?.label || '请选择'}
            </View>
          </Picker>
        </View>

        <View className='form-item'>
          <Text className='form-label'>旅行风格</Text>
          <Picker
            mode='selector'
            range={styleOptions}
            rangeKey='label'
            value={styleOptions.findIndex(item => item.value === travelStyle)}
            onChange={(e) => setTravelStyle(styleOptions[e.detail.value].value)}
          >
            <View className='picker-text'>
              {styleOptions.find(item => item.value === travelStyle)?.label || '请选择'}
            </View>
          </Picker>
        </View>

        <View className='form-item'>
          <Text className='form-label'>特殊要求</Text>
          <Textarea
            className='form-textarea'
            placeholder='请输入特殊要求或偏好（选填）'
            value={requirements}
            onInput={(e) => setRequirements(e.detail.value)}
            maxlength={500}
          />
        </View>
      </Card>

      <View className='form-actions'>
        <Button
          type='primary'
          size='large'
          block
          loading={loading}
          onClick={handleGenerateGuide}
        >
          {loading ? '生成中...' : '生成攻略'}
        </Button>
      </View>
    </View>
  )

  // 渲染生成的攻略
  const renderGeneratedGuide = () => (
    <View className='generated-guide'>
      <Card title={generatedGuide.title} className='guide-card'>
        <View className='guide-info'>
          <View className='info-item'>
            <Text className='info-label'>目的地：</Text>
            <Text className='info-value'>{generatedGuide.destination}</Text>
          </View>
          <View className='info-item'>
            <Text className='info-label'>天数：</Text>
            <Text className='info-value'>{generatedGuide.duration}天</Text>
          </View>
          <View className='info-item'>
            <Text className='info-label'>预算：</Text>
            <Text className='info-value'>{generatedGuide.budget}元</Text>
          </View>
          <View className='info-item'>
            <Text className='info-label'>风格：</Text>
            <Text className='info-value'>{styleOptions.find(item => item.value === generatedGuide.style)?.label}</Text>
          </View>
        </View>

        <View className='itinerary'>
          <Text className='section-title'>行程安排</Text>
          {generatedGuide.itinerary.map((day, index) => (
            <View key={index} className='day-item'>
              <Text className='day-title'>第{day.day}天：{day.title}</Text>
              <View className='activities'>
                {day.activities.map((activity, actIndex) => (
                  <Text key={actIndex} className='activity'>• {activity}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View className='tips'>
          <Text className='section-title'>温馨提示</Text>
          {generatedGuide.tips.map((tip, index) => (
            <Text key={index} className='tip'>• {tip}</Text>
          ))}
        </View>
      </Card>

      <View className='guide-actions'>
        <Button
          type='secondary'
          size='medium'
          onClick={handleSaveGuide}
        >
          保存攻略
        </Button>
        <Button
          type='primary'
          size='medium'
          onClick={handleShareGuide}
        >
          分享攻略
        </Button>
      </View>
    </View>
  )

  return (
    <View className='guide'>
      <TopNavBar 
        title={guideType === 'create' ? '创建攻略' : '攻略详情'}
        showBack
      />
      
      {loading && <Loading overlay text='正在生成攻略...' />}
      
      <View className='guide-content'>
        {generatedGuide ? renderGeneratedGuide() : renderCreateForm()}
      </View>
    </View>
  )
}

export default Guide