import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

/**
 * 攻略卡片属性
 */
interface GuideCardProps {
  /** 攻略数据 */
  guide: {
    id: string
    title: string
    description?: string
    image?: string
    author?: string
    authorAvatar?: string
    duration?: string
    tags?: string[]
    rating?: number
    viewCount?: number
    likeCount?: number
    createdAt?: string
    isRecommended?: boolean
  }
  /** 点击回调函数 */
  onClick?: (guide: any) => void
  /** 自定义样式类名 */
  className?: string
  /** 是否显示边框 */
  bordered?: boolean
  /** 布局模式：default | compact */
  layout?: 'default' | 'compact'
}

/**
 * 攻略卡片组件
 * 用于展示精选攻略信息
 */
const GuideCard: React.FC<GuideCardProps> = ({
  guide,
  onClick,
  className = '',
  bordered = true,
  layout = 'default'
}) => {
  /**
   * 处理卡片点击
   */
  const handleClick = () => {
    if (onClick) {
      onClick(guide)
    } else {
      // 默认跳转到攻略详情页面
      Taro.navigateTo({
        url: `/pages/guide/detail?id=${guide.id}&title=${encodeURIComponent(guide.title)}`
      })
    }
  }

  /**
   * 处理图片加载错误
   */
  const handleImageError = (e: any) => {
    // 设置默认图片
    e.target.src = 'https://via.placeholder.com/300x180/667eea/ffffff?text=攻略'
  }

  /**
   * 格式化浏览量
   */
  const formatViewCount = (count: number) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + 'w'
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k'
    }
    return count.toString()
  }

  /**
   * 格式化创建时间
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return '今天'
    } else if (days === 1) {
      return '昨天'
    } else if (days < 7) {
      return `${days}天前`
    } else if (days < 30) {
      return `${Math.floor(days / 7)}周前`
    } else {
      return `${Math.floor(days / 30)}个月前`
    }
  }

  return (
    <View 
      className={`guide-card ${layout} ${bordered ? 'bordered' : ''} ${className}`}
      onClick={handleClick}
    >
      {/* 推荐标签 */}
      {guide.isRecommended && (
        <View className='recommended-badge'>
          <Text className='recommended-text'>推荐</Text>
        </View>
      )}

      {/* 攻略图片 */}
      <View className='guide-image-container'>
        <Image
          className='guide-image'
          src={guide.image || 'https://via.placeholder.com/300x180/667eea/ffffff?text=攻略'}
          mode='aspectFill'
          onError={handleImageError}
        />
        {guide.duration && (
          <View className='duration-badge'>
            <Text className='duration-text'>{guide.duration}</Text>
          </View>
        )}
      </View>

      {/* 攻略信息 */}
      <View className='guide-info'>
        {/* 标题 */}
        <Text className='guide-title'>{guide.title}</Text>

        {/* 描述 */}
        {guide.description && (
          <Text className='guide-description'>{guide.description}</Text>
        )}

        {/* 标签 */}
        {guide.tags && guide.tags.length > 0 && (
          <View className='guide-tags'>
            {guide.tags.slice(0, 3).map((tag, index) => (
              <View key={index} className='tag'>
                <Text className='tag-text'>{tag}</Text>
              </View>
            ))}
            {guide.tags.length > 3 && (
              <View className='tag more'>
                <Text className='tag-text'>+{guide.tags.length - 3}</Text>
              </View>
            )}
          </View>
        )}

        {/* 作者和统计信息 */}
        <View className='guide-meta'>
          <View className='author-info'>
            <Image
              className='author-avatar'
              src={guide.authorAvatar || 'https://via.placeholder.com/32x32/cccccc/ffffff?text=U'}
              mode='aspectFill'
            />
            <Text className='author-name'>{guide.author || '匿名用户'}</Text>
            {guide.createdAt && (
              <Text className='create-time'>{formatDate(guide.createdAt)}</Text>
            )}
          </View>

          <View className='stats-info'>
            {guide.rating && (
              <View className='rating'>
                <Text className='rating-star'>⭐</Text>
                <Text className='rating-value'>{guide.rating.toFixed(1)}</Text>
              </View>
            )}
            {guide.viewCount && (
              <View className='view-count'>
                <Text className='view-icon'>👁</Text>
                <Text className='view-text'>{formatViewCount(guide.viewCount)}</Text>
              </View>
            )}
            {guide.likeCount && (
              <View className='like-count'>
                <Text className='like-icon'>❤️</Text>
                <Text className='like-text'>{formatViewCount(guide.likeCount)}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default GuideCard