import { request } from '../utils/request'

/**
 * 首页相关API服务
 */

// 获取热门目的地列表
export const getHotDestinations = async () => {
  try {
    // 使用base64占位图片
    const beijingImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij7lvq7ljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5CYWppbmc8L3RleHQ+Cjwvc3ZnPgo='
    const shanghaiImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij7muIXljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5TaGFuZ2hhaTwvdGV4dD4KPC9zdmc+Cg='
    const chengduImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij7miJDljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5DaGVuZ2R1PC90ZXh0Pgo8L3N2Zz4K'
    const xianImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij7njrDljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5YaSdhbjwvdGV4dD4KPC9zdmc+Cg='
    const hangzhouImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij7mojC5p2M8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5IYW5nemhvdTwvdGV4dD4KPC9zdmc+Cg='
    const chongqingImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij7njq7ljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5DaG9uZ3Fpbmc8L3RleHQ+Cjwvc3ZnPgo='
    
    // 模拟数据，实际应该调用后端API
    const mockData = [
      {
        id: 1,
        name: '北京',
        image: beijingImage,
        guideCount: 128
      },
      {
        id: 2,
        name: '上海',
        image: shanghaiImage,
        guideCount: 96
      },
      {
        id: 3,
        name: '成都',
        image: chengduImage,
        guideCount: 84
      },
      {
        id: 4,
        name: '西安',
        image: xianImage,
        guideCount: 72
      },
      {
        id: 5,
        name: '杭州',
        image: hangzhouImage,
        guideCount: 65
      },
      {
        id: 6,
        name: '重庆',
        image: chongqingImage,
        guideCount: 58
      }
    ]
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      code: 200,
      message: 'success',
      data: mockData
    }
  } catch (error) {
    console.error('获取热门目的地失败:', error)
    throw error
  }
}

// 获取精选攻略列表
export const getFeaturedGuides = async () => {
  try {
    // 使用base64占位图片
    const beijingGuideImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij7lvq7ljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij7mnY7lm57mlYU8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5CZWlqaW5nIDMgZGF5cyB0b3VyPC90ZXh0Pgo8L3N2Zz4K'
    const shanghaiGuideImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij7muIXljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij7mnY7lm57mlYU8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5TaGFuZ2hhaSAyIGRheXMgdG91cjwvdGV4dD4KPC9zdmc+Cg='
    const chengduGuideImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij7miJDljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij7mnY7lm57mlYU8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5DaGVuZ2R1IDQgZGF5cyB0b3VyPC90ZXh0Pgo8L3N2Zz4K'
    const xianGuideImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij7njrDljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij7mnY7lm57mlYU8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5YaSdhbiAzIGRheXMgdG91cjwvdGV4dD4KPC9zdmc+Cg='
    
    // 模拟数据，实际应该调用后端API
    const mockData = [
      {
        id: 1,
        title: '北京3日经典游：故宫长城深度体验',
        image: beijingGuideImage,
        days: 3,
        targetAudience: '家庭出游',
        rating: 4.8,
        favoriteCount: 2341,
        isFavorited: false
      },
      {
        id: 2,
        title: '上海都市风情2日游：外滩田子坊漫步',
        image: shanghaiGuideImage,
        days: 2,
        targetAudience: '情侣出行',
        rating: 4.6,
        favoriteCount: 1856,
        isFavorited: false
      },
      {
        id: 3,
        title: '成都美食4日游：火锅熊猫完美体验',
        image: chengduGuideImage,
        days: 4,
        targetAudience: '朋友聚会',
        rating: 4.9,
        favoriteCount: 3124,
        isFavorited: true
      },
      {
        id: 4,
        title: '西安古都3日游：兵马俑大雁塔探秘',
        image: xianGuideImage,
        days: 3,
        targetAudience: '文化爱好者',
        rating: 4.7,
        favoriteCount: 1567,
        isFavorited: false
      }
    ]
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return {
      code: 200,
      message: 'success',
      data: mockData
    }
  } catch (error) {
    console.error('获取精选攻略失败:', error)
    throw error
  }
}

// 获取搜索建议
export const getSearchSuggestions = async (keyword) => {
  try {
    // 模拟搜索建议数据
    const mockSuggestions = [
      `${keyword}景点推荐`,
      `${keyword}美食攻略`,
      `${keyword}住宿推荐`,
      `${keyword}交通指南`,
      `${keyword}注意事项`
    ]
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return {
      code: 200,
      message: 'success',
      data: mockSuggestions.filter(item => item.includes(keyword))
    }
  } catch (error) {
    console.error('获取搜索建议失败:', error)
    throw error
  }
}

// 搜索攻略
export const searchGuides = async (params) => {
  try {
    const { keyword, page = 1, limit = 10 } = params
    
    // 使用base64占位图片
    const searchResultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij7mnY7lm57mlYVlZHnmoLzlvq7ljYc8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMTM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iI0NDQyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5TZWFyY2ggUmVzdWx0PC90ZXh0Pgo8L3N2Zz4K'
    
    // 模拟搜索结果
    const mockResults = [
      {
        id: 5,
        title: `${keyword}深度游：当地特色体验`,
        image: searchResultImage,
        days: 5,
        targetAudience: '深度游爱好者',
        rating: 4.5,
        favoriteCount: 892,
        isFavorited: false
      }
    ]
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return {
      code: 200,
      message: 'success',
      data: {
        list: mockResults,
        total: mockResults.length,
        page,
        limit,
        hasMore: false
      }
    }
  } catch (error) {
    console.error('搜索攻略失败:', error)
    throw error
  }
}