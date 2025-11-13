/**
 * 系统服务
 */
export const systemService = {
  /**
   * 获取系统健康状态
   * @returns 健康状态数据
   */
  getHealthStatus: async () => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
      }
    }
  },

  /**
   * 获取API信息
   * @returns API信息数据
   */
  getApiInfo: async () => {
    return {
      name: '旅行攻略微信小程序API',
      version: '1.0.0',
      description: '基于高德地图MCP API的旅行攻略服务',
      endpoints: {
        auth: {
          'POST /auth/login': '用户登录',
          'GET /auth/userinfo': '获取用户信息',
          'POST /auth/update': '更新用户信息',
          'POST /auth/logout': '用户登出'
        },
        travel: {
          'GET /travel/destinations': '获取目的地列表',
          'GET /travel/destinations/:id': '获取目的地详情',
          'GET /travel/destinations/search': '搜索目的地',
          'GET /travel/guides': '获取攻略列表',
          'GET /travel/guides/:id': '获取攻略详情',
          'POST /travel/guides': '创建攻略',
          'GET /travel/guides/recommended': '获取推荐攻略'
        },
        map: {
          'GET /map/geocode': '地理编码',
          'GET /map/regeocode': '逆地理编码',
          'GET /map/poi/search': 'POI搜索',
          'GET /map/around': '周边搜索',
          'GET /map/driving': '驾车路径规划',
          'GET /map/walking': '步行路径规划',
          'GET /map/bicycling': '骑行路径规划',
          'GET /map/distance': '距离测量'
        }
      }
    }
  }
}