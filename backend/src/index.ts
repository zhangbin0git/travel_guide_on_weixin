import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'

// 导入路由
import rootRoutes from './routes/root'

// 导入中间件
import { errorHandler, notFoundHandler } from './middleware/error'
import { logger } from './utils/logger'

// 加载环境变量
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// 请求限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: {
    code: 429,
    message: '请求过于频繁，请稍后再试',
    data: null,
    timestamp: Date.now()
  }
})

// 中间件配置
app.use(helmet())
app.use(compression())
app.use(limiter)
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 请求日志
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// 注册路由
app.use('/', rootRoutes)

// 404处理
app.use('*', notFoundHandler)

// 错误处理中间件
app.use(errorHandler)

// 启动服务器
app.listen(PORT, () => {
  logger.info(`服务器已启动，端口: ${PORT}`)
})

export default app