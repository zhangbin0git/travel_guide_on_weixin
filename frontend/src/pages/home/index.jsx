import React, { Component } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtIcon, AtActivityIndicator, AtToast } from 'taro-ui'
import Taro from '@tarojs/taro'

// 导入组件
import SearchBox from '../../components/common/SearchBox/index.jsx'
import DestinationCard from '../../components/common/DestinationCard/index.jsx'
import GuideCard from '../../components/common/GuideCard/index.jsx'

// 导入服务
import { getHotDestinations, getFeaturedGuides, getSearchSuggestions } from '../../services/home'

// 导入工具
import storage from '../../utils/storage'

import './index.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 搜索相关
      searchValue: '',
      searchHistory: [],
      searchSuggestions: [],
      showSearchHistory: false,
      
      // 数据相关
      hotDestinations: [],
      featuredGuides: [],
      
      // 状态相关
      loading: false,
      refreshing: false,
      error: false,
      errorMessage: ''
    }
  }

  componentWillMount() {
    // 加载搜索历史
    this.loadSearchHistory()
  }

  componentDidMount() {
    // 初始化数据
    this.initPageData()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 加载搜索历史
   */
  loadSearchHistory = async () => {
    try {
      const history = await storage.get('searchHistory') || []
      this.setState({ searchHistory: history.slice(0, 10) }) // 只显示最近10条
    } catch (error) {
      console.error('加载搜索历史失败:', error)
    }
  }

  /**
   * 保存搜索历史
   */
  saveSearchHistory = async (keyword) => {
    try {
      const { searchHistory } = this.state
      const newHistory = [keyword, ...searchHistory.filter(item => item !== keyword)].slice(0, 20)
      await storage.set('searchHistory', newHistory)
      this.setState({ searchHistory: newHistory.slice(0, 10) })
    } catch (error) {
      console.error('保存搜索历史失败:', error)
    }
  }

  /**
   * 初始化页面数据
   */
  initPageData = async () => {
    this.setState({ loading: true, error: false })
    
    try {
      // 并行请求热门目的地和精选攻略
      const [destinationsRes, guidesRes] = await Promise.all([
        getHotDestinations(),
        getFeaturedGuides()
      ])

      if (destinationsRes.code === 200 && guidesRes.code === 200) {
        this.setState({
          hotDestinations: destinationsRes.data,
          featuredGuides: guidesRes.data,
          loading: false
        })
      } else {
        throw new Error('数据加载失败')
      }
    } catch (error) {
      console.error('初始化页面数据失败:', error)
      this.setState({
        loading: false,
        error: true,
        errorMessage: '数据加载失败，请重试'
      })
    }
  }

  /**
   * 下拉刷新
   */
  handleRefresh = async () => {
    this.setState({ refreshing: true })
    
    try {
      await this.initPageData()
      this.setState({ refreshing: false })
    } catch (error) {
      this.setState({ refreshing: false })
      Taro.showToast({
        title: '刷新失败',
        icon: 'none'
      })
    }
  }

  /**
   * 搜索输入变化
   */
  handleSearchChange = async (value) => {
    this.setState({ searchValue: value })
    
    // 获取搜索建议
    if (value.trim()) {
      try {
        const res = await getSearchSuggestions(value.trim())
        if (res.code === 200) {
          this.setState({ searchSuggestions: res.data })
        }
      } catch (error) {
        console.error('获取搜索建议失败:', error)
      }
    } else {
      this.setState({ searchSuggestions: [] })
    }
  }

  /**
   * 搜索框聚焦
   */
  handleSearchFocus = () => {
    this.setState({ showSearchHistory: true })
  }

  /**
   * 搜索框失焦
   */
  handleSearchBlur = () => {
    // 延迟隐藏，避免点击事件被阻断
    setTimeout(() => {
      this.setState({ showSearchHistory: false })
    }, 200)
  }

  /**
   * 执行搜索
   */
  handleSearch = (keyword) => {
    const searchKeyword = keyword || this.state.searchValue.trim()
    if (!searchKeyword) return

    // 保存搜索历史
    this.saveSearchHistory(searchKeyword)
    
    // 跳转到搜索页面（使用switchTab，因为搜索页面是tabBar页面）
    Taro.switchTab({
      url: `/pages/search/index`
    }).then(() => {
      // 由于switchTab不支持传递参数，这里使用全局状态或本地存储传递搜索关键词
      Taro.setStorageSync('searchKeyword', searchKeyword)
    })
  }

  /**
   * 点击搜索历史
   */
  handleHistoryClick = (keyword) => {
    this.setState({ searchValue: keyword })
    this.handleSearch(keyword)
  }

  /**
   * 点击搜索建议
   */
  handleSuggestionClick = (suggestion) => {
    this.setState({ searchValue: suggestion })
    this.handleSearch(suggestion)
  }

  /**
   * 目的地卡片点击
   */
  handleDestinationClick = (destination) => {
    // 跳转到搜索页面（使用switchTab，因为搜索页面是tabBar页面）
    Taro.switchTab({
      url: `/pages/search/index`
    }).then(() => {
      // 使用本地存储传递目的地参数
      Taro.setStorageSync('searchDestination', destination.name)
    })
  }

  /**
   * 攻略卡片点击
   */
  handleGuideClick = (guide) => {
    // 跳转到攻略详情页面（使用switchTab，因为攻略页面是tabBar页面）
    Taro.switchTab({
      url: `/pages/guide/index`
    }).then(() => {
      // 使用本地存储传递攻略ID
      Taro.setStorageSync('guideId', guide.id)
    })
  }

  /**
   * 攻略分享
   */
  handleGuideShare = (guide) => {
    // 显示分享菜单
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    }).then(() => {
      // 设置分享内容
      Taro.onShareAppMessage(() => {
        return {
          title: guide.title,
          path: `/pages/guide/index?id=${guide.id}`,
          imageUrl: guide.image
        }
      })
    })
  }

  /**
   * 攻略收藏
   */
  handleGuideFavorite = async (guide) => {
    try {
      const { featuredGuides } = this.state
      const updatedGuides = featuredGuides.map(item => 
        item.id === guide.id 
          ? { ...item, isFavorited: !guide.isFavorited, favoriteCount: guide.isFavorited ? item.favoriteCount - 1 : item.favoriteCount + 1 }
          : item
      )
      
      this.setState({ featuredGuides: updatedGuides })
      
      Taro.showToast({
        title: guide.isFavorited ? '取消收藏' : '收藏成功',
        icon: 'success'
      })
    } catch (error) {
      console.error('收藏操作失败:', error)
      Taro.showToast({
        title: '操作失败',
        icon: 'none'
      })
    }
  }

  render() {
    const {
      searchValue,
      searchHistory,
      searchSuggestions,
      showSearchHistory,
      hotDestinations,
      featuredGuides,
      loading,
      refreshing,
      error,
      errorMessage
    } = this.state

    return (
      <View className='home'>
        {/* 顶部栏 */}
        <View className='home-header'>
          <View className='header-content'>
            <Text className='app-title'>旅行攻略</Text>
            <View className='header-actions'>
              <AtIcon 
                value='bell' 
                size='20' 
                color='#333'
                className='header-icon'
                onClick={() => Taro.navigateTo({ url: '/pages/notifications/index' })}
              />
              <AtIcon 
                value='user' 
                size='20' 
                color='#333'
                className='header-icon'
                onClick={() => Taro.switchTab({ url: '/pages/profile/index' })}
              />
            </View>
          </View>
        </View>

        {/* 搜索框 */}
        <View className='search-section'>
          <SearchBox
            value={searchValue}
            onChange={this.handleSearchChange}
            onFocus={this.handleSearchFocus}
            onBlur={this.handleSearchBlur}
            onSearch={this.handleSearch}
            showHistory={showSearchHistory && searchHistory.length > 0}
            historyList={searchHistory}
            suggestions={searchSuggestions}
            onHistoryItemClick={this.handleHistoryClick}
            onSuggestionClick={this.handleSuggestionClick}
          />
        </View>

        {/* 内容区域 */}
        <ScrollView
          className='content-scroll'
          scrollY
          refresherEnabled
          refresherTriggered={refreshing}
          onRefresherRefresh={this.handleRefresh}
        >
          {/* 加载状态 */}
          {loading && (
            <View className='loading-container'>
              <AtActivityIndicator mode='center' content='加载中...' />
            </View>
          )}

          {/* 错误状态 */}
          {error && !loading && (
            <View className='error-container'>
              <AtIcon value='close-circle' size='48' color='#ff6b6b' />
              <Text className='error-message'>{errorMessage}</Text>
              <View className='retry-btn' onClick={this.initPageData}>
                <Text className='retry-text'>重试</Text>
              </View>
            </View>
          )}

          {/* 正常内容 */}
          {!loading && !error && (
            <>
              {/* 热门目的地 */}
              <View className='section'>
                <View className='section-header'>
                  <Text className='section-title'>热门目的地</Text>
                  <Text className='section-more' onClick={() => Taro.navigateTo({ url: '/pages/destinations/index' })}>
                    查看更多
                    <AtIcon value='chevron-right' size='14' color='#999' />
                  </Text>
                </View>
                <View className='destinations-grid'>
                  {hotDestinations.map((destination, index) => (
                    <DestinationCard
                      key={destination.id || index}
                      name={destination.name}
                      image={destination.image}
                      guideCount={destination.guideCount}
                      onClick={this.handleDestinationClick}
                    />
                  ))}
                </View>
              </View>

              {/* 精选攻略 */}
              <View className='section'>
                <View className='section-header'>
                  <Text className='section-title'>精选攻略</Text>
                  <Text className='section-more' onClick={() => Taro.switchTab({ url: '/pages/guide/index' })}>
                    查看更多
                    <AtIcon value='chevron-right' size='14' color='#999' />
                  </Text>
                </View>
                <View className='guides-list'>
                  {featuredGuides.map((guide, index) => (
                    <GuideCard
                      key={guide.id || index}
                      id={guide.id}
                      title={guide.title}
                      image={guide.image}
                      days={guide.days}
                      targetAudience={guide.targetAudience}
                      rating={guide.rating}
                      favoriteCount={guide.favoriteCount}
                      isFavorited={guide.isFavorited}
                      onClick={this.handleGuideClick}
                      onShare={this.handleGuideShare}
                      onFavorite={this.handleGuideFavorite}
                    />
                  ))}
                </View>
              </View>
            </>
          )}

          {/* 底部间距 */}
          <View className='bottom-spacer' />
        </ScrollView>

        {/* Toast提示 */}
        <AtToast isOpen={error} text={errorMessage} status='error' />
      </View>
    )
  }
}