/**
 * 本地存储工具类
 * 封装微信小程序的本地存储API
 */
import Taro from '@tarojs/taro'

class Storage {
  /**
   * 设置存储数据
   * @param {string} key 存储键
   * @param {any} data 存储数据
   * @param {number} expire 过期时间（毫秒），可选
   */
  async set(key, data, expire) {
    try {
      const storageData = {
        data,
        timestamp: Date.now(),
        expire: expire ? Date.now() + expire : null
      }
      
      await Taro.setStorage({
        key,
        data: JSON.stringify(storageData)
      })
      
      return true
    } catch (error) {
      console.error('存储数据失败:', error)
      return false
    }
  }

  /**
   * 获取存储数据
   * @param {string} key 存储键
   * @returns {any} 存储数据，如果过期或不存在返回null
   */
  async get(key) {
    try {
      const res = await Taro.getStorage({ key })
      const storageData = JSON.parse(res.data)
      
      // 检查是否过期
      if (storageData.expire && Date.now() > storageData.expire) {
        await this.remove(key)
        return null
      }
      
      return storageData.data
    } catch (error) {
      // 数据不存在或解析失败
      return null
    }
  }

  /**
   * 同步设置存储数据
   * @param {string} key 存储键
   * @param {any} data 存储数据
   */
  setSync(key, data) {
    try {
      if (typeof data === 'object') {
        Taro.setStorageSync(key, JSON.stringify(data))
      } else {
        Taro.setStorageSync(key, data)
      }
    } catch (error) {
      console.error('存储数据失败:', error)
    }
  }

  /**
   * 同步获取存储数据
   * @param {string} key 存储键
   * @returns {any} 存储数据
   */
  getSync(key) {
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
  }

  /**
   * 删除存储数据
   * @param {string} key 存储键
   */
  async remove(key) {
    try {
      await Taro.removeStorage({ key })
      return true
    } catch (error) {
      console.error('删除存储数据失败:', error)
      return false
    }
  }

  /**
   * 同步删除存储数据
   * @param {string} key 存储键
   */
  removeSync(key) {
    try {
      Taro.removeStorageSync(key)
    } catch (error) {
      console.error('删除存储数据失败:', error)
    }
  }

  /**
   * 清空所有存储数据
   */
  async clear() {
    try {
      await Taro.clearStorage()
      return true
    } catch (error) {
      console.error('清空存储数据失败:', error)
      return false
    }
  }

  /**
   * 同步清空所有存储数据
   */
  clearSync() {
    try {
      Taro.clearStorageSync()
    } catch (error) {
      console.error('清空存储数据失败:', error)
    }
  }

  /**
   * 获取存储信息
   * @returns {object} 存储信息
   */
  async getInfo() {
    try {
      const info = await Taro.getStorageInfo()
      return info
    } catch (error) {
      console.error('获取存储信息失败:', error)
      return null
    }
  }

  /**
   * 检查键是否存在
   * @param {string} key 存储键
   * @returns {boolean} 是否存在
   */
  async has(key) {
    try {
      const data = await this.get(key)
      return data !== null
    } catch (error) {
      return false
    }
  }

  /**
   * 设置带过期时间的缓存
   * @param {string} key 缓存键
   * @param {any} data 缓存数据
   * @param {number} ttl 生存时间（秒）
   */
  async setCache(key, data, ttl = 3600) {
    return await this.set(key, data, ttl * 1000)
  }

  /**
   * 获取缓存数据
   * @param {string} key 缓存键
   * @returns {any} 缓存数据
   */
  async getCache(key) {
    return await this.get(key)
  }

  /**
   * 批量设置数据
   * @param {object} dataMap 数据映射 {key: value}
   * @param {number} expire 过期时间（毫秒），可选
   */
  async setBatch(dataMap, expire) {
    const promises = Object.entries(dataMap).map(([key, value]) => 
      this.set(key, value, expire)
    )
    
    try {
      await Promise.all(promises)
      return true
    } catch (error) {
      console.error('批量设置数据失败:', error)
      return false
    }
  }

  /**
   * 批量获取数据
   * @param {string[]} keys 键数组
   * @returns {object} 数据映射 {key: value}
   */
  async getBatch(keys) {
    const result = {}
    const promises = keys.map(async (key) => {
      const value = await this.get(key)
      result[key] = value
    })
    
    await Promise.all(promises)
    return result
  }

  /**
   * 批量删除数据
   * @param {string[]} keys 键数组
   */
  async removeBatch(keys) {
    const promises = keys.map(key => this.remove(key))
    
    try {
      await Promise.all(promises)
      return true
    } catch (error) {
      console.error('批量删除数据失败:', error)
      return false
    }
  }
}

// 创建单例实例
const storage = new Storage()

export default storage