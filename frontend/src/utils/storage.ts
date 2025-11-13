import Taro from '@tarojs/taro'

// 本地存储封装
const storage = {
  // 设置存储
  set(key: string, data: unknown): void {
    try {
      if (typeof data === 'object') {
        Taro.setStorageSync(key, JSON.stringify(data))
      } else {
        Taro.setStorageSync(key, data)
      }
    } catch (error) {
      console.error('存储数据失败:', error)
    }
  },

  // 获取存储
  get(key: string): unknown {
    try {
      const data = Taro.getStorageSync(key)
      if (!data) return null
      try {
        return JSON.parse(data)
      } catch {
        return data
      }
    } catch (error) {
      console.error('获取存储数据失败:', error)
      return null
    }
  },

  // 删除存储
  remove(key: string): void {
    try {
      Taro.removeStorageSync(key)
    } catch (error) {
      console.error('删除存储数据失败:', error)
    }
  },

  // 清空存储
  clear(): void {
    try {
      Taro.clearStorageSync()
    } catch (error) {
      console.error('清空存储数据失败:', error)
    }
  },
}

export default storage
