import { TravelDestination, TravelGuide } from '../types'
import { get, post } from '../utils/request'

// 获取目的地列表
export const getDestinations = async (): Promise<TravelDestination[]> => {
  return get('/destinations')
}

// 获取目的地详情
export const getDestinationDetail = async (id: string): Promise<TravelDestination> => {
  return get(`/destinations/${id}`)
}

// 搜索目的地
export const searchDestinations = async (keyword: string): Promise<TravelDestination[]> => {
  return get('/destinations/search', { keyword })
}

// 获取攻略列表
export const getGuides = async (): Promise<TravelGuide[]> => {
  return get('/guides')
}

// 获取攻略详情
export const getGuideDetail = async (id: string): Promise<TravelGuide> => {
  return get(`/guides/${id}`)
}

// 创建攻略
export const createGuide = async (guide: Partial<TravelGuide>): Promise<TravelGuide> => {
  return post('/guides', guide)
}

// 获取推荐攻略
export const getRecommendedGuides = async (limit = 10): Promise<TravelGuide[]> => {
  return get('/guides/recommended', { limit })
}