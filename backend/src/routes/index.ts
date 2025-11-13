import { Router } from 'express'
import authRoutes from './auth'
import travelRoutes from './travel'
import mapRoutes from './map'

const router = Router()

// 注册各模块路由
router.use('/auth', authRoutes)
router.use('/travel', travelRoutes)
router.use('/map', mapRoutes)

export default router