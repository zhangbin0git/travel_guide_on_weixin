import { MCPTools } from '../mcp/tools'
import { logger } from '../utils/logger'

/**
 * 地图服务
 */
export const mapService = {
  /**
   * 地理编码 - 将地址转换为经纬度坐标
   * @param address 地址
   * @param city 城市
   */
  async geocode(address: string, city?: string) {
    try {
      const result = await MCPTools.geocode(address, city)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        return {
          location: {
            longitude: data.location?.split(',')[0] || '',
            latitude: data.location?.split(',')[1] || '',
            address: data.address || address,
            city: data.city,
            province: data.province,
            district: data.district,
          },
        }
      }

      throw new Error('地理编码API返回数据格式错误')
    } catch (error) {
      logger.error(`地理编码失败: ${address}`, error)
      throw error
    }
  },

  /**
   * 逆地理编码 - 将经纬度坐标转换为地址信息
   * @param location 坐标，格式为"经度,纬度"
   */
  async regeocode(location: string) {
    try {
      const result = await MCPTools.regeocode(location)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        return {
          address: data.address || '',
          province: data.province || '',
          city: data.city || '',
          district: data.district || '',
          street: data.street || '',
          number: data.number || '',
          location,
        }
      }

      throw new Error('逆地理编码API返回数据格式错误')
    } catch (error) {
      logger.error(`逆地理编码失败: ${location}`, error)
      throw error
    }
  },

  /**
   * 关键词搜索POI
   * @param keywords 搜索关键词
   * @param city 查询城市
   * @param citylimit 是否限制城市范围内搜索
   */
  async textSearch(keywords: string, city?: string, citylimit?: boolean) {
    try {
      const result = await MCPTools.textSearch(keywords, city, citylimit)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        const pois =
          data.pois?.map((poi: any) => ({
            id: poi.id || '',
            name: poi.name || '',
            category: poi.type || '',
            location: {
              longitude: poi.location?.split(',')[0] || '',
              latitude: poi.location?.split(',')[1] || '',
            },
            address: poi.address || '',
            tel: poi.tel || '',
            website: poi.website || '',
            rating: poi.rating || 0,
            review_count: poi.review_count || 0,
          })) || []

        return {
          pois,
          count: data.count || pois.length,
          info: data.info || 'OK',
        }
      }

      throw new Error('关键词搜索API返回数据格式错误')
    } catch (error) {
      logger.error(`关键词搜索失败: ${keywords}`, error)
      throw error
    }
  },

  /**
   * 周边搜索POI
   * @param keywords 搜索关键词
   * @param location 中心点坐标，格式为"经度,纬度"
   * @param radius 搜索半径，单位米
   */
  async aroundSearch(keywords: string, location: string, radius?: number) {
    try {
      const result = await MCPTools.aroundSearch(keywords, location, radius)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        const pois =
          data.pois?.map((poi: any) => ({
            id: poi.id || '',
            name: poi.name || '',
            category: poi.type || '',
            location: {
              longitude: poi.location?.split(',')[0] || '',
              latitude: poi.location?.split(',')[1] || '',
            },
            address: poi.address || '',
            tel: poi.tel || '',
            distance: poi.distance || 0,
          })) || []

        return {
          pois,
          count: data.count || pois.length,
          info: data.info || 'OK',
        }
      }

      throw new Error('周边搜索API返回数据格式错误')
    } catch (error) {
      logger.error(`周边搜索失败: ${keywords}`, error)
      throw error
    }
  },

  /**
   * 获取POI详细信息
   * @param id POI ID
   */
  async getPoiDetail(id: string) {
    try {
      const result = await MCPTools.getPoiDetail(id)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        return {
          id: data.id || id,
          name: data.name || '',
          category: data.type || '',
          location: {
            longitude: data.location?.split(',')[0] || '',
            latitude: data.location?.split(',')[1] || '',
          },
          address: data.address || '',
          tel: data.tel || '',
          website: data.website || '',
          rating: data.rating || 0,
          review_count: data.review_count || 0,
          business_hours: data.business_hours || '',
          description: data.description || '',
          images: data.images || [],
        }
      }

      throw new Error('获取POI详情API返回数据格式错误')
    } catch (error) {
      logger.error(`获取POI详情失败: ${id}`, error)
      throw error
    }
  },

  /**
   * 驾车路径规划
   * @param origin 起点，格式为"经度,纬度"
   * @param destination 终点，格式为"经度,纬度"
   */
  async drivingRoute(origin: string, destination: string) {
    try {
      const result = await MCPTools.drivingRoute(origin, destination)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        const route = data.route || {}
        const steps =
          route.paths?.[0]?.steps?.map((step: any) => ({
            instruction: step.instruction || '',
            distance: step.distance || 0,
            duration: step.duration || 0,
            path: step.polyline || '',
          })) || []

        return {
          route: {
            distance: route.paths?.[0]?.distance || 0,
            duration: route.paths?.[0]?.duration || 0,
            steps,
          },
          info: data.info || 'OK',
        }
      }

      throw new Error('驾车路径规划API返回数据格式错误')
    } catch (error) {
      logger.error(`驾车路径规划失败: ${origin} -> ${destination}`, error)
      throw error
    }
  },

  /**
   * 步行路径规划
   * @param origin 起点，格式为"经度,纬度"
   * @param destination 终点，格式为"经度,纬度"
   */
  async walkingRoute(origin: string, destination: string) {
    try {
      const result = await MCPTools.walkingRoute(origin, destination)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        const route = data.route || {}
        const steps =
          route.paths?.[0]?.steps?.map((step: any) => ({
            instruction: step.instruction || '',
            distance: step.distance || 0,
            duration: step.duration || 0,
            path: step.polyline || '',
          })) || []

        return {
          route: {
            distance: route.paths?.[0]?.distance || 0,
            duration: route.paths?.[0]?.duration || 0,
            steps,
          },
          info: data.info || 'OK',
        }
      }

      throw new Error('步行路径规划API返回数据格式错误')
    } catch (error) {
      logger.error(`步行路径规划失败: ${origin} -> ${destination}`, error)
      throw error
    }
  },

  /**
   * 骑行路径规划
   * @param origin 起点，格式为"经度,纬度"
   * @param destination 终点，格式为"经度,纬度"
   */
  async bicyclingRoute(origin: string, destination: string) {
    try {
      const result = await MCPTools.bicyclingRoute(origin, destination)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        const route = data.route || {}
        const steps =
          route.paths?.[0]?.steps?.map((step: any) => ({
            instruction: step.instruction || '',
            distance: step.distance || 0,
            duration: step.duration || 0,
            path: step.polyline || '',
          })) || []

        return {
          route: {
            distance: route.paths?.[0]?.distance || 0,
            duration: route.paths?.[0]?.duration || 0,
            steps,
          },
          info: data.info || 'OK',
        }
      }

      throw new Error('骑行路径规划API返回数据格式错误')
    } catch (error) {
      logger.error(`骑行路径规划失败: ${origin} -> ${destination}`, error)
      throw error
    }
  },

  /**
   * 公共交通路径规划
   * @param origin 起点，格式为"经度,纬度"
   * @param destination 终点，格式为"经度,纬度"
   * @param city 起点城市
   * @param cityd 终点城市
   */
  async transitRoute(origin: string, destination: string, city: string, cityd: string) {
    try {
      const result = await MCPTools.transitRoute(origin, destination, city, cityd)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        const routes =
          data.plan?.routes?.map((route: any) => ({
            fare: route.price || 0,
            duration: route.duration || 0,
            steps:
              route.segments?.map((segment: any) => {
                if (segment.walking) {
                  return {
                    mode: '步行',
                    instruction: segment.walking?.instruction || '',
                    distance: segment.walking?.distance || 0,
                    duration: segment.walking?.duration || 0,
                  }
                } else if (segment.bus) {
                  return {
                    mode: '公交',
                    name: segment.bus.buslines?.[0]?.name || '',
                    departure: segment.bus.buslines?.[0]?.departure_stop?.name || '',
                    arrival: segment.bus.buslines?.[0]?.arrival_stop?.name || '',
                    distance: segment.bus.buslines?.[0]?.distance || 0,
                    duration: segment.bus.buslines?.[0]?.duration || 0,
                  }
                } else if (segment.railway) {
                  return {
                    mode: '地铁',
                    name: segment.railway.name || '',
                    departure: segment.railway.departure_stop?.name || '',
                    arrival: segment.railway.arrival_stop?.name || '',
                    distance: segment.railway.distance || 0,
                    duration: segment.railway.duration || 0,
                  }
                }
                return {
                  mode: '未知',
                  name: '',
                  distance: 0,
                  duration: 0,
                }
              }) || [],
          })) || []

        return {
          routes,
          info: data.info || 'OK',
        }
      }

      throw new Error('公共交通路径规划API返回数据格式错误')
    } catch (error) {
      logger.error(`公共交通路径规划失败: ${origin} -> ${destination}`, error)
      throw error
    }
  },

  /**
   * 距离测量
   * @param origins 起点坐标，多个坐标用竖线分隔，格式为"经度,纬度|经度,纬度"
   * @param destination 终点坐标，格式为"经度,纬度"
   * @param type 距离测量类型，1代表驾车距离测量，0代表直线距离测量，3代表步行距离测量
   */
  async calculateDistance(origins: string, destination: string, type: number = 1) {
    try {
      const result = await MCPTools.distance(origins, destination, type.toString())

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        const results =
          data.results?.map((item: any) => ({
            origin: item.origin || '',
            destination: item.destination || '',
            distance: item.distance || 0,
            duration: item.duration || 0,
          })) || []

        return {
          results,
          info: data.info || 'OK',
        }
      }

      throw new Error('距离测量API返回数据格式错误')
    } catch (error) {
      logger.error(`距离测量失败: ${origins} -> ${destination}`, error)
      throw error
    }
  },

  /**
   * IP定位
   * @param ip IP地址
   */
  async ipLocation(ip: string) {
    try {
      const result = await MCPTools.ipLocation(ip)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        return {
          ip: data.ip || ip,
          province: data.province || '',
          city: data.city || '',
          district: data.district || '',
          location: {
            longitude: data.rectangle?.split(';')[0]?.split(',')[0] || 0,
            latitude: data.rectangle?.split(';')[0]?.split(',')[1] || 0,
          },
          info: data.info || 'OK',
        }
      }

      throw new Error('IP定位API返回数据格式错误')
    } catch (error) {
      logger.error(`IP定位失败: ${ip}`, error)
      throw error
    }
  },

  /**
   * 获取天气信息
   * @param city 城市名称
   */
  async getWeather(city: string) {
    try {
      const result = await MCPTools.weather(city)

      // 处理API返回数据，转换为统一格式
      if (result && result.length > 0 && result[0].type === 'text') {
        const data = JSON.parse(result[0].text)

        return {
          city: data.city?.city || city,
          weather: {
            temperature: data.lives?.[0]?.temperature || '',
            weather: data.lives?.[0]?.weather || '',
            winddirection: data.lives?.[0]?.winddirection || '',
            windpower: data.lives?.[0]?.windpower || '',
            humidity: data.lives?.[0]?.humidity || '',
            reporttime: data.lives?.[0]?.reporttime || new Date().toISOString(),
          },
          info: data.info || 'OK',
        }
      }

      throw new Error('天气信息API返回数据格式错误')
    } catch (error) {
      logger.error(`获取天气信息失败: ${city}`, error)
      throw error
    }
  },
}
