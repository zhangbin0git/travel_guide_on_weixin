import cors from 'cors';
import { config } from '../config';

/**
 * CORS中间件配置
 */
export const corsMiddleware = cors({
  // 允许的源
  origin: (origin, callback) => {
    // 开发环境允许所有源
    if (config.env === 'development') {
      return callback(null, true);
    }
    
    // 生产环境可以配置允许的源列表
    const allowedOrigins = [
      'https://your-domain.com',
      // 添加其他允许的域名
    ];
    
    // 允许没有origin的请求（如移动应用）
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('不被CORS策略允许'), false);
    }
  },
  
  // 允许的HTTP方法
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  
  // 允许的请求头
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  
  // 是否允许携带凭证
  credentials: true,
  
  // 预检请求的缓存时间（秒）
  maxAge: 86400, // 24小时
});