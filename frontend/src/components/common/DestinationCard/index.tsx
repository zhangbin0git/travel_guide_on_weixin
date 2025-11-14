import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

/**
 * 目的地卡片属性
 */
interface DestinationCardProps {
  /** 目的地数据 */
  destination: {
    id: string
    name: string
    description?: string
    image?: string
    guideCount?: number
    rating?: number
    isHot?: boolean
  }
  /** 点击回调函数 */
  onClick?: (destination: any) => void
  /** 自定义样式类名 */
  className?: string
  /** 是否显示边框 */
  bordered?: boolean
}

/**
 * 目的地卡片组件
 * 用于展示热门目的地信息
 */
const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onClick,
  className = '',
  bordered = true
}) => {
  /**
   * 处理卡片点击
   */
  const handleClick = () => {
    if (onClick) {
      onClick(destination)
    } else {
      // 默认跳转到攻略生成页面
      Taro.navigateTo({
        url: `/pages/guide/create?destination=${encodeURIComponent(destination.name)}`
      })
    }
  }

  /**
   * 处理图片加载错误
   */
  const handleImageError = (e: any) => {
    // 设置默认图片
    e.target.src = 'https://via.placeholder.com/200x120/667eea/ffffff?text=' + encodeURIComponent(destination.name)
  }

  return (
    <View 
      className={`destination-card ${bordered ? 'bordered' : ''} ${className}`}
      onClick={handleClick}
    >
      {/* 目的地图片 */}
      <View className='destination-image-container'>
        <Image
          className='destination-image'
          src={destination.image || `https://via.placeholder.com/200x120/667eea/ffffff?text=${encodeURIComponent(destination.name)}`}
          mode='aspectFill'
          onError={handleImageError}
        />
        {destination.isHot && (
          <View className='hot-badge'>
            <Text className='hot-text'>HOT</Text>
          </View>
        )}
      </View>

      {/* 目的地信息 */}
      <View className='destination-info'>
        <View className='destination-header'>
          <Text className='destination-name'>{destination.name}</Text>
          {destination.rating && (
            <View className='rating'>
              <Text className='rating-star'>⭐</Text>
              <Text className='rating-value'>{destination.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        {destination.description && (
          <Text className='destination-description'>{destination.description}</Text>
        )}

        <View className='destination-meta'>
          {destination.guideCount && (
            <View className='guide-count'>
              <Text className='meta-icon'>📖</Text>
              <Text className='meta-text'>{destination.guideCount}个攻略</Text>
            </View>
          )}
          <View className='action-hint'>
            <Text className='hint-text'>点击查看攻略 →</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DestinationCard