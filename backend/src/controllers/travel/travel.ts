import { Request, Response } from 'express'
import { sendSuccess, sendError } from '../utils/response'
import { logger } from '../utils/logger'

// 模拟目的地数据
const mockDestinations = [
  {
    id: 'dest_1',
    name: '北京',
    description: '中国首都，历史文化名城',
    image: 'https://example.com/beijing.jpg',
    location: {
      longitude: 116.4074,
      latitude: 39.9042
    },
    tags: ['历史文化', '美食', '博物馆'],
    rating: 4.8,
    review_count: 15680,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-06-01T00:00:00Z'
  },
  {
    id: 'dest_2',
    name: '上海',
    description: '国际化大都市，现代与传统交融',
    image: 'https://example.com/shanghai.jpg',
    location: {
      longitude: 121.4737,
      latitude: 31.2304
    },
    tags: ['现代都市', '购物', '美食'],
    rating: 4.7,
    review_count: 14250,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-06-01T00:00:00Z'
  },
  {
    id: 'dest_3',
    name: '杭州',
    description: '人间天堂，西湖美景',
    image: 'https://example.com/hangzhou.jpg',
    location: {
      longitude: 120.1551,
      latitude: 30.2741
    },
    tags: ['自然风光', '古镇', '美食'],
    rating: 4.9,
    review_count: 12340,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-06-01T00:00:00Z'
  }
]

// 模拟攻略数据
const mockGuides = [
  {
    id: 'guide_1',
    title: '北京三日游完美攻略',
    description: '带你玩转北京必去景点',
    image: 'https://example.com/beijing-guide.jpg',
    destination_id: 'dest_1',
    author_id: 'user_1',
    author_name: '旅行达人',
    days: 3,
    content: [
      {
        day: 1,
        title: '天安门-故宫-王府井',
        description: '上午参观天安门广场和故宫，下午逛王府井',
        pois: [
          {
            id: 'poi_1',
            name: '天安门广场',
            category: '景点',
            location: { longitude: 116.397477, latitude: 39.903738 },
            address: '北京市东城区东长安街',
            description: '世界最大的城市广场之一',
            tips: '建议早上前往，避开人流高峰'
          },
          {
            id: 'poi_2',
            name: '故宫博物院',
            category: '景点',
            location: { longitude: 116.397026, latitude: 39.918058 },
            address: '北京市东城区景山前街4号',
            description: '明清两代的皇家宫殿',
            tips: '需要提前网上预约门票'
          }
        ]
      },
      {
        day: 2,
        title: '长城-明十三陵',
        description: '游览八达岭长城和明十三陵',
        pois: [
          {
            id: 'poi_3',
            name: '八达岭长城',
            category: '景点',
            location: { longitude: 116.017, latitude: 40.357 },
            address: '北京市延庆区八达岭镇',
            description: '万里长城的重要组成部分',
            tips: '建议乘坐缆车上下，节省体力'
          }
        ]
      },
      {
        day: 3,
        title: '颐和园-圆明园',
        description: '游览皇家园林',
        pois: [
          {
            id: 'poi_4',
            name: '颐和园',
            category: '景点',
            location: { longitude: 116.273, latitude: 39.999 },
            address: '北京市海淀区新建宫门路19号',
            description: '中国古典园林之首',
            tips: '建议租借语音导览，了解更多历史'
          }
        ]
      }
    ],
    rating: 4.9,
    review_count: 856,
    view_count: 12580,
    like_count: 2340,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-06-01T00:00:00Z'
  },
  {
    id: 'guide_2',
    title: '上海美食之旅',
    description: '品味上海地道美食',
    image: 'https://example.com/shanghai-food-guide.jpg',
    destination_id: 'dest_2',
    author_id: 'user_2',
    author_name: '美食探索家',
    days: 2,
    content: [
      {
        day: 1,
        title: '南京路-城隍庙',
        description: '逛南京路，尝城隍庙小吃',
        pois: [
          {
            id: 'poi_5',
            name: '南京路步行街',
            category: '商业街',
            location: { longitude: 121.474, latitude: 31.235 },
            address: '上海市黄浦区南京东路',
            description: '上海最繁华的商业街',
            tips: '晚上灯光璀璨，适合夜游'
          }
        ]
      }
    ],
    rating: 4.7,
    review_count: 523,
    view_count: 8960,
    like_count: 1680,
    created_at: '2023-02-01T00:00:00Z',
    updated_at: '2023-06-01T00:00:00Z'
  }
]

// 获取目的地列表
export const getDestinations = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query
    
    const pageNum = Number(page)
    const limitNum = Number(limit)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    
    const results = mockDestinations.slice(startIndex, endIndex)
    
    logger.info(`获取目的地列表: 页码 ${pageNum}, 每页 ${limitNum}`)
    sendSuccess(res, {
      destinations: results,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: mockDestinations.length,
        pages: Math.ceil(mockDestinations.length / limitNum)
      }
    }, '获取目的地列表成功')
    
  } catch (error) {
    logger.error('获取目的地列表失败:', error)
    sendError(res, 500, '获取目的地列表失败')
  }
}

