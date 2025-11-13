import { Request, Response } from 'express'
import { sendSuccess, sendError } from '../utils/response'
import { authService } from '../services/auth'

/**
 * 微信小程序登录
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { code } = req.body

    if (!code) {
      return sendError(res, '微信授权码不能为空', 400)
    }

    const result = await authService.login(code)
    sendSuccess(res, result, '登录成功')
  } catch (error: any) {
    sendError(res, error.message || '登录失败', 500)
  }
}

/**
 * 获取用户信息
 */
export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return sendError(res, '用户未登录', 401)
    }

    const userInfo = await authService.getUserInfo(userId)
    sendSuccess(res, userInfo, '获取用户信息成功')
  } catch (error: any) {
    sendError(res, error.message || '获取用户信息失败', 500)
  }
}

/**
 * 更新用户信息
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return sendError(res, '用户未登录', 401)
    }

    const updateData = req.body
    const updatedUser = await authService.updateUser(userId, updateData)
    sendSuccess(res, updatedUser, '更新用户信息成功')
  } catch (error: any) {
    sendError(res, error.message || '更新用户信息失败', 500)
  }
}

/**
 * 用户登出
 */
export const logout = async (req: Request, res: Response) => {
  try {
    // 在实际应用中，可以将token加入黑名单
    sendSuccess(res, null, '登出成功')
  } catch (error: any) {
    sendError(res, error.message || '登出失败', 500)
  }
}
