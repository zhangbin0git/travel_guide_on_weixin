import Taro from '@tarojs/taro'

/**
 * 页面路由工具类
 * 统一管理页面跳转逻辑
 */
export class Router {
  /**
   * 页面路径常量
   */
  static PAGES = {
    HOME: '/pages/home/index',
    SEARCH: '/pages/search/index',
    GUIDE: '/pages/guide/index',
    GUIDE_DETAIL: '/pages/guide-detail/index',
    PROFILE: '/pages/profile/index',
    // 扩展页面路径
    MY_GUIDES: '/pages/my-guides/index',
    FAVORITES: '/pages/favorites/index',
    HISTORY: '/pages/history/index',
    SETTINGS: '/pages/settings/index',
    EDIT_PROFILE: '/pages/edit-profile/index',
    FEEDBACK: '/pages/feedback/index',
    ABOUT: '/pages/about/index'
  }

  /**
   * 跳转到指定页面
   * @param url 页面路径
   * @param params 路由参数
   * @param options 额外选项
   */
  static navigateTo(url, params = {}, options = {}) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
    
    const fullUrl = queryString ? `${url}?${queryString}` : url

    Taro.navigateTo({
      url: fullUrl,
      ...options
    })
  }

  /**
   * 重定向到指定页面（关闭当前页面）
   * @param url 页面路径
   * @param params 路由参数
   * @param options 额外选项
   */
  static redirectTo(url, params = {}, options = {}) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
    
    const fullUrl = queryString ? `${url}?${queryString}` : url

    Taro.redirectTo({
      url: fullUrl,
      ...options
    })
  }

  /**
   * 切换到TabBar页面
   * @param url 页面路径
   * @param options 额外选项
   */
  static switchTab(url, options = {}) {
    Taro.switchTab({
      url,
      ...options
    })
  }

  /**
   * 返回上一页
   * @param delta 返回的页面数，默认为1
   * @param options 额外选项
   */
  static navigateBack(delta = 1, options = {}) {
    Taro.navigateBack({
      delta,
      ...options
    })
  }

  /**
   * 重新加载当前页面
   * @param options 额外选项
   */
  static reLaunch(url, params = {}, options = {}) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
    
    const fullUrl = queryString ? `${url}?${queryString}` : url

    Taro.reLaunch({
      url: fullUrl,
      ...options
    })
  }

  // 便捷方法
  /**
   * 跳转到首页
   */
  static goToHome() {
    this.switchTab(this.PAGES.HOME)
  }

  /**
   * 跳转到搜索页
   */
  static goToSearch() {
    this.switchTab(this.PAGES.SEARCH)
  }

  /**
   * 跳转到攻略页
   */
  static goToGuide() {
    this.switchTab(this.PAGES.GUIDE)
  }

  /**
   * 跳转到个人中心
   */
  static goToProfile() {
    this.switchTab(this.PAGES.PROFILE)
  }

  /**
   * 跳转到攻略详情页
   * @param guideId 攻略ID
   * @param guideTitle 攻略标题（可选）
   */
  static goToGuideDetail(guideId, guideTitle) {
    const params = { id: guideId }
    if (guideTitle) {
      params.title = guideTitle
    }
    
    this.navigateTo(this.PAGES.GUIDE_DETAIL, params)
  }

  /**
   * 跳转到我的攻略页
   */
  static goToMyGuides() {
    this.navigateTo(this.PAGES.MY_GUIDES)
  }

  /**
   * 跳转到收藏夹
   */
  static goToFavorites() {
    this.navigateTo(this.PAGES.FAVORITES)
  }

  /**
   * 跳转到历史记录
   */
  static goToHistory() {
    this.navigateTo(this.PAGES.HISTORY)
  }

  /**
   * 跳转到设置页面
   */
  static goToSettings() {
    this.navigateTo(this.PAGES.SETTINGS)
  }

  /**
   * 跳转到编辑资料页面
   */
  static goToEditProfile() {
    this.navigateTo(this.PAGES.EDIT_PROFILE)
  }

  /**
   * 跳转到反馈页面
   */
  static goToFeedback() {
    this.navigateTo(this.PAGES.FEEDBACK)
  }

  /**
   * 跳转到关于页面
   */
  static goToAbout() {
    this.navigateTo(this.PAGES.ABOUT)
  }

  /**
   * 获取当前页面路径
   */
  static getCurrentPage() {
    const pages = Taro.getCurrentPages()
    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1]
      return currentPage.route
    }
    return null
  }

  /**
   * 获取当前页面参数
   */
  static getCurrentPageParams() {
    const pages = Taro.getCurrentPages()
    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1]
      return currentPage.options || {}
    }
    return {}
  }

  /**
   * 检查是否可以返回
   */
  static canGoBack(delta = 1) {
    const pages = Taro.getCurrentPages()
    return pages.length > delta
  }

  /**
   * 安全导航（带错误处理）
   */
  static safeNavigate(navigateMethod, args, options = {}) {
    try {
      navigateMethod(...args)
      return true
    } catch (error) {
      console.error('导航失败:', error)
      if (options.showError !== false) {
        Taro.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
      return false
    }
  }
}

export default Router