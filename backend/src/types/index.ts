// 通用响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T | null
  timestamp: number
}

// 用户类型
export interface User {
  id: string
  openid: string
  nickname: string
  avatar: string
  gender: 0 | 1 | 2 // 0=未知, 1=男, 2=女
  city?: string
  province?: string
  country?: string
  created_at: string
  updated_at: string
}

// 旅行目的地类型
export interface TravelDestination {
  id: string
  name: string
  description: string
  images: string[]
  location: {
    longitude: number
    latitude: number
    address: string
  }
  city: string
  province: string
  tags: string[]
  rating: number
  review_count: number
  created_at: string
  updated_at: string
}

// 旅行攻略类型
export interface TravelGuide {
  id: string
  title: string
  description: string
  content: string
  cover_image: string
  author: User
  destination: TravelDestination
  tags: string[]
  view_count: number
  like_count: number
  is_public: boolean
  created_at: string
  updated_at: string
}

// 旅行计划类型
export interface TravelPlan {
  id: string
  title: string
  destination: string
  start_date: string
  end_date: string
  days: number
  budget?: number
  notes?: string
  user_id: string
  created_at: string
  updated_at: string
}

// 地图位置类型
export interface Location {
  longitude: number
  latitude: number
  address?: string
}

// POI类型
export interface Poi {
  id: string
  name: string
  category: string
  location: Location
  address: string
  tel?: string
  website?: string
  images?: string[]
  rating?: number
  review_count?: number
  distance?: number
}

// 路径规划类型
export interface RoutePlan {
  distance: number // 距离（米）
  duration: number // 时间（秒）
  steps: RouteStep[]
}

// 路径步骤类型
export interface RouteStep {
  instruction: string
  distance: number
  duration: number
  path: string // 路径坐标点
}
