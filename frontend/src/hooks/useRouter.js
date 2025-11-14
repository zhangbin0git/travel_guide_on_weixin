import Taro from '@tarojs/taro'
import { APP_CONFIG } from '../config/index'

/**
 * 路由钩子，提供统一的路由跳转方法
 */
export const useRouter = () => {
  /**
   * 跳转到搜索页面
   * @param keyword 搜索关键词
   */
  const goToSearch = (keyword = '') => {
    const url = keyword 
      ? `${APP_CONFIG.ROUTES.SEARCH}?keyword=${encodeURIComponent(keyword)}`
      : APP_CONFIG.ROUTES.SEARCH
    
    Taro.navigateTo({
      url,
      fail: (error) => {
        console.error('跳转到搜索页面失败:', error)
        Taro.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }

  /**
   * 跳转到攻略详情页
   * @param guideId 攻略ID
   * @param title 攻略标题
   */
  const goToGuideDetail = (guideId, title = '') => {
    const url = title
      ? `${APP_CONFIG.ROUTES.GUIDE_DETAIL}?id=${guideId}&title=${encodeURIComponent(title)}`
      : `${APP_CONFIG.ROUTES.GUIDE_DETAIL}?id=${guideId}`
    
    Taro.navigateTo({
      url,
      fail: (error) => {
        console.error('跳转到攻略详情页失败:', error)
        Taro.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }

  /**
   * 跳转到目的地详情页
   * @param destinationId 目的地ID
   * @param name 目的地名称
   */
  const goToDestinationDetail = (destinationId, name = '') => {
    const url = name
      ? `${APP_CONFIG.ROUTES.DESTINATION_DETAIL}?id=${destinationId}&name=${encodeURIComponent(name)}`
      : `${APP_CONFIG.ROUTES.DESTINATION_DETAIL}?id=${destinationId}`
    
    Taro.navigateTo({
      url,
      fail: (error) => {
        console.error('跳转到目的地详情页失败:', error)
        Taro.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }

  /**
   * 跳转到攻略生成页面
   * @param type 攻略类型
   */
  const goToGuide = (type = '') => {
    // 这里假设攻略生成页面的路径
    const url = type 
      ? `/pages/guide/create/index?type=${encodeURIComponent(type)}`
      : '/pages/guide/create/index'
    
    Taro.navigateTo({
      url,
      fail: (error) => {
        console.error('跳转到攻略生成页失败:', error)
        Taro.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }

  /**
   * 跳转到个人中心页面
   */
  const goToProfile = () => {
    Taro.switchTab({
      url: APP_CONFIG.ROUTES.PROFILE,
      fail: (error) => {
        console.error('跳转到个人中心失败:', error)
        Taro.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }

  /**
   * 跳转到首页
   */
  const goToHome = () => {
    Taro.switchTab({
      url: APP_CONFIG.ROUTES.HOME,
      fail: (error) => {
        console.error('跳转到首页失败:', error)
        Taro.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }

  /**
   * 返回上一页
   */
  const goBack = () => {
    const pages = Taro.getCurrentPages()
    if (pages.length > 1) {
      Taro.navigateBack({
        delta: 1,
        fail: (error) => {
          console.error('返回上一页失败:', error)
          // 如果返回失败，跳转到首页
          goToHome()
        }
      })
    } else {
      goToHome()
    }
  }

  /**
   * 重新启动应用
   */
  const reLaunch = (url) => {
    Taro.reLaunch({
      url: url || APP_CONFIG.ROUTES.HOME,
      fail: (error) => {
        console.error('重新启动应用失败:', error)
        Taro.showToast({
          title: '应用启动失败',
          icon: 'none'
        })
      }
    })
  }

  /**
   * 获取当前页面参数
   * @returns 页面参数对象
   */
  const getCurrentPageParams = () => {
    const pages = Taro.getCurrentPages()
    const currentPage = pages[pages.length - 1]
    return currentPage.options || {}
  }

  /**
   * 获取当前页面路径
   * @returns 当前页面路径
   */
  const getCurrentPagePath = () => {
    const pages = Taro.getCurrentPages()
    const currentPage = pages[pages.length - 1]
    return currentPage.route || ''
  }

  return {
    // 页面跳转方法
    goToSearch,
    goToGuideDetail,
    goToDestinationDetail,
    goToGuide,
    goToProfile,
    goToHome,
    goBack,
    reLaunch,
    
    // 工具方法
    getCurrentPageParams,
    getCurrentPagePath
  }
}