import { useState, useCallback } from 'react'
import Taro from '@tarojs/taro'

/**
 * 加载状态钩子，提供统一的加载状态管理
 */
export const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState)

  /**
   * 开始加载
   */
  const startLoading = useCallback(() => {
    setLoading(true)
    // 显示加载提示
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
  }, [])

  /**
   * 结束加载
   */
  const stopLoading = useCallback(() => {
    setLoading(false)
    // 隐藏加载提示
    Taro.hideLoading()
  }, [])

  /**
   * 切换加载状态
   */
  const toggleLoading = useCallback(() => {
    setLoading(prev => {
      if (prev) {
        Taro.hideLoading()
      } else {
        Taro.showLoading({
          title: '加载中...',
          mask: true
        })
      }
      return !prev
    })
  }, [])

  /**
   * 执行异步操作并自动管理加载状态
   * @param asyncFunction 异步函数
   * @param loadingText 加载提示文字
   * @returns Promise结果
   */
  const withLoading = useCallback(async (asyncFunction, loadingText = '加载中...') => {
    try {
      startLoading()
      if (loadingText !== '加载中...') {
        Taro.showLoading({
          title: loadingText,
          mask: true
        })
      }
      const result = await asyncFunction()
      return result
    } catch (error) {
      console.error('异步操作失败:', error)
      throw error
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  return {
    loading,
    setLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    withLoading
  }
}