import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

/**
 * 目的地卡片组件
 * @param {string} name - 目的地名称
 * @param {string} image - 目的地图片
 * @param {number} guideCount - 攻略数量
 * @param {function} onClick - 点击回调
 * @param {string} className - 自定义类名
 */
const DestinationCard = ({
  name,
  image,
  guideCount = 0,
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    onClick?.({ name, image, guideCount })
  }

  return (
    <View className={`destination-card ${className}`} onClick={handleClick}>
      {/* 目的地图片 */}
      <View className='card-image-wrapper'>
        <Image
          className='card-image'
          src={image || '/assets/images/default-destination.jpg'}
          mode='aspectFill'
          lazyLoad
        />
        <View className='image-overlay'>
          <Text className='destination-name'>{name}</Text>
        </View>
      </View>

      {/* 卡片内容 */}
      <View className='card-content'>
        <View className='destination-info'>
          <Text className='destination-title'>{name}</Text>
          <View className='guide-count'>
            <AtIcon value='file-text' size='12' color='#999' />
            <Text className='count-text'>{guideCount}篇攻略</Text>
          </View>
        </View>
        
        <View className='card-action'>
          <Text className='action-text'>探索</Text>
          <AtIcon value='chevron-right' size='14' color='#ff6b6b' />
        </View>
      </View>
    </View>
  )
}

export default DestinationCard