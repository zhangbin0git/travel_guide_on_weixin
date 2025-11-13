import { Router } from 'express'
import { login, getUserInfo, updateUser, logout } from '../controllers/auth'
import { authenticateToken } from '../middleware/auth'

const router = Router()

/**
 * @route POST /api/auth/login
 * @desc 微信小程序登录
 * @access Public
 */
router.post('/login', login)

/**
 * @route GET /api/auth/user
 * @desc 获取用户信息
 * @access Private
 */
router.get('/user', authenticateToken, getUserInfo)

/**
 * @route PUT /api/auth/user
 * @desc 更新用户信息
 * @access Private
 */
router.put('/user', authenticateToken, updateUser)

/**
 * @route POST /api/auth/logout
 * @desc 用户登出
 * @access Private
 */
router.post('/logout', authenticateToken, logout)

export default router