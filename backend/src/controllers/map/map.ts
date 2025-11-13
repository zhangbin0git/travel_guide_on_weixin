import { Request, Response } from 'express'
import { sendSuccess, sendError } from '../utils/response'
import { Location, Poi, RoutePlan } from '../types'
import { logger } from '../utils/logger'

// 模拟高德地图MCP API调用
// 实际项目中应该通过MCP客户端调用高德地图API

// 地理编码 - 地址转坐标
export const geocode = async (req: Request, res: Response) => {
  try {
    const { address, city } = req.query

    if (!address) {
      return sendError(res, 400, '地址不能为空')
    }

    // 模拟API调用结果
    const mockLocation: Location = {
      longitude: 116.397428,
      latitude: 39.90923,
      address: String(address),
    }

    logger.info(`地理编码: ${address} -> ${mockLocation.longitude},${mockLocation.latitude}`)
    sendSuccess(res, mockLocation, '地理编码成功')
  } catch (error) {
    logger.error('地理编码失败:', error)
    sendError(res, 500, '地理编码失败')
  }
}

// 逆地理编码 - 坐标转地址
export const regeocode = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude } = req.query

    if (!longitude || !latitude) {
      return sendError(res, 400, '经纬度不能为空')
    }

    // 模拟API调用结果
    const mockAddress = {
      address: '北京市东城区东华门街道',
      province: '北京市',
      city: '北京市',
      district: '东城区',
      street: '东华门街道',
      number: '1号',
    }

    logger.info(`逆地理编码: ${longitude},${latitude} -> ${mockAddress.address}`)
    sendSuccess(res, mockAddress, '逆地理编码成功')
  } catch (error) {
    logger.error('逆地理编码失败:', error)
    sendError(res, 500, '逆地理编码失败')
  }
}

// POI搜索
export const searchPoi = async (req: Request, res: Response) => {
  try {
    const { keyword, city } = req.query

    if (!keyword) {
      return sendError(res, 400, '搜索关键词不能为空')
    }

    // 模拟API调用结果
    const mockPois: Poi[] = [
      {
        id: 'poi_1',
        name: '故宫博物院',
        category: '景点',
        location: {
          longitude: 116.397026,
          latitude: 39.918058,
        },
        address: '北京市东城区景山前街4号',
        tel: '010-85007421',
        website: 'https://www.dpm.org.cn',
        rating: 4.8,
        review_count: 12580,
      },
      {
        id: 'poi_2',
        name: '天安门广场',
        category: '景点',
        location: {
          longitude: 116.397477,
          latitude: 39.903738,
        },
        address: '北京市东城区东长安街',
        rating: 4.7,
        review_count: 8960,
      },
    ]

    logger.info(`POI搜索: ${keyword} in ${city || '全国'}`)
    sendSuccess(res, mockPois, 'POI搜索成功')
  } catch (error) {
    logger.error('POI搜索失败:', error)
    sendError(res, 500, 'POI搜索失败')
  }
}

// 周边搜索
export const searchAround = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude, keyword, radius = 1000 } = req.query

    if (!longitude || !latitude) {
      return sendError(res, 400, '中心点坐标不能为空')
    }

    if (!keyword) {
      return sendError(res, 400, '搜索关键词不能为空')
    }

    // 模拟API调用结果
    const mockPois: Poi[] = [
      {
        id: 'poi_3',
        name: '王府井小吃街',
        category: '美食',
        location: {
          longitude: 116.407626,
          latitude: 39.913058,
        },
        address: '北京市东城区王府井大街',
        distance: 800,
      },
      {
        id: 'poi_4',
        name: '北京饭店',
        category: '酒店',
        location: {
          longitude: 116.407426,
          latitude: 39.912058,
        },
        address: '北京市东城区东长安街33号',
        tel: '010-65137766',
        distance: 650,
      },
    ]

    logger.info(`周边搜索: ${keyword} around ${longitude},${latitude} within ${radius}m`)
    sendSuccess(res, mockPois, '周边搜索成功')
  } catch (error) {
    logger.error('周边搜索失败:', error)
    sendError(res, 500, '周边搜索失败')
  }
}

