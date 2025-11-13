// API 通用响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 用户相关类型
export interface User {
  id: string
  nickname: string
  avatar: string
  phone?: string
  email?: string
  createTime: string
  updateTime: string
}

// 旅行相关类型
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
  tags: string[]
  rating: number
  createTime: string
}

export interface TravelGuide {
  id: string
  title: string
  content: string
  coverImage: string
  destinations: TravelDestination[]
  author: User
  tags: string[]
  viewCount: number
  likeCount: number
  createTime: string
  updateTime: string
}

// 地图相关类型
export interface Location {
  longitude: number
  latitude: number
  address?: string
  name?: string
}

export interface Poi {
  id: string
  name: string
  location: Location
  type: string
  address: string
  tel?: string
  distance?: number
  rating?: number
}

// 路径规划类型
export interface RoutePoint {
  name: string
  location: Location
  duration?: number
  distance?: number
  instruction?: string
}

export interface RoutePlan {
  origin: Location
  destination: Location
  points: RoutePoint[]
  distance: number
  duration: number
  routes: {
    steps: RoutePoint[]
    distance: number
    duration: number
  }[]
}