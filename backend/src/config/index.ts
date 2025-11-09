import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

/**
 * 应用配置
 */
export const config = {
  // 服务器配置
  port: parseInt(process.env.PORT || '9000', 10),
  env: process.env.NODE_ENV || 'development',
  
  // 日志配置
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // API配置
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:9000',
  
  // MCP配置
  mcpServerUrl: process.env.MCP_SERVER_URL || 'https://mcp.amap.com/sse',
  amapApiKey: process.env.AMAP_API_KEY || '',
  
  // 千问大模型配置
  qianwenApiKey: process.env.QIANWEN_API_KEY || '',
  qianwenApiUrl: process.env.QIANWEN_API_URL || 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
  
  // 微信小程序配置
  wechatAppId: process.env.WECHAT_APP_ID || '',
  wechatAppSecret: process.env.WECHAT_APP_SECRET || '',
};