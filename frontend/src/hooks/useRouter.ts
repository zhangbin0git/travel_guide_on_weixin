import Taro from '@tarojs/taro'
import { useState, useCallback } from 'react'
import { Router } from '../utils/router'

/**
 * 路由导航Hook
 * 提供路由状态管理和导航方法
 */
export const useRouter = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * 安全导航方法，包含错误处理
   */
  const safeNavigate = useCallback((navigateMethod, args) => {
    setLoading(true)
    setError(null)
    
    return new Promise((resolve, reject) => {
      const options = {
        success: resolve,
        fail: reject
      }
      
      // 根据参数类型调用不同的导航方法
      if (typeof args[0] === 'string' && args.length === 1) {
        // 单参数方法（如 switchTab, goToHome 等）
        navigateMethod.call(Router, args[0], options)
      } else if (typeof args[0] === 'string' && args.length >= 2) {
        // 多参数方法（如 navigateTo, redirectTo 等）
        navigateMethod.call(Router, args[0], args[1], options)
      } else {
        // 其他方法
        navigateMethod.apply(Router, [...args, options])
      }
    }).catch(err => {
      const errorMessage = err.errMsg || err.message || '导航失败'
      setError(errorMessage)
      
      // 显示错误提示
      Taro.showToast({
        title: errorMessage,
        icon: 'none',
        duration: 2000
      })
      
      throw err
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  /**
   * 跳转到指定页面
   */
  const navigateTo = useCallback((url, params) => {
    return safeNavigate(Router.navigateTo, [url, params || {}])
  }, [safeNavigate])

  /**
   * 重定向到指定页面
   */
  const redirectTo = useCallback((url, params) => {
    return safeNavigate(Router.redirectTo, [url, params || {}])
  }, [safeNavigate])

  /**
   * 切换到TabBar页面
   */
  const switchTab = useCallback((url) => {
    return safeNavigate(Router.switchTab, [url])
  }, [safeNavigate])

  /**
   * 返回上一页
   */
  const navigateBack = useCallback((delta = 1) => {
    return safeNavigate(Router.navigateBack, [delta])
  }, [safeNavigate])

  /**
   * 重新加载当前页面
   */
  const reLaunch = useCallback((url, params) => {
    return safeNavigate(Router.reLaunch, [url, params || {}])
  }, [safeNavigate])

  // 便捷方法
  const goToHome = useCallback(() => {
    return safeNavigate(Router.goToHome, [])
  }, [safeNavigate])

  const goToSearch = useCallback(() => {
    return safeNavigate(Router.goToSearch, [])
  }, [safeNavigate])

  const goToGuide = useCallback(() => {
    return safeNavigate(Router.goToGuide, [])
  }, [safeNavigate])

  const goToProfile = useCallback(() => {
    return safeNavigate(Router.goToProfile, [])
  }, [safeNavigate])

  const goToGuideDetail = useCallback((guideId, guideTitle) => {
    return safeNavigate(Router.goToGuideDetail, [guideId, guideTitle])
  }, [safeNavigate])

  const goToMyGuides = useCallback(() => {
    return safeNavigate(Router.goToMyGuides, [])
  }, [safeNavigate])

  const goToFavorites = useCallback(() => {
    return safeNavigate(Router.goToFavorites, [])
  }, [safeNavigate])

  const goToHistory = useCallback(() => {
    return safeNavigate(Router.goToHistory, [])
  }, [safeNavigate])

  const goToSettings = useCallback(() => {
    return safeNavigate(Router.goToSettings, [])
  }, [safeNavigate])

  const goToEditProfile = useCallback(() => {
    return safeNavigate(Router.goToEditProfile, [])
  }, [safeNavigate])

  const goToFeedback = useCallback(() => {
    return safeNavigate(Router.goToFeedback, [])
  }, [safeNavigate])

  const goToAbout = useCallback(() => {
    return safeNavigate(Router.goToAbout, [])
  }, [safeNavigate])

  /**
   * 安全返回
   */
  const safeGoBack = useCallback((delta = 1) => {
    return safeNavigate(Router.safeGoBack, [delta])
  }, [safeNavigate])

  /**
   * 获取当前页面信息
   */
  const getCurrentPage = useCallback(() => {
    return Router.getCurrentPage()
  }, [])

  /**
   * 检查是否可以返回
   */
  const canGoBack = useCallback((delta = 1) => {
    return Router.canGoBack(delta)
  }, [])

  /**
   * 清除错误状态
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // 状态
    loading,
    error,
    
    // 基础导航方法
    navigateTo,
    redirectTo,
    switchTab,
    navigateBack,
    reLaunch,
    
    // 便捷方法
    goToHome,
    goToSearch,
    goToGuide,
    goToProfile,
    goToGuideDetail,
    goToMyGuides,
    goToFavorites,
    goToHistory,
    goToSettings,
    goToEditProfile,
    goToFeedback,
    goToAbout,
    
    // 工具方法
    safeGoBack,
    getCurrentPage,
    canGoBack,
    clearError
  }
}

export default useRouter