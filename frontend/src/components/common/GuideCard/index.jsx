import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

/**
 * 攻略卡片组件
 * @param {string} id - 攻略ID
 * @param {string} title - 攻略标题
 * @param {string} image - 攻略封面图
 * @param {number} days - 旅行天数
 * @param {string} targetAudience - 适合人群
 * @param {number} rating - 评分
 * @param {number} favoriteCount - 收藏数
 * @param {function} onClick - 点击回调
 * @param {function} onShare - 分享回调
 * @param {function} onFavorite - 收藏回调
 * @param {boolean} isFavorited - 是否已收藏
 * @param {string} className - 自定义类名
 */
const GuideCard = ({
  id,
  title,
  image,
  days = 0,
  targetAudience = '',
  rating = 0,
  favoriteCount = 0,
  onClick,
  onShare,
  onFavorite,
  isFavorited = false,
  className = ''
}) => {
  const handleClick = () => {
    onClick?.({ id, title, image, days, targetAudience, rating, favoriteCount })
  }

  const handleShare = (e) => {
    e.stopPropagation()
    onShare?.({ id, title })
  }

  const handleFavorite = (e) => {
    e.stopPropagation()
    onFavorite?.({ id, title, isFavorited })
  }

  // 生成评分星星
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <AtIcon key={`full-${i}`} value='star' size='12' color='#ffc107' />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <AtIcon key='half' value='star' size='12' color='#ffc107' />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <AtIcon key={`empty-${i}`} value='star' size='12' color='#e0e0e0' />
      )
    }

    return stars
  }

  return (
    <View className={`guide-card ${className}`} onClick={handleClick}>
      {/* 攻略封面图 */}
      <View className='card-image-wrapper'>
        <Image
          className='card-image'
          src={image || '/assets/images/default-guide.jpg'}
          mode='aspectFill'
          lazyLoad
        />
        <View className='image-overlay'>
          <View className='days-badge'>
            <AtIcon value='calendar' size='12' color='#fff' />
            <Text className='days-text'>{days}天</Text>
          </View>
        </View>
      </View>

      {/* 卡片内容 */}
      <View className='card-content'>
        {/* 攻略标题 */}
        <Text className='guide-title'>{title}</Text>

        {/* 适合人群 */}
        {targetAudience && (
          <View className='target-audience'>
            <AtIcon value='users' size='12' color='#999' />
            <Text className='audience-text'>{targetAudience}</Text>
          </View>
        )}

        {/* 评分和收藏 */}
        <View className='card-stats'>
          <View className='rating'>
            <View className='stars'>
              {renderStars(rating)}
            </View>
            <Text className='rating-text'>{rating.toFixed(1)}</Text>
          </View>

          <View className='favorite-count'>
            <AtIcon value='heart' size='12' color='#ff6b6b' />
            <Text className='count-text'>{favoriteCount}</Text>
          </View>
        </View>

        {/* 操作按钮 */}
        <View className='card-actions'>
          <View className='action-btn share-btn' onClick={handleShare}>
            <AtIcon value='share' size='14' color='#666' />
            <Text className='action-text'>分享</Text>
          </View>
          
          <View 
            className={`action-btn favorite-btn ${isFavorited ? 'favorited' : ''}`} 
            onClick={handleFavorite}
          >
            <AtIcon 
              value={isFavorited ? 'heart' : 'heart'} 
              size='14' 
              color={isFavorited ? '#ff6b6b' : '#666'} 
            />
            <Text className='action-text'>{isFavorited ? '已收藏' : '收藏'}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default GuideCard