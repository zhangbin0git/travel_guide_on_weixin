import React from 'react'
import { View, Text } from '@tarojs/components'
import { navigateBack } from '@tarojs/taro'
import './index.scss'

/**
 * 顶部导航栏组件
 * @param {Object} props - 组件属性
 * @param {string} props.title - 导航栏标题
 * @param {boolean} props.showBack - 是否显示返回按钮
 * @param {Function} props.onBack - 返回按钮点击回调
 * @param {React.ReactNode} props.rightContent - 右侧内容区域
 * @param {string} props.backgroundColor - 背景颜色
 * @param {string} props.color - 文字颜色
 */
const TopNavBar = ({
  title = '',
  showBack = false,
  onBack,
  rightContent = null,
  backgroundColor = '#ffffff',
  color = '#333333'
}) => {
  // 处理返回按钮点击
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigateBack()
    }
  }

  return (
    <View 
      className="top-nav-bar"
      style={{ backgroundColor, color }}
    >
      <View className="nav-content">
        {/* 左侧返回按钮区域 */}
        <View className="nav-left">
          {showBack && (
            <View className="back-button" onClick={handleBack}>
              <Text className="back-icon">‹</Text>
            </View>
          )}
        </View>

        {/* 中间标题区域 */}
        <View className="nav-center">
          <Text className="nav-title">{title}</Text>
        </View>

        {/* 右侧内容区域 */}
        <View className="nav-right">
          {rightContent}
        </View>
      </View>
    </View>
  )
}

export default TopNavBar