import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

/**
 * 通用卡片组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 卡片内容
 * @param {string} props.title - 卡片标题
 * @param {string} props.subtitle - 卡片副标题
 * @param {string} props.image - 卡片图片
 * @param {string} props.imageMode - 图片显示模式
 * @param {boolean} props.shadow - 是否显示阴影
 * @param {boolean} props.bordered - 是否显示边框
 * @param {string} padding - 内边距大小
 * @param {boolean} props.clickable - 是否可点击
 * @param {Function} props.onClick - 点击回调
 * @param {string} props.className - 自定义类名
 */
const Card = ({
  children,
  title,
  subtitle,
  image,
  imageMode = 'aspectFill',
  shadow = true,
  bordered = false,
  padding = 'medium',
  clickable = false,
  onClick,
  className = ''
}) => {
  const cardClass = [
    'card',
    shadow && 'card-shadow',
    bordered && 'card-bordered',
    clickable && 'card-clickable',
    `card-padding-${padding}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <View 
      className={cardClass}
      onClick={clickable ? onClick : undefined}
    >
      {/* 卡片图片 */}
      {image && (
        <View className="card-image">
          <Image
            className="card-image-content"
            src={image}
            mode={imageMode}
          />
        </View>
      )}
      
      {/* 卡片内容区域 */}
      <View className="card-content">
        {/* 标题区域 */}
        {(title || subtitle) && (
          <View className="card-header">
            {title && (
              <Text className="card-title">{title}</Text>
            )}
            {subtitle && (
              <Text className="card-subtitle">{subtitle}</Text>
            )}
          </View>
        )}
        
        {/* 主要内容 */}
        {children && (
          <View className="card-body">
            {children}
          </View>
        )}
      </View>
    </View>
  )
}

export default Card