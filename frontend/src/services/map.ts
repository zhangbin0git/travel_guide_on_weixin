import { Location, Poi, RoutePlan } from '../types'
import { get } from '../utils/request'

// 地理编码 - 地址转坐标
export const geocode = async (
  address: string,
  city?: string
): Promise<Location> => {
  return get('/map/geocode', { address, city })
}

// 逆地理编码 - 坐标转地址
export const regeocode = async (location: Location): Promise<unknown> => {
  return get('/map/regeocode', {
    longitude: location.longitude,
    latitude: location.latitude,
  })
}

// POI搜索
export const searchPoi = async (
  keyword: string,
  location?: Location,
  city?: string
): Promise<Poi[]> => {
  return get('/map/poi/search', { keyword, location, city })
}

// 周边搜索
export const searchAround = async (
  location: Location,
  keyword: string,
  radius = 1000
): Promise<Poi[]> => {
  return get('/map/around/search', {
    longitude: location.longitude,
    latitude: location.latitude,
    keyword,
    radius,
  })
}

// 路径规划 - 驾车
export const planDrivingRoute = async (
  origin: Location,
  destination: Location
): Promise<RoutePlan> => {
  return get('/map/route/driving', {
    origin: `${origin.longitude},${origin.latitude}`,
    destination: `${destination.longitude},${destination.latitude}`,
  })
}

// 路径规划 - 步行
export const planWalkingRoute = async (
  origin: Location,
  destination: Location
): Promise<RoutePlan> => {
  return get('/map/route/walking', {
    origin: `${origin.longitude},${origin.latitude}`,
    destination: `${destination.longitude},${destination.latitude}`,
  })
}

// 路径规划 - 骑行
export const planBicyclingRoute = async (
  origin: Location,
  destination: Location
): Promise<RoutePlan> => {
  return get('/map/route/bicycling', {
    origin: `${origin.longitude},${origin.latitude}`,
    destination: `${destination.longitude},${destination.latitude}`,
  })
}

// 距离测量
export const calculateDistance = async (
  origins: Location[],
  destination: Location,
  type = 'driving'
): Promise<unknown> => {
  const originsStr = origins
    .map(loc => `${loc.longitude},${loc.latitude}`)
    .join('|')
  return get('/map/distance', {
    origins: originsStr,
    destination: `${destination.longitude},${destination.latitude}`,
    type,
  })
}
