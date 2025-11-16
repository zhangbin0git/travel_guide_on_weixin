import React, { useState, useEffect } from 'react'
import { View, Input, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

/**
 * 搜索框组件
 * @param {string} placeholder - 占位符文本
 * @param {string} value - 输入值
 * @param {function} onChange - 输入变化回调
 * @param {function} onFocus - 聚焦回调
 * @param {function} onBlur - 失焦回调
 * @param {function} onSearch - 搜索回调
 * @param {boolean} showHistory - 是否显示搜索历史
 * @param {array} historyList - 搜索历史列表
 * @param {array} suggestions - 搜索建议列表
 * @param {function} onHistoryItemClick - 历史记录点击回调
 * @param {function} onSuggestionClick - 建议点击回调
 */
const SearchBox = ({
  placeholder = '想去哪里？输入目的地、日期、兴趣偏好',
  value = '',
  onChange,
  onFocus,
  onBlur,
  onSearch,
  showHistory = false,
  historyList = [],
  suggestions = [],
  onHistoryItemClick,
  onSuggestionClick
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // 处理输入变化
  const handleInputChange = (e) => {
    const inputValue = e.detail.value
    onChange?.(inputValue)
    
    // 显示搜索建议
    if (inputValue.trim()) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  // 处理聚焦
  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
    if (value.trim() === '') {
      setShowSuggestions(false)
    }
  }

  // 处理失焦
  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur?.(e)
    // 延迟隐藏建议，避免点击事件被阻断
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  // 处理搜索确认
  const handleConfirm = (e) => {
    const searchValue = e.detail.value.trim()
    if (searchValue) {
      onSearch?.(searchValue)
      setShowSuggestions(false)
    }
  }

  // 处理历史记录点击
  const handleHistoryClick = (item) => {
    onHistoryItemClick?.(item)
    setShowSuggestions(false)
  }

  // 处理建议点击
  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick?.(suggestion)
    setShowSuggestions(false)
  }

  return (
    <View className='search-box'>
      {/* 搜索输入框 */}
      <View className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
        <AtIcon 
          value='search' 
          size='16' 
          color='#999'
          className='search-icon'
        />
        <Input
          className='search-input'
          placeholder={placeholder}
          value={value}
          onInput={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onConfirm={handleConfirm}
          confirmType='search'
        />
        {value && (
          <AtIcon
            value='close-circle'
            size='16'
            color='#999'
            className='clear-icon'
            onClick={() => {
              onChange?.('')
              setShowSuggestions(false)
            }}
          />
        )}
      </View>

      {/* 搜索建议 */}
      {showSuggestions && suggestions.length > 0 && (
        <View className='suggestions-list'>
          {suggestions.map((suggestion, index) => (
            <View
              key={index}
              className='suggestion-item'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <AtIcon value='search' size='14' color='#999' />
              <Text className='suggestion-text'>{suggestion}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 搜索历史 */}
      {showHistory && !value && historyList.length > 0 && (
        <View className='history-section'>
          <View className='history-header'>
            <Text className='history-title'>搜索历史</Text>
            <Text className='history-clear'>清空</Text>
          </View>
          <View className='history-list'>
            {historyList.map((item, index) => (
              <View
                key={index}
                className='history-item'
                onClick={() => handleHistoryClick(item)}
              >
                <AtIcon value='clock' size='14' color='#999' />
                <Text className='history-text'>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}

export default SearchBox