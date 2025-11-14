/**
 * 应用配置文件
 */

// API基础配置
export const API_CONFIG = {
  // 开发环境API地址
  BASE_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://api.travel-guide.com',
  
  // 请求超时时间（毫秒）
  TIMEOUT: 10000,
  
  // 重试次数
  RETRY_COUNT: 3
}

// 导出API基础URL
export const API_BASE_URL = API_CONFIG.BASE_URL

// 微信小程序配置
export const WX_CONFIG = {
  APP_ID: process.env.WX_APP_ID || '',
  APP_SECRET: process.env.WX_APP_SECRET || ''
}

// 高德地图配置
export const AMAP_CONFIG = {
  // 高德地图Web服务API Key
  WEB_API_KEY: process.env.AMAP_WEB_API_KEY || '',
  
  // 高德地图JavaScript API Key
  JS_API_KEY: process.env.AMAP_JS_API_KEY || ''
}

// 应用基础配置
export const APP_CONFIG = {
  // 应用名称
  APP_NAME: '旅行攻略',
  
  // 应用版本
  APP_VERSION: '1.0.0',
  
  // 分页大小
  PAGE_SIZE: {
    DEFAULT: 10,
    SMALL: 5,
    LARGE: 20
  },
  
  // 缓存配置
  CACHE: {
    // 搜索历史缓存数量
    SEARCH_HISTORY_LIMIT: 10,
    
    // 数据缓存时间（毫秒）
    DATA_CACHE_TIME: 5 * 60 * 1000, // 5分钟
    
    // 图片缓存时间（毫秒）
    IMAGE_CACHE_TIME: 24 * 60 * 60 * 1000 // 24小时
  },
  
  // 路由配置
  ROUTES: {
    // 页面路径
    HOME: '/pages/home/index',
    SEARCH: '/pages/search/index',
    GUIDE_DETAIL: '/pages/guide/detail/index',
    DESTINATION_DETAIL: '/pages/destination/detail/index',
    PROFILE: '/pages/profile/index',
    
    // 跳转类型
    NAVIGATE_TYPE: {
      SWITCH_TAB: 'switchTab',
      NAVIGATE_TO: 'navigateTo',
      REDIRECT_TO: 'redirectTo',
      RE_LAUNCH: 'reLaunch'
    }
  },
  
  // 存储键名
  STORAGE_KEYS: {
    // 用户相关
    USER_TOKEN: 'user_token',
    USER_INFO: 'user_info',
    
    // 搜索相关
    SEARCH_HISTORY: 'search_history',
    SEARCH_SUGGESTIONS: 'search_suggestions',
    
    // 缓存相关
    CACHE_DESTINATIONS: 'cache_destinations',
    CACHE_GUIDES: 'cache_guides',
    CACHE_CATEGORIES: 'cache_categories',
    
    // 设置相关
    APP_SETTINGS: 'app_settings'
  },
  
  // 主题配置
  THEME: {
    // 主色调
    PRIMARY_COLOR: '#007aff',
    
    // 辅助色
    SECONDARY_COLOR: '#ff6b6b',
    
    // 背景色
    BACKGROUND_COLOR: '#f8f9fa',
    
    // 文字颜色
    TEXT_COLOR: {
      PRIMARY: '#333333',
      SECONDARY: '#666666',
      TERTIARY: '#999999',
      PLACEHOLDER: '#cccccc'
    },
    
    // 边框颜色
    BORDER_COLOR: '#e9ecef',
    
    // 阴影
    SHADOW: '0 2px 8px rgba(0, 0, 0, 0.06)'
  }
}

// 错误码定义
export const ERROR_CODES = {
  // 网络错误
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // API错误
  API_ERROR: 'API_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  
  // 业务错误
  INVALID_PARAMS: 'INVALID_PARAMS',
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  PERMISSION_DENIED: 'PERMISSION_DENIED'
}

// 错误信息映射
export const ERROR_MESSAGES = {
  [ERROR_CODES.NETWORK_ERROR]: '网络连接失败，请检查网络设置',
  [ERROR_CODES.TIMEOUT_ERROR]: '请求超时，请稍后重试',
  [ERROR_CODES.API_ERROR]: 'API调用失败，请稍后重试',
  [ERROR_CODES.AUTH_ERROR]: '身份验证失败，请重新登录',
  [ERROR_CODES.NOT_FOUND]: '请求的资源不存在',
  [ERROR_CODES.SERVER_ERROR]: '服务器内部错误，请稍后重试',
  [ERROR_CODES.INVALID_PARAMS]: '请求参数错误',
  [ERROR_CODES.DATA_NOT_FOUND]: '数据不存在',
  [ERROR_CODES.PERMISSION_DENIED]: '权限不足，无法访问'
}

// 环境配置
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test'
}

// 导出所有配置
export default {
  API_CONFIG,
  WX_CONFIG,
  AMAP_CONFIG,
  APP_CONFIG,
  ERROR_CODES,
  ERROR_MESSAGES,
  ENV_CONFIG
}