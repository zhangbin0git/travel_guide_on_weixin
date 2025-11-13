import { getMCPClient } from './client'
import { logger } from '../utils/logger'

/**
 * MCP工具调用封装
 */
export class MCPTools {
  /**
   * 地理编码 - 将地址转换为经纬度坐标
   * @param address 地址
   * @param city 城市
   * @returns 地理编码结果
   */
  static async geocode(address: string, city?: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_geo', {
        address,
        city,
      })
      logger.info(`地理编码成功: ${address}`)
      return result
    } catch (error) {
      logger.error(`地理编码失败: ${address}`, error)
      throw error
    }
  }

  /**
   * 逆地理编码 - 将经纬度坐标转换为地址信息
   * @param location 坐标，格式为"经度,纬度"
   * @returns 逆地理编码结果
   */
  static async regeocode(location: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_regeocode', {
        location,
      })
      logger.info(`逆地理编码成功: ${location}`)
      return result
    } catch (error) {
      logger.error(`逆地理编码失败: ${location}`, error)
      throw error
    }
  }

  /**
   * 关键词搜索POI
   * @param keywords 搜索关键词
   * @param city 查询城市
   * @param citylimit 是否限制城市范围内搜索
   * @returns POI搜索结果
   */
  static async textSearch(keywords: string, city?: string, citylimit?: boolean) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_text_search', {
        keywords,
        city,
        citylimit,
      })
      logger.info(`关键词搜索成功: ${keywords}`)
      return result
    } catch (error) {
      logger.error(`关键词搜索失败: ${keywords}`, error)
      throw error
    }
  }

  /**
   * 周边搜索POI
   * @param keywords 搜索关键词
   * @param location 中心点坐标，格式为"经度,纬度"
   * @param radius 搜索半径，单位米
   * @returns 周边搜索结果
   */
  static async aroundSearch(keywords: string, location: string, radius?: number) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_around_search', {
        keywords,
        location,
        radius: radius?.toString(),
      })
      logger.info(`周边搜索成功: ${keywords}`)
      return result
    } catch (error) {
      logger.error(`周边搜索失败: ${keywords}`, error)
      throw error
    }
  }

  /**
   * 获取POI详细信息
   * @param id POI ID
   * @returns POI详细信息
   */
  static async getPoiDetail(id: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_search_detail', {
        id,
      })
      logger.info(`获取POI详情成功: ${id}`)
      return result
    } catch (error) {
      logger.error(`获取POI详情失败: ${id}`, error)
      throw error
    }
  }

  /**
   * 驾车路径规划
   * @param origin 起点，格式为"经度,纬度"
   * @param destination 终点，格式为"经度,纬度"
   * @returns 驾车路径规划结果
   */
  static async drivingRoute(origin: string, destination: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_direction_driving', {
        origin,
        destination,
      })
      logger.info(`驾车路径规划成功: ${origin} -> ${destination}`)
      return result
    } catch (error) {
      logger.error(`驾车路径规划失败: ${origin} -> ${destination}`, error)
      throw error
    }
  }

  /**
   * 步行路径规划
   * @param origin 起点，格式为"经度,纬度"
   * @param destination 终点，格式为"经度,纬度"
   * @returns 步行路径规划结果
   */
  static async walkingRoute(origin: string, destination: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_direction_walking', {
        origin,
        destination,
      })
      logger.info(`步行路径规划成功: ${origin} -> ${destination}`)
      return result
    } catch (error) {
      logger.error(`步行路径规划失败: ${origin} -> ${destination}`, error)
      throw error
    }
  }

  /**
   * 骑行路径规划
   * @param origin 起点，格式为"经度,纬度"
   * @param destination 终点，格式为"经度,纬度"
   * @returns 骑行路径规划结果
   */
  static async bicyclingRoute(origin: string, destination: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_direction_bicycling', {
        origin,
        destination,
      })
      logger.info(`骑行路径规划成功: ${origin} -> ${destination}`)
      return result
    } catch (error) {
      logger.error(`骑行路径规划失败: ${origin} -> ${destination}`, error)
      throw error
    }
  }

  /**
   * 公共交通路径规划
   * @param origin 起点，格式为"经度,纬度"
   * @param destination 终点，格式为"经度,纬度"
   * @param city 公共交通规划起点城市
   * @param cityd 公共交通规划终点城市
   * @returns 公共交通路径规划结果
   */
  static async transitRoute(origin: string, destination: string, city: string, cityd?: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_direction_transit_integrated', {
        origin,
        destination,
        city,
        cityd,
      })
      logger.info(`公共交通路径规划成功: ${origin} -> ${destination}`)
      return result
    } catch (error) {
      logger.error(`公共交通路径规划失败: ${origin} -> ${destination}`, error)
      throw error
    }
  }

  /**
   * 距离测量
   * @param origins 起点，格式为"经度,纬度"，可传多个坐标，使用竖线隔离
   * @param destination 终点，格式为"经度,纬度"
   * @param type 距离测量类型，1代表驾车距离测量，0代表直线距离测量，3步行距离测量
   * @returns 距离测量结果
   */
  static async distance(origins: string, destination: string, type: string = '1') {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_distance', {
        origins,
        destination,
        type,
      })
      logger.info(`距离测量成功: ${origins} -> ${destination}`)
      return result
    } catch (error) {
      logger.error(`距离测量失败: ${origins} -> ${destination}`, error)
      throw error
    }
  }

  /**
   * IP定位
   * @param ip IP地址
   * @returns IP定位结果
   */
  static async ipLocation(ip: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_ip_location', {
        ip,
      })
      logger.info(`IP定位成功: ${ip}`)
      return result
    } catch (error) {
      logger.error(`IP定位失败: ${ip}`, error)
      throw error
    }
  }

  /**
   * 天气查询
   * @param city 城市名称或者adcode
   * @returns 天气查询结果
   */
  static async weather(city: string) {
    try {
      const client = await getMCPClient()
      const result = await client.callTool('mcp_amap-sse_maps_weather', {
        city,
      })
      logger.info(`天气查询成功: ${city}`)
      return result
    } catch (error) {
      logger.error(`天气查询失败: ${city}`, error)
      throw error
    }
  }
}
