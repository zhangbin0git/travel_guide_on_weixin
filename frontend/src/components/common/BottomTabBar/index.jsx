import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { switchTab } from '@tarojs/taro'
import './index.scss'

/**
 * 底部导航栏组件
 * @param {Object} props - 组件属性
 * @param {Array} props.tabs - 导航项配置数组
 * @param {string} props.activeTab - 当前激活的导航项
 * @param {Function} props.onTabChange - 导航切换回调
 */
const BottomTabBar = ({
  tabs = [],
  activeTab = '',
  onTabChange
}) => {
  // 处理导航项点击
  const handleTabClick = (tab) => {
    if (tab.path !== activeTab) {
      if (onTabChange) {
        onTabChange(tab)
      }
      // 切换到对应页面
      switchTab({
        url: tab.path
      })
    }
  }

  return (
    <View className="bottom-tab-bar">
      {tabs.map((tab, index) => {
        const isActive = tab.path === activeTab
        return (
          <View
            key={index}
            className={`tab-item ${isActive ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            <View className="tab-icon">
              <Image
                className="icon-image"
                src={isActive ? tab.selectedIconPath : tab.iconPath}
                mode="aspectFit"
              />
            </View>
            <Text className={`tab-text ${isActive ? 'active' : ''}`}>
              {tab.text}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

export default BottomTabBar