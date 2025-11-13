import Taro from '@tarojs/taro'

// 本地存储封装
const storage = {
  // 设置存储
  set(key: string, data: any): void {
    try {
      if (typeof data === 'object') {
        Taro.setStorageSync(key, JSON.stringify(data))
      } else {
        Taro.setStorageSync(key, data)
      }
    } catch (e) {
      console.error('存储数据失败:', e)
    }
  },

  // 获取存储
  get(key: string): any {
    try {
      const data = Taro.getStorageSync(key)
      if (!data) return null
      try {
        return JSON.parse(data)
      } catch (e) {
        return data
      }
    } catch (e) {
      console.error('获取存储数据失败:', e)
      return null
    }
  },

  // 删除存储
  remove(key: string): void {
    try {
      Taro.removeStorageSync(key)
    } catch (e) {
      console.error('删除存储数据失败:', e)
    }
  },

  // 清空存储
  clear(): void {
    try {
      Taro.clearStorageSync()
    } catch (e) {
      console.error('清空存储数据失败:', e)
    }
  }
}

export default storage