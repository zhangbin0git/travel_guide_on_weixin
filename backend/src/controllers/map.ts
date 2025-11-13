import { Request, Response } from 'express'
import { sendSuccess, sendError } from '../utils/response'
import { mapService } from '../services/map'

/**
 * 地理编码 - 将地址转换为经纬度坐标
 */
export const geocode = async (req: Request, res: Response) => {
  try {
    const { address, city } = req.query

    if (!address) {
      return sendError(res, 400, '地址不能为空')
    }

    const result = await mapService.geocode(address as string, city as string)
    sendSuccess(res, result, '地理编码成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '地理编码失败')
  }
}

/**
 * 逆地理编码 - 将经纬度坐标转换为地址信息
 */
export const regeocode = async (req: Request, res: Response) => {
  try {
    const { location } = req.query

    if (!location) {
      return sendError(res, 400, '坐标不能为空')
    }

    const result = await mapService.regeocode(location as string)
    sendSuccess(res, result, '逆地理编码成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '逆地理编码失败')
  }
}

/**
 * 关键词搜索POI
 */
export const textSearch = async (req: Request, res: Response) => {
  try {
    const { keywords, city, citylimit } = req.query

    if (!keywords) {
      return sendError(res, 400, '搜索关键词不能为空')
    }

    const result = await mapService.textSearch(
      keywords as string,
      city as string,
      citylimit === 'true'
    )
    sendSuccess(res, result, 'POI搜索成功')
  } catch (error: any) {
    sendError(res, 500, error.message || 'POI搜索失败')
  }
}

/**
 * 周边搜索POI
 */
export const aroundSearch = async (req: Request, res: Response) => {
  try {
    const { keywords, location, radius } = req.query

    if (!keywords || !location) {
      return sendError(res, 400, '搜索关键词和中心点坐标不能为空')
    }

    const result = await mapService.aroundSearch(
      keywords as string,
      location as string,
      radius ? parseInt(radius as string) : undefined
    )
    sendSuccess(res, result, '周边搜索成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '周边搜索失败')
  }
}

/**
 * 获取POI详细信息
 */
export const getPoiDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      return sendError(res, 400, 'POI ID不能为空')
    }

    const result = await mapService.getPoiDetail(id)
    sendSuccess(res, result, '获取POI详情成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '获取POI详情失败')
  }
}

/**
 * 驾车路径规划
 */
export const drivingRoute = async (req: Request, res: Response) => {
  try {
    const { origin, destination } = req.query

    if (!origin || !destination) {
      return sendError(res, 400, '起点和终点坐标不能为空')
    }

    const result = await mapService.drivingRoute(origin as string, destination as string)
    sendSuccess(res, result, '驾车路径规划成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '驾车路径规划失败')
  }
}

/**
 * 步行路径规划
 */
export const walkingRoute = async (req: Request, res: Response) => {
  try {
    const { origin, destination } = req.query

    if (!origin || !destination) {
      return sendError(res, 400, '起点和终点坐标不能为空')
    }

    const result = await mapService.walkingRoute(origin as string, destination as string)
    sendSuccess(res, result, '步行路径规划成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '步行路径规划失败')
  }
}

/**
 * 骑行路径规划
 */
export const bicyclingRoute = async (req: Request, res: Response) => {
  try {
    const { origin, destination } = req.query

    if (!origin || !destination) {
      return sendError(res, 400, '起点和终点坐标不能为空')
    }

    const result = await mapService.bicyclingRoute(origin as string, destination as string)
    sendSuccess(res, result, '骑行路径规划成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '骑行路径规划失败')
  }
}

/**
 * 公共交通路径规划
 */
export const transitRoute = async (req: Request, res: Response) => {
  try {
    const { origin, destination, city, cityd } = req.query

    if (!origin || !destination || !city || !cityd) {
      return sendError(res, 400, '起点、终点、起点城市和终点城市不能为空')
    }

    const result = await mapService.transitRoute(
      origin as string,
      destination as string,
      city as string,
      cityd as string
    )
    sendSuccess(res, result, '公共交通路径规划成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '公共交通路径规划失败')
  }
}

/**
 * 距离测量
 */
export const calculateDistance = async (req: Request, res: Response) => {
  try {
    const { origins, destination, type } = req.query

    if (!origins || !destination) {
      return sendError(res, 400, '起点和终点坐标不能为空')
    }

    const result = await mapService.calculateDistance(
      origins as string,
      destination as string,
      type ? parseInt(type as string) : 1
    )
    sendSuccess(res, result, '距离计算成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '距离计算失败')
  }
}

/**
 * IP定位
 */
export const ipLocation = async (req: Request, res: Response) => {
  try {
    const { ip } = req.query

    if (!ip) {
      return sendError(res, 400, 'IP地址不能为空')
    }

    const result = await mapService.ipLocation(ip as string)
    sendSuccess(res, result, 'IP定位成功')
  } catch (error: any) {
    sendError(res, 500, error.message || 'IP定位失败')
  }
}

/**
 * 获取天气信息
 */
export const getWeather = async (req: Request, res: Response) => {
  try {
    const { city } = req.query

    if (!city) {
      return sendError(res, 400, '城市不能为空')
    }

    const result = await mapService.getWeather(city as string)
    sendSuccess(res, result, '获取天气信息成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '获取天气信息失败')
  }
}
