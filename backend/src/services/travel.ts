import { TravelDestination, TravelGuide, TravelPlan, User } from '../types'

/**
 * 旅行服务
 */
export const travelService = {
  /**
   * 获取目的地列表
   */
  async getDestinations(params: {
    page: number
    limit: number
    keyword?: string
  }): Promise<{ data: TravelDestination[], total: number }> {
    // 模拟数据，实际项目中应该从数据库获取
    const destinations: TravelDestination[] = [
      {
        id: 'dest_1',
        name: '北京',
        description: '中国首都，历史文化名城，拥有故宫、长城等著名景点',
        images: [
          'https://example.com/beijing1.jpg',
          'https://example.com/beijing2.jpg'
        ],
        location: {
          longitude: 116.4074,
          latitude: 39.9042,
          address: '北京市'
        },
        city: '北京',
        province: '北京市',
        tags: ['历史文化', '首都', '美食', '古迹'],
        rating: 4.8,
        review_count: 12580,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 'dest_2',
        name: '上海',
        description: '国际化大都市，现代与传统交融，拥有外滩、东方明珠等景点',
        images: [
          'https://example.com/shanghai1.jpg',
          'https://example.com/shanghai2.jpg'
        ],
        location: {
          longitude: 121.4737,
          latitude: 31.2304,
          address: '上海市'
        },
        city: '上海',
        province: '上海市',
        tags: ['现代都市', '购物', '美食', '夜景'],
        rating: 4.7,
        review_count: 10250,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 'dest_3',
        name: '成都',
        description: '天府之国，美食之都，大熊猫故乡，悠闲的生活方式',
        images: [
          'https://example.com/chengdu1.jpg',
          'https://example.com/chengdu2.jpg'
        ],
        location: {
          longitude: 104.0668,
          latitude: 30.5728,
          address: '成都市'
        },
        city: '成都',
        province: '四川省',
        tags: ['美食', '大熊猫', '休闲', '文化'],
        rating: 4.6,
        review_count: 8960,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      }
    ]

    let filteredDestinations = destinations

    // 如果有关键词，进行搜索过滤
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase()
      filteredDestinations = destinations.filter(dest => 
        dest.name.toLowerCase().includes(keyword) || 
        dest.description.toLowerCase().includes(keyword) ||
        dest.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    }

    // 分页处理
    const startIndex = (params.page - 1) * params.limit
    const endIndex = startIndex + params.limit
    const paginatedDestinations = filteredDestinations.slice(startIndex, endIndex)

    return {
      data: paginatedDestinations,
      total: filteredDestinations.length
    }
  },

  /**
   * 根据ID获取目的地详情
   */
  async getDestinationById(id: string): Promise<TravelDestination | null> {
    // 模拟数据，实际项目中应该从数据库获取
    const destinations: TravelDestination[] = [
      {
        id: 'dest_1',
        name: '北京',
        description: '中国首都，历史文化名城，拥有故宫、长城等著名景点',
        images: [
          'https://example.com/beijing1.jpg',
          'https://example.com/beijing2.jpg'
        ],
        location: {
          longitude: 116.4074,
          latitude: 39.9042,
          address: '北京市'
        },
        city: '北京',
        province: '北京市',
        tags: ['历史文化', '首都', '美食', '古迹'],
        rating: 4.8,
        review_count: 12580,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      }
    ]

    return destinations.find(dest => dest.id === id) || null
  },

  /**
   * 搜索目的地
   */
  async searchDestinations(params: {
    keyword: string
    page: number
    limit: number
  }): Promise<{ data: TravelDestination[], total: number }> {
    // 模拟数据，实际项目中应该从数据库获取
    const destinations: TravelDestination[] = [
      {
        id: 'dest_1',
        name: '北京',
        description: '中国首都，历史文化名城，拥有故宫、长城等著名景点',
        images: [
          'https://example.com/beijing1.jpg',
          'https://example.com/beijing2.jpg'
        ],
        location: {
          longitude: 116.4074,
          latitude: 39.9042,
          address: '北京市'
        },
        city: '北京',
        province: '北京市',
        tags: ['历史文化', '首都', '美食', '古迹'],
        rating: 4.8,
        review_count: 12580,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 'dest_2',
        name: '上海',
        description: '国际化大都市，现代与传统交融，拥有外滩、东方明珠等景点',
        images: [
          'https://example.com/shanghai1.jpg',
          'https://example.com/shanghai2.jpg'
        ],
        location: {
          longitude: 121.4737,
          latitude: 31.2304,
          address: '上海市'
        },
        city: '上海',
        province: '上海市',
        tags: ['现代都市', '购物', '美食', '夜景'],
        rating: 4.7,
        review_count: 10250,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      }
    ]

    const keyword = params.keyword.toLowerCase()
    const filteredDestinations = destinations.filter(dest => 
      dest.name.toLowerCase().includes(keyword) || 
      dest.description.toLowerCase().includes(keyword) ||
      dest.tags.some(tag => tag.toLowerCase().includes(keyword))
    )

    // 分页处理
    const startIndex = (params.page - 1) * params.limit
    const endIndex = startIndex + params.limit
    const paginatedDestinations = filteredDestinations.slice(startIndex, endIndex)

    return {
      data: paginatedDestinations,
      total: filteredDestinations.length
    }
  },

  /**
   * 获取旅行攻略列表
   */
  async getGuides(params: {
    page: number
    limit: number
    destinationId?: string
    category?: string
  }): Promise<{ data: TravelGuide[], total: number }> {
    // 模拟数据，实际项目中应该从数据库获取
    const guides: TravelGuide[] = [
      {
        id: 'guide_1',
        title: '北京三日游完美攻略',
        description: '带你游览北京最经典的景点，品尝地道美食',
        content: '第一天：故宫-天安门广场-王府井\n第二天：长城-明十三陵\n第三天：颐和园-圆明园-天坛',
        cover_image: 'https://example.com/beijing-guide.jpg',
        author: {
          id: 'user_1',
          openid: 'openid_1',
          nickname: '旅行达人',
          avatar: 'https://example.com/avatar1.jpg',
          gender: 1,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        destination: {
          id: 'dest_1',
          name: '北京',
          description: '中国首都，历史文化名城，拥有故宫、长城等著名景点',
          images: [
            'https://example.com/beijing1.jpg',
            'https://example.com/beijing2.jpg'
          ],
          location: {
            longitude: 116.4074,
            latitude: 39.9042,
            address: '北京市'
          },
          city: '北京',
          province: '北京市',
          tags: ['历史文化', '首都', '美食', '古迹'],
          rating: 4.8,
          review_count: 12580,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        tags: ['经典路线', '美食', '文化'],
        view_count: 1580,
        like_count: 320,
        is_public: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 'guide_2',
        title: '上海周末游攻略',
        description: '体验上海的繁华与浪漫，感受国际化大都市的魅力',
        content: '第一天：外滩-南京路-豫园\n第二天：东方明珠-上海科技馆-田子坊',
        cover_image: 'https://example.com/shanghai-guide.jpg',
        author: {
          id: 'user_2',
          openid: 'openid_2',
          nickname: '城市漫步者',
          avatar: 'https://example.com/avatar2.jpg',
          gender: 2,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        destination: {
          id: 'dest_2',
          name: '上海',
          description: '国际化大都市，现代与传统交融，拥有外滩、东方明珠等景点',
          images: [
            'https://example.com/shanghai1.jpg',
            'https://example.com/shanghai2.jpg'
          ],
          location: {
            longitude: 121.4737,
            latitude: 31.2304,
            address: '上海市'
          },
          city: '上海',
          province: '上海市',
          tags: ['现代都市', '购物', '美食', '夜景'],
          rating: 4.7,
          review_count: 10250,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        tags: ['城市游', '购物', '夜景'],
        view_count: 980,
        like_count: 210,
        is_public: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      }
    ]

    let filteredGuides = guides

    // 按目的地筛选
    if (params.destinationId) {
      filteredGuides = guides.filter(guide => guide.destination.id === params.destinationId)
    }

    // 按分类筛选
    if (params.category) {
      filteredGuides = filteredGuides.filter(guide => 
        guide.tags.some(tag => tag.includes(params.category as string))
      )
    }

    // 按创建时间倒序排列
    filteredGuides.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // 分页处理
    const startIndex = (params.page - 1) * params.limit
    const endIndex = startIndex + params.limit
    const paginatedGuides = filteredGuides.slice(startIndex, endIndex)

    return {
      data: paginatedGuides,
      total: filteredGuides.length
    }
  },

  /**
   * 根据ID获取攻略详情
   */
  async getGuideById(id: string): Promise<TravelGuide | null> {
    // 模拟数据，实际项目中应该从数据库获取
    const guides: TravelGuide[] = [
      {
        id: 'guide_1',
        title: '北京三日游完美攻略',
        description: '带你游览北京最经典的景点，品尝地道美食',
        content: '第一天：故宫-天安门广场-王府井\n第二天：长城-明十三陵\n第三天：颐和园-圆明园-天坛',
        cover_image: 'https://example.com/beijing-guide.jpg',
        author: {
          id: 'user_1',
          openid: 'openid_1',
          nickname: '旅行达人',
          avatar: 'https://example.com/avatar1.jpg',
          gender: 1,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        destination: {
          id: 'dest_1',
          name: '北京',
          description: '中国首都，历史文化名城，拥有故宫、长城等著名景点',
          images: [
            'https://example.com/beijing1.jpg',
            'https://example.com/beijing2.jpg'
          ],
          location: {
            longitude: 116.4074,
            latitude: 39.9042,
            address: '北京市'
          },
          city: '北京',
          province: '北京市',
          tags: ['历史文化', '首都', '美食', '古迹'],
          rating: 4.8,
          review_count: 12580,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        tags: ['经典路线', '美食', '文化'],
        view_count: 1580,
        like_count: 320,
        is_public: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      }
    ]

    const guide = guides.find(g => g.id === id)
    
    // 增加浏览量
    if (guide) {
      guide.view_count += 1
    }
    
    return guide || null
  },

  /**
   * 创建攻略
   */
  async createGuide(params: {
    title: string
    description: string
    content: string
    destinationId: string
    tags?: string[]
    authorId: string
  }): Promise<TravelGuide> {
    // 模拟获取目的地信息
    const destination = await this.getDestinationById(params.destinationId)
    if (!destination) {
      throw new Error('目的地不存在')
    }

    // 模拟获取用户信息
    const author: User = {
      id: params.authorId,
      openid: `openid_${params.authorId}`,
      nickname: '用户' + params.authorId,
      avatar: 'https://example.com/default-avatar.jpg',
      gender: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // 创建新攻略
    const newGuide: TravelGuide = {
      id: `guide_${Date.now()}`,
      title: params.title,
      description: params.description,
      content: params.content,
      cover_image: 'https://example.com/default-guide.jpg', // 默认封面
      author,
      destination,
      tags: params.tags || [],
      view_count: 0,
      like_count: 0,
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // 实际项目中应该保存到数据库
    return newGuide
  },

  /**
   * 获取推荐攻略
   */
  async getRecommendedGuides(params: {
    limit: number
  }): Promise<TravelGuide[]> {
    // 模拟数据，实际项目中应该从数据库获取
    const guides: TravelGuide[] = [
      {
        id: 'guide_1',
        title: '北京三日游完美攻略',
        description: '带你游览北京最经典的景点，品尝地道美食',
        content: '第一天：故宫-天安门广场-王府井\n第二天：长城-明十三陵\n第三天：颐和园-圆明园-天坛',
        cover_image: 'https://example.com/beijing-guide.jpg',
        author: {
          id: 'user_1',
          openid: 'openid_1',
          nickname: '旅行达人',
          avatar: 'https://example.com/avatar1.jpg',
          gender: 1,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        destination: {
          id: 'dest_1',
          name: '北京',
          description: '中国首都，历史文化名城，拥有故宫、长城等著名景点',
          images: [
            'https://example.com/beijing1.jpg',
            'https://example.com/beijing2.jpg'
          ],
          location: {
            longitude: 116.4074,
            latitude: 39.9042,
            address: '北京市'
          },
          city: '北京',
          province: '北京市',
          tags: ['历史文化', '首都', '美食', '古迹'],
          rating: 4.8,
          review_count: 12580,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        tags: ['经典路线', '美食', '文化'],
        view_count: 1580,
        like_count: 320,
        is_public: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 'guide_2',
        title: '上海周末游攻略',
        description: '体验上海的繁华与浪漫，感受国际化大都市的魅力',
        content: '第一天：外滩-南京路-豫园\n第二天：东方明珠-上海科技馆-田子坊',
        cover_image: 'https://example.com/shanghai-guide.jpg',
        author: {
          id: 'user_2',
          openid: 'openid_2',
          nickname: '城市漫步者',
          avatar: 'https://example.com/avatar2.jpg',
          gender: 2,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        destination: {
          id: 'dest_2',
          name: '上海',
          description: '国际化大都市，现代与传统交融，拥有外滩、东方明珠等景点',
          images: [
            'https://example.com/shanghai1.jpg',
            'https://example.com/shanghai2.jpg'
          ],
          location: {
            longitude: 121.4737,
            latitude: 31.2304,
            address: '上海市'
          },
          city: '上海',
          province: '上海市',
          tags: ['现代都市', '购物', '美食', '夜景'],
          rating: 4.7,
          review_count: 10250,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        },
        tags: ['城市游', '购物', '夜景'],
        view_count: 980,
        like_count: 210,
        is_public: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      }
    ]

    // 按浏览量和点赞数排序，获取推荐攻略
    const sortedGuides = [...guides].sort((a, b) => {
      // 综合评分：浏览量 * 0.3 + 点赞数 * 0.7
      const scoreA = a.view_count * 0.3 + a.like_count * 0.7
      const scoreB = b.view_count * 0.3 + b.like_count * 0.7
      return scoreB - scoreA
    })

    return sortedGuides.slice(0, params.limit)
  },

  /**
   * 获取旅行计划列表
   */
  async getTravelPlans(params: {
    page: number
    limit: number
    userId: string
  }): Promise<{ data: TravelPlan[], total: number }> {
    // 模拟数据，实际项目中应该从数据库获取
    const plans: TravelPlan[] = [
      {
        id: 'plan_1',
        title: '北京三日游',
        destination: '北京',
        start_date: '2023-10-01',
        end_date: '2023-10-03',
        days: 3,
        budget: 3000,
        notes: '国庆期间，提前预订酒店',
        user_id: 'user_1',
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      },
      {
        id: 'plan_2',
        title: '上海周末游',
        destination: '上海',
        start_date: '2023-11-10',
        end_date: '2023-11-12',
        days: 2,
        budget: 2000,
        notes: '周末出行，提前规划路线',
        user_id: 'user_1',
        created_at: '2023-10-01T00:00:00Z',
        updated_at: '2023-10-01T00:00:00Z'
      }
    ]

    // 按用户ID筛选
    const filteredPlans = plans.filter(plan => plan.user_id === params.userId)

    // 按创建时间倒序排列
    filteredPlans.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // 分页处理
    const startIndex = (params.page - 1) * params.limit
    const endIndex = startIndex + params.limit
    const paginatedPlans = filteredPlans.slice(startIndex, endIndex)

    return {
      data: paginatedPlans,
      total: filteredPlans.length
    }
  },

  /**
   * 根据ID获取旅行计划详情
   */
  async getTravelPlanById(id: string): Promise<TravelPlan | null> {
    // 模拟数据，实际项目中应该从数据库获取
    const plans: TravelPlan[] = [
      {
        id: 'plan_1',
        title: '北京三日游',
        destination: '北京',
        start_date: '2023-10-01',
        end_date: '2023-10-03',
        days: 3,
        budget: 3000,
        notes: '国庆期间，提前预订酒店',
        user_id: 'user_1',
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ]

    return plans.find(plan => plan.id === id) || null
  },

  /**
   * 创建旅行计划
   */
  async createTravelPlan(params: {
    title: string
    destination: string
    startDate: string
    endDate: string
    days: number
    budget?: number
    notes?: string
    userId: string
  }): Promise<TravelPlan> {
    // 创建新计划
    const newPlan: TravelPlan = {
      id: `plan_${Date.now()}`,
      title: params.title,
      destination: params.destination,
      start_date: params.startDate,
      end_date: params.endDate,
      days: params.days,
      budget: params.budget,
      notes: params.notes,
      user_id: params.userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // 实际项目中应该保存到数据库
    return newPlan
  },

  /**
   * 生成AI旅行攻略
   */
  async generateTravelGuide(params: {
    destination: string
    days: number
    budget?: number
    interests?: string[]
    travelStyle?: string
  }): Promise<any> {
    // 模拟AI生成攻略，实际项目中应该调用大模型API
    const generatedGuide = {
      id: `guide_${Date.now()}`,
      title: `${params.destination}${params.days}日游AI攻略`,
      description: `基于您的需求生成的${params.destination}${params.days}日游攻略`,
      content: `第一天：抵达${params.destination}，入住酒店，游览市中心\n第二天：参观著名景点，体验当地文化\n第三天：自由活动，购买纪念品，返程`,
      cover_image: 'https://example.com/ai-generated-guide.jpg',
      tags: ['AI生成', params.travelStyle || '休闲游'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    return generatedGuide
  }
}