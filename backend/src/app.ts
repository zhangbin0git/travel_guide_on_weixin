import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import { logger } from './utils/logger'
import { errorHandler, notFoundHandler } from './middleware/error'
import { corsMiddleware } from './middleware/cors'
import { requestLogger } from './middleware/logger'
import routes from './routes'

// 加载环境变量
config()

const app = express()

// 安全中间件
app.use(helmet())

// 压缩中间件
app.use(compression())

// 请求限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: {
    code: 429,
    message: '请求过于频繁，请稍后再试',
    data: null,
    timestamp: Date.now(),
  },
})
app.use(limiter)

// CORS配置
app.use(corsMiddleware)

// 请求体解析
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 请求日志
app.use(requestLogger)

// 注册路由
app.use('/api', routes)

// 404处理
app.use('*', notFoundHandler)

// 错误处理中间件
app.use(errorHandler)

export default app
