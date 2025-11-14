import Taro from '@tarojs/taro'
import { API_BASE_URL } from '../../config/index'

/**
 * 攻略相关API服务
 */
export class GuideService {
  /**
   * 获取精选攻略列表
   * @param params 查询参数
   * @returns 攻略列表
   */
  static async getFeaturedGuides(params?: {
    page?: number
    pageSize?: number
    category?: string
    tag?: string
  }) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/guides/featured`,
        method: 'GET',
        data: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          category: params?.category,
          tag: params?.tag
        }
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data || [],
          total: response.data.total || 0,
          message: response.data.message || '获取成功'
        }
      } else {
        throw new Error(response.data.message || '获取精选攻略失败')
      }
    } catch (error) {
      console.error('获取精选攻略失败:', error)
      return {
        success: false,
        data: [],
        total: 0,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 搜索攻略
   * @param keyword 搜索关键词
   * @param params 查询参数
   * @returns 搜索结果
   */
  static async searchGuides(keyword: string, params?: {
    page?: number
    pageSize?: number
    category?: string
    tag?: string
    sortBy?: 'latest' | 'popular' | 'rating'
  }) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/guides/search`,
        method: 'GET',
        data: {
          keyword,
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          category: params?.category,
          tag: params?.tag,
          sortBy: params?.sortBy || 'latest'
        }
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data || [],
          total: response.data.total || 0,
          message: response.data.message || '搜索成功'
        }
      } else {
        throw new Error(response.data.message || '搜索攻略失败')
      }
    } catch (error) {
      console.error('搜索攻略失败:', error)
      return {
        success: false,
        data: [],
        total: 0,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 获取攻略详情
   * @param guideId 攻略ID
   * @returns 攻略详情
   */
  static async getGuideDetail(guideId: string) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/guides/${guideId}`,
        method: 'GET'
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || '获取详情成功'
        }
      } else {
        throw new Error(response.data.message || '获取攻略详情失败')
      }
    } catch (error) {
      console.error('获取攻略详情失败:', error)
      return {
        success: false,
        data: null,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 获取攻略分类列表
   * @returns 分类列表
   */
  static async getGuideCategories() {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/guides/categories`,
        method: 'GET'
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data || [],
          message: response.data.message || '获取成功'
        }
      } else {
        throw new Error(response.data.message || '获取攻略分类失败')
      }
    } catch (error) {
      console.error('获取攻略分类失败:', error)
      return {
        success: false,
        data: [],
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 点赞攻略
   * @param guideId 攻略ID
   * @returns 操作结果
   */
  static async likeGuide(guideId: string) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/guides/${guideId}/like`,
        method: 'POST'
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || '点赞成功'
        }
      } else {
        throw new Error(response.data.message || '点赞失败')
      }
    } catch (error) {
      console.error('点赞攻略失败:', error)
      return {
        success: false,
        data: null,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 收藏攻略
   * @param guideId 攻略ID
   * @returns 操作结果
   */
  static async favoriteGuide(guideId: string) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/guides/${guideId}/favorite`,
        method: 'POST'
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || '收藏成功'
        }
      } else {
        throw new Error(response.data.message || '收藏失败')
      }
    } catch (error) {
      console.error('收藏攻略失败:', error)
      return {
        success: false,
        data: null,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 获取用户收藏的攻略
   * @param params 查询参数
   * @returns 收藏列表
   */
  static async getFavoriteGuides(params?: {
    page?: number
    pageSize?: number
  }) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/user/favorites/guides`,
        method: 'GET',
        data: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 10
        }
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data || [],
          total: response.data.total || 0,
          message: response.data.message || '获取成功'
        }
      } else {
        throw new Error(response.data.message || '获取收藏攻略失败')
      }
    } catch (error) {
      console.error('获取收藏攻略失败:', error)
      return {
        success: false,
        data: [],
        total: 0,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }
}

/**
 * 攻略数据类型定义
 */
export interface Guide {
  id: string
  title: string
  description: string
  imageUrl: string
  author: {
    id: string
    name: string
    avatar: string
  }
  rating: number
  viewCount: number
  likeCount: number
  tags: string[]
  duration?: string
  isRecommended?: boolean
  category?: string
  createdAt: string
  updatedAt: string
}

export interface GuideSearchParams {
  keyword: string
  page?: number
  pageSize?: number
  category?: string
  tag?: string
  sortBy?: 'latest' | 'popular' | 'rating'
}

export interface GuideListResponse {
  success: boolean
  data: Guide[]
  total: number
  message: string
}

export interface GuideCategory {
  id: string
  name: string
  description?: string
  icon?: string
  guideCount: number
}