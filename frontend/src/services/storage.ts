/**
 * 本地存储服务
 * 封装微信小程序的本地存储API
 */

/**
 * 存储数据
 * @param key 存储键
 * @param value 存储值
 */
export function setStorage(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.stringify(value);
      wx.setStorage({
        key,
        data,
        success: () => resolve(),
        fail: (error) => reject(error)
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 获取数据
 * @param key 存储键
 * @param defaultValue 默认值
 */
export function getStorage<T = any>(key: string, defaultValue?: T): Promise<T> {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: (res) => {
        try {
          const data = JSON.parse(res.data as string);
          resolve(data);
        } catch (error) {
          // 如果解析失败，直接返回原始数据
          resolve(res.data as unknown as T);
        }
      },
      fail: (error) => {
        // 如果有默认值，则返回默认值
        if (defaultValue !== undefined) {
          resolve(defaultValue);
        } else {
          reject(error);
        }
      }
    });
  });
}

/**
 * 同步获取数据
 * @param key 存储键
 * @param defaultValue 默认值
 */
export function getStorageSync<T = any>(key: string, defaultValue?: T): T {
  try {
    const res = wx.getStorageSync(key);
    if (res) {
      try {
        return JSON.parse(res);
      } catch (error) {
        // 如果解析失败，直接返回原始数据
        return res as unknown as T;
      }
    }
    return defaultValue as T;
  } catch (error) {
    return defaultValue as T;
  }
}

/**
 * 同步存储数据
 * @param key 存储键
 * @param value 存储值
 */
export function setStorageSync(key: string, value: any): void {
  try {
    const data = JSON.stringify(value);
    wx.setStorageSync(key, data);
  } catch (error) {
    console.error('同步存储数据失败:', error);
  }
}

/**
 * 删除数据
 * @param key 存储键
 */
export function removeStorage(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key,
      success: () => resolve(),
      fail: (error) => reject(error)
    });
  });
}

/**
 * 同步删除数据
 * @param key 存储键
 */
export function removeStorageSync(key: string): void {
  try {
    wx.removeStorageSync(key);
  } catch (error) {
    console.error('同步删除数据失败:', error);
  }
}

/**
 * 清空所有数据
 */
export function clearStorage(): Promise<void> {
  return new Promise((resolve, reject) => {
    wx.clearStorage({
      success: () => resolve(),
      fail: (error) => reject(error)
    });
  });
}

/**
 * 同步清空所有数据
 */
export function clearStorageSync(): void {
  try {
    wx.clearStorageSync();
  } catch (error) {
    console.error('同步清空数据失败:', error);
  }
}

/**
 * 获取存储信息
 */
export function getStorageInfo(): Promise<wx.GetStorageInfoSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    wx.getStorageInfo({
      success: (res) => resolve(res),
      fail: (error) => reject(error)
    });
  });
}

/**
 * 同步获取存储信息
 */
export function getStorageInfoSync(): wx.GetStorageInfoSyncResult {
  try {
    return wx.getStorageInfoSync();
  } catch (error) {
    console.error('同步获取存储信息失败:', error);
    return {
      keys: [],
      currentSize: 0,
      limitSize: 0
    };
  }
}

/**
 * 用户相关存储
 */
export const userStorage = {
  /**
   * 存储用户信息
   */
  setUserInfo: (userInfo: any) => setStorage('userInfo', userInfo),
  
  /**
   * 获取用户信息
   */
  getUserInfo: () => getStorage('userInfo'),
  
  /**
   * 存储用户token
   */
  setUserToken: (token: string) => setStorage('userToken', token),
  
  /**
   * 获取用户token
   */
  getUserToken: () => getStorage('userToken'),
  
  /**
   * 清除用户信息
   */
  clearUserInfo: () => {
    removeStorage('userInfo');
    removeStorage('userToken');
  }
};

/**
 * 攻略相关存储
 */
export const guideStorage = {
  /**
   * 存储攻略列表
   */
  setGuideList: (guideList: any[]) => setStorage('guideList', guideList),
  
  /**
   * 获取攻略列表
   */
  getGuideList: () => getStorage('guideList', []),
  
  /**
   * 存储收藏的攻略
   */
  setFavoriteGuides: (guideIds: string[]) => setStorage('favoriteGuides', guideIds),
  
  /**
   * 获取收藏的攻略
   */
  getFavoriteGuides: () => getStorage('favoriteGuides', []),
  
  /**
   * 添加收藏攻略
   */
  addFavoriteGuide: (guideId: string) => {
    return getFavoriteGuides().then(ids => {
      if (!ids.includes(guideId)) {
        ids.push(guideId);
        return setFavoriteGuides(ids);
      }
    });
  },
  
  /**
   * 取消收藏攻略
   */
  removeFavoriteGuide: (guideId: string) => {
    return getFavoriteGuides().then(ids => {
      const index = ids.indexOf(guideId);
      if (index !== -1) {
        ids.splice(index, 1);
        return setFavoriteGuides(ids);
      }
    });
  }
};