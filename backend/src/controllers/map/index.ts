import { Router } from 'express'
import {
  geocode,
  regeocode,
  searchPoi,
  searchAround,
  planDrivingRoute,
  planWalkingRoute,
  planBicyclingRoute,
  calculateDistance
} from './map'

const router = Router()

// 地理编码
router.get('/geocode', geocode)

// 逆地理编码
router.get('/regeocode', regeocode)

// POI搜索
router.get('/poi/search', searchPoi)

// 周边搜索
router.get('/around', searchAround)

// 路径规划
router.get('/route/driving', planDrivingRoute)
router.get('/route/walking', planWalkingRoute)
router.get('/route/bicycling', planBicyclingRoute)

// 距离测量
router.get('/distance', calculateDistance)

export default router