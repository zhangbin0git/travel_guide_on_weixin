import { User } from '../types'
import { get, post } from '../utils/request'

// 用户登录
export const login = async (code: string): Promise<{ token: string; userInfo: User }> => {
  return post('/auth/login', { code })
}

// 获取用户信息
export const getUserInfo = async (): Promise<User> => {
  return get('/auth/userinfo')
}

// 更新用户信息
export const updateUserInfo = async (userInfo: Partial<User>): Promise<User> => {
  return post('/auth/update', userInfo)
}

// 用户登出
export const logout = async (): Promise<void> => {
  return post('/auth/logout')
}