// 获取目的地详情
export const getDestinationDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (!id) {
      return sendError(res, 400, '目的地ID不能为空')
    }
    
    const destination = mockDestinations.find(d => d.id === id)
    
    if (!destination) {
      return sendError(res, 404, '目的地不存在')
    }
    
    logger.info(`获取目的地详情: ${id}`)
    sendSuccess(res, destination, '获取目的地详情成功')
    
  } catch (error) {
    logger.error('获取目的地详情失败:', error)
    sendError(res, 500, '获取目的地详情失败')
  }
}

// 搜索目的地
export const searchDestinations = async (req: Request, res: Response) => {
  try {
    const { keyword, page = 1, limit = 10 } = req.query
    
    const pageNum = Number(page)
    const limitNum = Number(limit)
    
    let results = mockDestinations
    
    if (keyword) {
      results = mockDestinations.filter(d => 
        d.name.includes(String(keyword)) || 
        d.description.includes(String(keyword)) ||
        d.tags.some(tag => tag.includes(String(keyword)))
      )
    }
    
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedResults = results.slice(startIndex, endIndex)
    
    logger.info(`搜索目的地: 关键词 ${keyword}, 页码 ${pageNum}`)
    sendSuccess(res, {
      destinations: paginatedResults,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: results.length,
        pages: Math.ceil(results.length / limitNum)
      }
    }, '搜索目的地成功')
    
  } catch (error) {
    logger.error('搜索目的地失败:', error)
    sendError(res, 500, '搜索目的地失败')
  }
}

// 获取攻略列表
export const getGuides = async (req: Request, res: Response) => {
  try {
    const { destination_id, page = 1, limit = 10 } = req.query
    
    const pageNum = Number(page)
    const limitNum = Number(limit)
    
    let results = mockGuides
    
    if (destination_id) {
      results = mockGuides.filter(g => g.destination_id === destination_id)
    }
    
    // 按创建时间倒序排序
    results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedResults = results.slice(startIndex, endIndex)
    
    logger.info(`获取攻略列表: 目的地 ${destination_id}, 页码 ${pageNum}`)
    sendSuccess(res, {
      guides: paginatedResults,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: results.length,
        pages: Math.ceil(results.length / limitNum)
      }
    }, '获取攻略列表成功')
    
  } catch (error) {
    logger.error('获取攻略列表失败:', error)
    sendError(res, 500, '获取攻略列表失败')
  }
}

// 获取攻略详情
export const getGuideDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (!id) {
      return sendError(res, 400, '攻略ID不能为空')
    }
    
    const guide = mockGuides.find(g => g.id === id)
    
    if (!guide) {
      return sendError(res, 404, '攻略不存在')
    }
    
    // 增加浏览次数
    guide.view_count += 1
    
    logger.info(`获取攻略详情: ${id}`)
    sendSuccess(res, guide, '获取攻略详情成功')
    
  } catch (error) {
    logger.error('获取攻略详情失败:', error)
    sendError(res, 500, '获取攻略详情失败')
  }
}

// 创建攻略
export const createGuide = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id
    
    if (!userId) {
      return sendError(res, 401, '未授权访问')
    }
    
    const { title, description, destination_id, days, content } = req.body
    
    if (!title || !description || !destination_id || !days || !content) {
      return sendError(res, 400, '缺少必要参数')
    }
    
    // 检查目的地是否存在
    const destination = mockDestinations.find(d => d.id === destination_id)
    if (!destination) {
      return sendError(res, 404, '目的地不存在')
    }
    
    // 创建新攻略
    const newGuide = {
      id: `guide_${Date.now()}`,
      title,
      description,
      image: '', // 可以后续上传
      destination_id,
      author_id: userId,
      author_name: '当前用户', // 实际应从用户信息获取
      days,
      content,
      rating: 0,
      review_count: 0,
      view_count: 0,
      like_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    mockGuides.push(newGuide)
    
    logger.info(`创建攻略: ${newGuide.id}`)
    sendSuccess(res, newGuide, '创建攻略成功')
    
  } catch (error) {
    logger.error('创建攻略失败:', error)
    sendError(res, 500, '创建攻略失败')
  }
}

// 获取推荐攻略
export const getRecommendedGuides = async (req: Request, res: Response) => {
  try {
    const { limit = 5 } = req.query
    
    const limitNum = Number(limit)
    
    // 按评分和浏览量排序，获取推荐攻略
    const recommendedGuides = [...mockGuides]
      .sort((a, b) => (b.rating * b.view_count) - (a.rating * a.view_count))
      .slice(0, limitNum)
    
    logger.info(`获取推荐攻略: 限制 ${limitNum}`)
    sendSuccess(res, recommendedGuides, '获取推荐攻略成功')
    
  } catch (error) {
    logger.error('获取推荐攻略失败:', error)
    sendError(res, 500, '获取推荐攻略失败')
  }
}