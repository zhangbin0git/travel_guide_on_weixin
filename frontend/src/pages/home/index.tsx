import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { DestinationService } from '../../services/destination'
import { GuideService } from '../../services/guide'
import SearchBox from '../../components/common/SearchBox'
import DestinationCard from '../../components/common/DestinationCard'
import GuideCard from '../../components/common/GuideCard'
import Loading from '../../components/common/Loading'
import { Destination, Guide } from '../../types'
import './index.scss'

interface HomeState {
  hotDestinations: Destination[]
  featuredGuides: Guide[]
  loading: boolean
  error: string | null
  banners: Array<{
    id: string
    title: string
    image: string
    link?: string
  }>
  quickActions: Array<{
    id: string
    title: string
    icon: string
    route: string
  }>
}

class Home extends Component<{}, HomeState> {
  constructor(props) {
    super(props)
    this.state = {
      hotDestinations: [],
      featuredGuides: [],
      loading: true,
      error: null,
      banners: [
        {
          id: '1',
          title: '探索热门目的地',
          image: 'https://via.placeholder.com/750x300/007aff/ffffff?text=热门目的地',
          link: '/pages/destination/list/index'
        },
        {
          id: '2',
          title: '精选旅行攻略',
          image: 'https://via.placeholder.com/750x300/ff6b6b/ffffff?text=精选攻略',
          link: '/pages/guide/list/index'
        },
        {
          id: '3',
          title: '智能路线规划',
          image: 'https://via.placeholder.com/750x300/28a745/ffffff?text=路线规划',
          link: '/pages/route/plan/index'
        }
      ],
      quickActions: [
        {
          id: '1',
          title: '目的地',
          icon: '📍',
          route: '/pages/destination/list/index'
        },
        {
          id: '2',
          title: '攻略',
          icon: '📖',
          route: '/pages/guide/list/index'
        },
        {
          id: '3',
          title: '路线',
          icon: '🗺️',
          route: '/pages/route/plan/index'
        },
        {
          id: '4',
          title: '我的',
          icon: '👤',
          route: '/pages/profile/index'
        }
      ]
    }
  }

  componentDidMount() {
    this.loadPageData()
    
    // 监听下拉刷新事件
    Taro.onPullDownRefresh(() => {
      this.handlePullDownRefresh()
    })
  }

  /**
   * 加载页面数据
   */
  async loadPageData() {
    try {
      this.setState({ loading: true, error: null })
      
      // 并行加载热门目的地和精选攻略
      const [destinationsResult, guidesResult] = await Promise.all([
        DestinationService.getHotDestinations({ pageSize: 6 }),
        GuideService.getFeaturedGuides({ pageSize: 6 })
      ])

      if (destinationsResult.success && guidesResult.success) {
        this.setState({
          hotDestinations: destinationsResult.data,
          featuredGuides: guidesResult.data,
          loading: false
        })
      } else {
        throw new Error(destinationsResult.message || guidesResult.message || '加载数据失败')
      }
    } catch (error) {
      console.error('加载首页数据失败:', error)
      this.setState({
        error: error.message || '加载失败，请稍后重试',
        loading: false
      })
    }
  }