// 路径规划 - 驾车
export const planDrivingRoute = async (req: Request, res: Response) => {
  try {
    const { origin, destination } = req.query

    if (!origin || !destination) {
      return sendError(res, 400, '起点和终点不能为空')
    }

    // 模拟API调用结果
    const mockRoute: RoutePlan = {
      distance: 8500, // 8.5公里
      duration: 1800, // 30分钟
      steps: [
        {
          instruction: '向东行驶200米，右转进入东长安街',
          distance: 200,
          duration: 60,
          path: '116.397026,39.918058;116.399126,39.918058;116.399126,39.916058',
        },
        {
          instruction: '沿东长安街行驶5公里，直行进入复兴门内大街',
          distance: 5000,
          duration: 900,
          path: '116.399126,39.916058;116.449126,39.916058;116.449126,39.914058',
        },
        {
          instruction: '继续行驶3.3公里到达目的地',
          distance: 3300,
          duration: 840,
          path: '116.449126,39.914058;116.482126,39.914058;116.482126,39.914058',
        },
      ],
    }

    logger.info(`驾车路径规划: ${origin} -> ${destination}`)
    sendSuccess(res, mockRoute, '驾车路径规划成功')
  } catch (error) {
    logger.error('驾车路径规划失败:', error)
    sendError(res, 500, '驾车路径规划失败')
  }
}

// 路径规划 - 步行
export const planWalkingRoute = async (req: Request, res: Response) => {
  try {
    const { origin, destination } = req.query

    if (!origin || !destination) {
      return sendError(res, 400, '起点和终点不能为空')
    }

    // 模拟API调用结果
    const mockRoute: RoutePlan = {
      distance: 1200, // 1.2公里
      duration: 900, // 15分钟
      steps: [
        {
          instruction: '向东步行300米，右转进入东长安街',
          distance: 300,
          duration: 240,
          path: '116.397026,39.918058;116.400126,39.918058;116.400126,39.916058',
        },
        {
          instruction: '沿东长安街步行900米到达目的地',
          distance: 900,
          duration: 660,
          path: '116.400126,39.916058;116.400126,39.916058;116.409126,39.916058;116.409126,39.916058',
        },
      ],
    }

    logger.info(`步行路径规划: ${origin} -> ${destination}`)
    sendSuccess(res, mockRoute, '步行路径规划成功')
  } catch (error) {
    logger.error('步行路径规划失败:', error)
    sendError(res, 500, '步行路径规划失败')
  }
}

// 路径规划 - 骑行
export const planBicyclingRoute = async (req: Request, res: Response) => {
  try {
    const { origin, destination } = req.query

    if (!origin || !destination) {
      return sendError(res, 400, '起点和终点不能为空')
    }

    // 模拟API调用结果
    const mockRoute: RoutePlan = {
      distance: 1500, // 1.5公里
      duration: 480, // 8分钟
      steps: [
        {
          instruction: '向东骑行300米，右转进入东长安街',
          distance: 300,
          duration: 120,
          path: '116.397026,39.918058;116.400126,39.918058;116.400126,39.916058',
        },
        {
          instruction: '沿东长安街骑行1.2公里到达目的地',
          distance: 1200,
          duration: 360,
          path: '116.400126,39.916058;116.400126,39.916058;116.412126,39.916058;116.412126,39.916058',
        },
      ],
    }

    logger.info(`骑行路径规划: ${origin} -> ${destination}`)
    sendSuccess(res, mockRoute, '骑行路径规划成功')
  } catch (error) {
    logger.error('骑行路径规划失败:', error)
    sendError(res, 500, '骑行路径规划失败')
  }
}

// 距离测量
export const calculateDistance = async (req: Request, res: Response) => {
  try {
    const { origins, destination, type = 'driving' } = req.query

    if (!origins || !destination) {
      return sendError(res, 400, '起点和终点不能为空')
    }

    // 模拟API调用结果
    const mockResults = [
      {
        origin: '116.397026,39.918058',
        destination: String(destination),
        distance: 8500,
        duration: 1800,
      },
      {
        origin: '116.407026,39.918058',
        destination: String(destination),
        distance: 7500,
        duration: 1500,
      },
    ]

    logger.info(`距离测量: ${origins} -> ${destination} by ${type}`)
    sendSuccess(res, mockResults, '距离测量成功')
  } catch (error) {
    logger.error('距离测量失败:', error)
    sendError(res, 500, '距离测量失败')
  }
}
