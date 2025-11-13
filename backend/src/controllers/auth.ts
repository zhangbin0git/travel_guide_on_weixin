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
      return sendError(res, 400, '登录凭证不能为空')
    }
    
    const result = await authService.login(code)
    sendSuccess(res, result, '登录成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '登录失败')
  }
}

/**
 * 获取用户信息
 */
export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return sendError(res, 401, '用户未登录')
    }
    
    const userInfo = await authService.getUserInfo(userId)
    sendSuccess(res, userInfo, '获取用户信息成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '获取用户信息失败')
  }
}

/**
 * 更新用户信息
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return sendError(res, 401, '用户未登录')
    }
    
    const updateData = req.body
    const updatedUser = await authService.updateUser(userId, updateData)
    sendSuccess(res, updatedUser, '更新用户信息成功')
  } catch (error: any) {
    sendError(res, 500, error.message || '更新用户信息失败')
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
    sendError(res, 500, error.message || '登出失败')
  }
}