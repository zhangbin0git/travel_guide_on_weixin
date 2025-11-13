import { Router } from 'express'
import { login, getUserInfo, updateUserInfo, logout } from './auth'

const router = Router()

// 登录
router.post('/login', login)

// 获取用户信息
router.get('/userinfo', getUserInfo)

// 更新用户信息
router.post('/update', updateUserInfo)

// 登出
router.post('/logout', logout)

export default router