  /**
   * 处理下拉刷新
   */
  async handlePullDownRefresh() {
    try {
      await this.loadPageData()
      Taro.stopPullDownRefresh()
      Taro.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1500
      })
    } catch (error) {
      Taro.stopPullDownRefresh()
      Taro.showToast({
        title: '刷新失败',
        icon: 'error',
        duration: 1500
      })
    }
  }

  /**
   * 处理搜索
   */
  handleSearch = (keyword: string) => {
    console.log('搜索关键词:', keyword)
    // 显示搜索提示
    Taro.showToast({
      title: `搜索: ${keyword}`,
      icon: 'none',
      duration: 2000
    })
    // 搜索历史已在SearchBox组件中处理
  }

  /**
   * 处理目的地点击
   */
  handleDestinationClick = (destination: Destination) => {
    Taro.navigateTo({
      url: `/pages/destination/detail/index?id=${destination.id}`
    })
  }

  /**
   * 处理攻略点击
   */
  handleGuideClick = (guide: Guide) => {
    Taro.navigateTo({
      url: `/pages/guide/detail/index?id=${guide.id}`
    })
  }

  /**
   * 处理快捷操作点击
   */
  handleQuickActionClick = (action: any) => {
    if (action.route.includes('/pages/profile/index')) {
      Taro.switchTab({ url: action.route })
    } else {
      Taro.navigateTo({ url: action.route })
    }
  }

  /**
   * 处理轮播图点击
   */
  handleBannerClick = (banner: any) => {
    if (banner.link) {
      if (banner.link.includes('/pages/profile/index')) {
        Taro.switchTab({ url: banner.link })
      } else {
        Taro.navigateTo({ url: banner.link })
      }
    }
  }

  /**
   * 重试加载
   */
  handleRetry = () => {
    this.loadPageData()
  }

  render() {
    const { 
      hotDestinations, 
      featuredGuides, 
      loading, 
      error, 
      banners, 
      quickActions 
    } = this.state

    if (loading) {
      return <Loading />
    }

    if (error) {
      return (
        <View className='home-error'>
          <Text className='error-text'>{error}</Text>
          <View className='retry-button' onClick={this.handleRetry}>
            <Text>重试</Text>
          </View>
        </View>
      )
    }

    return (
      <View className='home'>
        {/* 搜索框 */}
        <View className='search-section'>
          <SearchBox onSearch={this.handleSearch} />
        </View>

        {/* 轮播图 */}
        <View className='banner-section'>
          <Swiper
            className='banner-swiper'
            indicatorDots
            autoplay
            interval={3000}
            duration={500}
            indicatorColor='rgba(255, 255, 255, 0.5)'
            indicatorActiveColor='#007aff'
          >
            {banners.map(banner => (
              <SwiperItem key={banner.id}>
                <View 
                  className='banner-item'
                  onClick={() => this.handleBannerClick(banner)}
                >
                  <Image 
                    src={banner.image} 
                    mode='aspectFill'
                    className='banner-image'
                  />
                  <View className='banner-content'>
                    <Text className='banner-title'>{banner.title}</Text>
                  </View>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>

        {/* 快捷入口 */}
        <View className='quick-actions-section'>
          <View className='quick-actions'>
            {quickActions.map(action => (
              <View 
                key={action.id}
                className='quick-action-item'
                onClick={() => this.handleQuickActionClick(action)}
              >
                <View className='quick-action-icon'>{action.icon}</View>
                <Text className='quick-action-title'>{action.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 热门目的地 */}
        <View className='destinations-section'>
          <View className='section-header'>
            <Text className='section-title'>热门目的地</Text>
            <Text 
              className='section-more'
              onClick={() => Taro.navigateTo({ url: '/pages/destination/list/index' })}
            >
              查看更多
            </Text>
          </View>
          <View className='destination-card-grid'>
            {hotDestinations.map(destination => (
              <DestinationCard
                key={destination.id}
                destination={{
                  ...destination,
                  isHot: true
                }}
                onClick={() => this.handleDestinationClick(destination)}
              />
            ))}
          </View>
        </View>

        {/* 精选攻略 */}
        <View className='guides-section'>
          <View className='section-header'>
            <Text className='section-title'>精选攻略</Text>
            <Text 
              className='section-more'
              onClick={() => Taro.navigateTo({ url: '/pages/guide/list/index' })}
            >
              查看更多
            </Text>
          </View>
          <View className='guides-list'>
            {featuredGuides.map(guide => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onClick={() => this.handleGuideClick(guide)}
              />
            ))}
          </View>
        </View>
      </View>
    )
  }
}

export default Home