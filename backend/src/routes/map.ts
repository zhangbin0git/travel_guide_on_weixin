import { Router } from 'express'
import { 
  geocode,
  regeocode,
  textSearch,
  aroundSearch,
  getPoiDetail,
  drivingRoute,
  walkingRoute,
  bicyclingRoute,
  transitRoute,
  calculateDistance,
  ipLocation,
  getWeather
} from '../controllers/map'

const router = Router()

// 地理编码 - 将地址转换为经纬度坐标
router.post('/geocode', geocode)

// 逆地理编码 - 将经纬度坐标转换为地址信息
router.post('/regeocode', regeocode)

// 关键词搜索POI
router.post('/text-search', textSearch)

// 周边搜索POI
router.post('/around-search', aroundSearch)

// 获取POI详细信息
router.get('/poi/:id', getPoiDetail)

// 驾车路径规划
router.post('/driving-route', drivingRoute)

// 步行路径规划
router.post('/walking-route', walkingRoute)

// 骑行路径规划
router.post('/bicycling-route', bicyclingRoute)

// 公共交通路径规划
router.post('/transit-route', transitRoute)

// 距离测量
router.post('/distance', calculateDistance)

// IP定位
router.post('/ip-location', ipLocation)

// 获取天气信息
router.post('/weather', getWeather)

export default router