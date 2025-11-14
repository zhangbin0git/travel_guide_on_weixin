import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

/**
 * 加载组件
 * @param {Object} props - 组件属性
 * @param {string} props.type - 加载类型：spinner, dots, pulse
 * @param {string} props.size - 加载尺寸：small, medium, large
 * @param {string} props.color - 加载颜色
 * @param {string} props.text - 加载文本
 * @param {boolean} props.overlay - 是否显示遮罩层
 * @param {string} props.className - 自定义类名
 */
const Loading = ({
  type = 'spinner',
  size = 'medium',
  color = '#ff6b6b',
  text = '加载中...',
  overlay = false,
  className = ''
}) => {
  const loadingClass = [
    'loading',
    `loading-${type}`,
    `loading-${size}`,
    overlay && 'loading-overlay',
    className
  ].filter(Boolean).join(' ')

  const renderSpinner = () => (
    <View 
      className="loading-spinner"
      style={{ borderTopColor: color }}
    />
  )

  const renderDots = () => (
    <View className="loading-dots">
      <View 
        className="loading-dot"
        style={{ backgroundColor: color }}
      />
      <View 
        className="loading-dot"
        style={{ backgroundColor: color }}
      />
      <View 
        className="loading-dot"
        style={{ backgroundColor: color }}
      />
    </View>
  )

  const renderPulse = () => (
    <View className="loading-pulse">
      <View 
        className="loading-pulse-dot"
        style={{ backgroundColor: color }}
      />
    </View>
  )

  const renderLoadingIcon = () => {
    switch (type) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'spinner':
      default:
        return renderSpinner()
    }
  }

  return (
    <View className={loadingClass}>
      {renderLoadingIcon()}
      {text && (
        <Text className="loading-text" style={{ color }}>
          {text}
        </Text>
      )}
    </View>
  )
}

export default Loading