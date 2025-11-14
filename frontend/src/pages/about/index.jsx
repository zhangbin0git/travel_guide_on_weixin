import React from 'react'
import { View, Text } from '@tarojs/components'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const About = () => {
  const router = useRouter()

  return (
    <View className='about'>
      <TopNavBar title='关于我们' />
      
      <View className='about-content'>
        {/* 应用信息 */}
        <Card className='app-info'>
          <View className='app-logo'>
            <Text className='logo-text'>🗺️</Text>
          </View>
          <Text className='app-name'>旅行攻略</Text>
          <Text className='app-version'>版本 1.0.0</Text>
          <Text className='app-desc'>
            智能旅行攻略助手，基于高德地图数据和AI技术，为您提供个性化的旅行建议和路线规划。
          </Text>
        </Card>

        {/* 功能特色 */}
        <Card title='功能特色' className='features'>
          <View className='feature-item'>
            <Text className='feature-icon'>🎯</Text>
            <Text className='feature-text'>智能路线规划</Text>
          </View>
          <View className='feature-item'>
            <Text className='feature-icon'>📍</Text>
            <Text className='feature-text'>精准位置服务</Text>
          </View>
          <View className='feature-item'>
            <Text className='feature-icon'>🤖</Text>
            <Text className='feature-text'>AI智能推荐</Text>
          </View>
          <View className='feature-item'>
            <Text className='feature-icon'>📱</Text>
            <Text className='feature-text'>移动端优化体验</Text>
          </View>
        </Card>

        {/* 技术支持 */}
        <Card title='技术支持' className='tech-support'>
          <View className='support-item'>
            <Text className='support-label'>地图服务：</Text>
            <Text className='support-value'>高德地图API</Text>
          </View>
          <View className='support-item'>
            <Text className='support-label'>AI服务：</Text>
            <Text className='support-value'>千问大模型</Text>
          </View>
          <View className='support-item'>
            <Text className='support-label'>开发框架：</Text>
            <Text className='support-value'>Taro + React</Text>
          </View>
        </Card>

        {/* 联系我们 */}
        <Card title='联系我们' className='contact'>
          <View className='contact-item'>
            <Text className='contact-label'>邮箱：</Text>
            <Text className='contact-value'>support@travel-guide.com</Text>
          </View>
          <View className='contact-item'>
            <Text className='contact-label'>官网：</Text>
            <Text className='contact-value'>www.travel-guide.com</Text>
          </View>
        </Card>

        {/* 版权信息 */}
        <View className='copyright'>
          <Text className='copyright-text'>© 2024 旅行攻略 版权所有</Text>
        </View>
      </View>
    </View>
  )
}

export default About