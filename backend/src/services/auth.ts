import jwt from 'jsonwebtoken'
import { User } from '../types'

// 模拟用户数据，实际项目中应该从数据库获取
const users: User[] = []

/**
 * 生成JWT令牌
 */
const generateToken = (user: User): string => {
  const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  
  return jwt.sign(
    { 
      id: user.id, 
      openid: user.openid,
      nickname: user.nickname,
      avatar: user.avatar
    },
    jwtSecret,
    { expiresIn }
  )
}

/**
 * 认证服务
 */
export const authService = {
  /**
   * 用户登录
   * @param code 微信登录凭证
   */
  async login(code: string) {
    // 这里应该调用微信API获取openid和session_key
    // 为了演示，我们模拟一个用户
    const openid = `mock_openid_${Date.now()}`
    
    // 检查用户是否已存在
    let user = users.find(u => u.openid === openid)
    
    if (!user) {
      // 创建新用户
      user = {
        id: `user_${Date.now()}`,
        openid,
        nickname: '微信用户',
        avatar: 'https://example.com/default-avatar.png',
        gender: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      users.push(user)
    }
    
    // 生成JWT令牌
    const token = generateToken(user)
    
    // 返回用户信息和令牌
    return {
      token,
      userInfo: user
    }
  },

  /**
   * 获取用户信息
   * @param userId 用户ID
   */
  async getUserInfo(userId: string) {
    const user = users.find(u => u.id === userId)
    
    if (!user) {
      throw new Error('用户不存在')
    }
    
    return user
  },

  /**
   * 更新用户信息
   * @param userId 用户ID
   * @param updateData 更新数据
   */
  async updateUser(userId: string, updateData: Partial<User>) {
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('用户不存在')
    }
    
    // 更新用户信息
    const updatedUser = {
      ...users[userIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    }
    
    users[userIndex] = updatedUser
    
    return updatedUser
  }
}