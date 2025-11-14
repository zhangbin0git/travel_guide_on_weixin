import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

/**
 * 按钮组件
 * @param {Object} props - 组件属性
 * @param {string} props.type - 按钮类型：primary, secondary, outline, text
 * @param {string} props.size - 按钮尺寸：small, medium, large
 * @param {boolean} props.disabled - 是否禁用
 * @param {boolean} props.loading - 是否显示加载状态
 * @param {boolean} props.block - 是否块级按钮
 * @param {boolean} props.rounded - 是否圆角按钮
 * @param {string} props.icon - 按钮图标
 * @param {React.ReactNode} props.children - 按钮内容
 * @param {Function} props.onClick - 点击回调
 * @param {string} props.className - 自定义类名
 */
const Button = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  block = false,
  rounded = false,
  icon,
  children,
  onClick,
  className = ''
}) => {
  const buttonClass = [
    'button',
    `button-${type}`,
    `button-${size}`,
    disabled && 'button-disabled',
    loading && 'button-loading',
    block && 'button-block',
    rounded && 'button-rounded',
    className
  ].filter(Boolean).join(' ')

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  return (
    <View 
      className={buttonClass}
      onClick={handleClick}
    >
      {/* 加载状态 */}
      {loading && (
        <View className="button-loading-spinner" />
      )}
      
      {/* 图标 */}
      {icon && !loading && (
        <Text className="button-icon">{icon}</Text>
      )}
      
      {/* 按钮内容 */}
      {children && (
        <Text className="button-text">{children}</Text>
      )}
    </View>
  )
}

export default Button