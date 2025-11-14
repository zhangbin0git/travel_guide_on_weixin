import Taro from '@tarojs/taro'
import { API_BASE_URL } from '../../config/index'

/**
 * 目的地相关API服务
 */
export class DestinationService {
  /**
   * 获取热门目的地列表
   * @param params 查询参数
   * @returns 目的地列表
   */
  static async getHotDestinations(params?: {
    page?: number
    pageSize?: number
    city?: string
  }) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/destinations/hot`,
        method: 'GET',
        data: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          city: params?.city
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
        throw new Error(response.data.message || '获取热门目的地失败')
      }
    } catch (error) {
      console.error('获取热门目的地失败:', error)
      return {
        success: false,
        data: [],
        total: 0,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 搜索目的地
   * @param keyword 搜索关键词
   * @param params 查询参数
   * @returns 搜索结果
   */
  static async searchDestinations(keyword: string, params?: {
    page?: number
    pageSize?: number
    city?: string
  }) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/destinations/search`,
        method: 'GET',
        data: {
          keyword,
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          city: params?.city
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
        throw new Error(response.data.message || '搜索目的地失败')
      }
    } catch (error) {
      console.error('搜索目的地失败:', error)
      return {
        success: false,
        data: [],
        total: 0,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 获取目的地详情
   * @param destinationId 目的地ID
   * @returns 目的地详情
   */
  static async getDestinationDetail(destinationId: string) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/destinations/${destinationId}`,
        method: 'GET'
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || '获取详情成功'
        }
      } else {
        throw new Error(response.data.message || '获取目的地详情失败')
      }
    } catch (error) {
      console.error('获取目的地详情失败:', error)
      return {
        success: false,
        data: null,
        message: error.message || '网络错误，请稍后重试'
      }
    }
  }

  /**
   * 获取目的地攻略列表
   * @param destinationId 目的地ID
   * @param params 查询参数
   * @returns 攻略列表
   */
  static async getDestinationGuides(destinationId: string, params?: {
    page?: number
    pageSize?: number
    sortBy?: 'latest' | 'popular' | 'rating'
  }) {
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/destinations/${destinationId}/guides`,
        method: 'GET',
        data: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          sortBy: params?.sortBy || 'latest'
        }
      })

      if (response.statusCode === 200) {
        return {
          success: true,
          data: response.data.data || [],
          total: response.data.total || 0,
          message: response.data.message || '获取攻略列表成功'
        }
      } else {
        throw new Error(response.data.message || '获取目的地攻略失败')
      }
    } catch (error) {
      console.error('获取目的地攻略失败:', error)
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
 * 目的地数据类型定义
 */
export interface Destination {
  id: string
  name: string
  description: string
  imageUrl: string
  rating: number
  guideCount: number
  isHot?: boolean
  tags?: string[]
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  createdAt: string
  updatedAt: string
}

export interface DestinationSearchParams {
  keyword: string
  page?: number
  pageSize?: number
  city?: string
}

export interface DestinationListResponse {
  success: boolean
  data: Destination[]
  total: number
  message: string
}