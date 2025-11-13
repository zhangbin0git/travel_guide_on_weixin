import { Router } from 'express'
import { login, getUserInfo, updateUser, logout } from '../controllers/auth'
import { authenticate } from '../middleware/auth'
import { validateBody } from '../middleware/validation'
import { loginSchema, updateUserInfoSchema } from '../utils/validation-rules'

const router = Router()

/**
 * @route POST /api/auth/login
 * @desc 微信小程序登录
 * @access Public
 */
router.post('/login', validateBody(loginSchema), login)

/**
 * @route GET /api/auth/user
 * @desc 获取用户信息
 * @access Private
 */
router.get('/user', authenticate, getUserInfo)

/**
 * @route PUT /api/auth/user
 * @desc 更新用户信息
 * @access Private
 */
router.put('/user', authenticate, validateBody(updateUserInfoSchema), updateUser)

/**
 * @route POST /api/auth/logout
 * @desc 用户登出
 * @access Private
 */
router.post('/logout', authenticate, logout)

export default router