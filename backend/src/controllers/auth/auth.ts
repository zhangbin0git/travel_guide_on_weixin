import { Request, Response } from 'express'
import { sendSuccess, sendError } from '../utils/response'
import { logger } from '../utils/logger'

// 模拟用户数据
const mockUsers = [
  {
    id: 'user_1',
    openid: 'mock_openid_1',
    nickname: '旅行者小王',
    avatar: 'https://example.com/avatar1.jpg',
    gender: 1, // 1为男，2为女
    city: '北京',
    province: '北京',
    country: '中国',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-06-01T00:00:00Z',
  },
]

// 模拟JWT生成函数
const generateToken = (userId: string): string => {
  // 实际项目中应使用真实的JWT库
  return `mock_token_${userId}_${Date.now()}`
}

// 用户登录
export const login = async (req: Request, res: Response) => {
  try {
    const { code } = req.body

    if (!code) {
      return sendError(res, 400, '登录凭证不能为空')
    }

    // 实际项目中应调用微信API获取openid
    const mockOpenid = `mock_openid_${Date.now()}`

    // 查找或创建用户
    let user = mockUsers.find(u => u.openid === mockOpenid)

    if (!user) {
      // 创建新用户
      user = {
        id: `user_${Date.now()}`,
        openid: mockOpenid,
        nickname: '微信用户',
        avatar: '',
        gender: 0,
        city: '',
        province: '',
        country: '中国',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockUsers.push(user)
    }

    // 生成JWT token
    const token = generateToken(user.id)

    logger.info(`用户登录: ${user.id}`)
    sendSuccess(
      res,
      {
        user: {
          id: user.id,
          nickname: user.nickname,
          avatar: user.avatar,
        },
        token,
      },
      '登录成功'
    )
  } catch (error) {
    logger.error('用户登录失败:', error)
    sendError(res, 500, '登录失败')
  }
}

// 获取用户信息
export const getUserInfo = async (req: Request, res: Response) => {
  try {
    // 从中间件获取用户ID
    const userId = (req as any).user?.id

    if (!userId) {
      return sendError(res, 401, '未授权访问')
    }

    const user = mockUsers.find(u => u.id === userId)

    if (!user) {
      return sendError(res, 404, '用户不存在')
    }

    // 返回用户信息（不包含敏感信息）
    const userInfo = {
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      gender: user.gender,
      city: user.city,
      province: user.province,
      country: user.country,
    }

    logger.info(`获取用户信息: ${userId}`)
    sendSuccess(res, userInfo, '获取用户信息成功')
  } catch (error) {
    logger.error('获取用户信息失败:', error)
    sendError(res, 500, '获取用户信息失败')
  }
}

// 更新用户信息
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id

    if (!userId) {
      return sendError(res, 401, '未授权访问')
    }

    const { nickname, avatar, gender, city, province } = req.body

    const userIndex = mockUsers.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      return sendError(res, 404, '用户不存在')
    }

    // 更新用户信息
    const user = mockUsers[userIndex]

    if (nickname !== undefined) user.nickname = nickname
    if (avatar !== undefined) user.avatar = avatar
    if (gender !== undefined) user.gender = gender
    if (city !== undefined) user.city = city
    if (province !== undefined) user.province = province

    user.updated_at = new Date().toISOString()

    // 返回更新后的用户信息
    const userInfo = {
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      gender: user.gender,
      city: user.city,
      province: user.province,
      country: user.country,
    }

    logger.info(`更新用户信息: ${userId}`)
    sendSuccess(res, userInfo, '更新用户信息成功')
  } catch (error) {
    logger.error('更新用户信息失败:', error)
    sendError(res, 500, '更新用户信息失败')
  }
}

// 用户登出
export const logout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id

    if (!userId) {
      return sendError(res, 401, '未授权访问')
    }

    // 实际项目中可以将token加入黑名单
    logger.info(`用户登出: ${userId}`)
    sendSuccess(res, null, '登出成功')
  } catch (error) {
    logger.error('用户登出失败:', error)
    sendError(res, 500, '登出失败')
  }
}
