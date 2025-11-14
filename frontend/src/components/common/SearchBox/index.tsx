import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

/**
 * 搜索框组件属性
 */
interface SearchBoxProps {
  /** 占位符文本 */
  placeholder?: string
  /** 搜索回调函数 */
  onSearch: (keyword: string) => void
  /** 是否显示搜索建议 */
  showSuggestions?: boolean
  /** 自定义样式类名 */
  className?: string
}

/**
 * 搜索框组件
 * 提供搜索输入、历史记录和建议功能
 */
const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = '想去哪里？输入目的地、日期、兴趣偏好',
  onSearch,
  showSuggestions = true,
  className = ''
}) => {
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false)
  const [showHistoryPanel, setShowHistoryPanel] = useState(false)
  const inputRef = useRef<any>(null)

  // 搜索建议数据
  const suggestionData = [
    '北京', '上海', '广州', '深圳', '杭州', '成都', '西安', '重庆',
    '三亚', '厦门', '青岛', '大连', '丽江', '桂林', '黄山', '九寨沟',
    '三日游', '周末游', '亲子游', '情侣游', '美食之旅', '文化之旅',
    '海边度假', '山地探险', '城市观光', '古镇游览'
  ]

  /**
   * 初始化加载搜索历史
   */
  useEffect(() => {
    loadSearchHistory()
  }, [])

  /**
   * 加载搜索历史
   */
  const loadSearchHistory = () => {
    try {
      const savedHistory = Taro.getStorageSync('search_history') || []
      setHistory(savedHistory)
    } catch (error) {
      console.error('加载搜索历史失败:', error)
    }
  }

  /**
   * 保存搜索历史
   */
  const saveSearchHistory = (searchKeyword: string) => {
    try {
      const newHistory = [searchKeyword, ...history.filter(item => item !== searchKeyword)].slice(0, 10)
      setHistory(newHistory)
      Taro.setStorageSync('search_history', newHistory)
    } catch (error) {
      console.error('保存搜索历史失败:', error)
    }
  }

  /**
   * 处理输入变化
   */
  const handleInput = (e: any) => {
    const value = e.detail.value
    setKeyword(value)
    
    if (value.trim()) {
      // 显示搜索建议
      const filteredSuggestions = suggestionData.filter(item => 
        item.includes(value.trim())
      ).slice(0, 8)
      setSuggestions(filteredSuggestions)
      setShowSuggestionsPanel(true)
      setShowHistoryPanel(false)
    } else {
      // 显示搜索历史
      setShowSuggestionsPanel(false)
      setShowHistoryPanel(history.length > 0)
    }
  }

  /**
   * 处理搜索确认
   */
  const handleConfirm = () => {
    const trimmedKeyword = keyword.trim()
    if (trimmedKeyword) {
      saveSearchHistory(trimmedKeyword)
      onSearch(trimmedKeyword)
      hidePanels()
    }
  }

  /**
   * 处理建议项点击
   */
  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion)
    saveSearchHistory(suggestion)
    onSearch(suggestion)
    hidePanels()
  }

  /**
   * 处理历史项点击
   */
  const handleHistoryClick = (historyItem: string) => {
    setKeyword(historyItem)
    onSearch(historyItem)
    hidePanels()
  }

  /**
   * 清空搜索历史
   */
  const clearHistory = () => {
    setHistory([])
    Taro.removeStorageSync('search_history')
    setShowHistoryPanel(false)
  }

  /**
   * 隐藏所有面板
   */
  const hidePanels = () => {
    setShowSuggestionsPanel(false)
    setShowHistoryPanel(false)
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  /**
   * 处理输入框聚焦
   */
  const handleFocus = () => {
    if (keyword.trim()) {
      setShowSuggestionsPanel(true)
    } else {
      setShowHistoryPanel(history.length > 0)
    }
  }

  /**
   * 处理输入框失焦
   */
  const handleBlur = () => {
    // 延迟隐藏面板，以便点击事件能够触发
    setTimeout(() => {
      hidePanels()
    }, 200)
  }

  return (
    <View className={`search-box ${className}`}>
      <View className='search-input-wrapper'>
        <View className='search-icon'>🔍</View>
        <Input
          ref={inputRef}
          className='search-input'
          placeholder={placeholder}
          value={keyword}
          onInput={handleInput}
          onConfirm={handleConfirm}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {keyword && (
          <View 
            className='clear-icon'
            onClick={() => {
              setKeyword('')
              setShowSuggestionsPanel(false)
              setShowHistoryPanel(history.length > 0)
            }}
          >
            ✕
          </View>
        )}
      </View>

      {/* 搜索建议面板 */}
      {showSuggestions && showSuggestionsPanel && suggestions.length > 0 && (
        <View className='suggestions-panel'>
          <ScrollView scrollY className='suggestions-list'>
            {suggestions.map((suggestion, index) => (
              <View 
                key={index}
                className='suggestion-item'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <View className='suggestion-icon'>🔍</View>
                <Text className='suggestion-text'>{suggestion}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* 搜索历史面板 */}
      {showHistoryPanel && history.length > 0 && (
        <View className='history-panel'>
          <View className='history-header'>
            <Text className='history-title'>搜索历史</Text>
            <Text className='history-clear' onClick={clearHistory}>清空</Text>
          </View>
          <ScrollView scrollY className='history-list'>
            {history.map((item, index) => (
              <View 
                key={index}
                className='history-item'
                onClick={() => handleHistoryClick(item)}
              >
                <View className='history-icon'>🕐</View>
                <Text className='history-text'>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default SearchBox