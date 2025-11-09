/**
 * API接口定义
 * 统一管理所有API接口请求
 */

// API基础URL
const BASE_URL = 'https://api.example.com';

/**
 * API请求封装
 * @param url 请求地址
 * @param method 请求方法
 * @param data 请求数据
 * @param options 其他选项
 */
export function request<T = any>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  options?: wx.RequestOption
): Promise<T> {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        ...options?.header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else {
          reject(new Error(`请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 攻略相关API
 */
export const guideAPI = {
  /**
   * 获取攻略列表
   */
  getGuideList: (params?: any) => {
    return request<any>('/api/guides', 'GET', params);
  },

  /**
   * 获取攻略详情
   */
  getGuideDetail: (id: string) => {
    return request<any>(`/api/guides/${id}`);
  },

  /**
   * 生成攻略
   */
  generateGuide: (data: any) => {
    return request<any>('/api/guides', 'POST', data);
  }
};

/**
 * 景点相关API
 */
export const attractionAPI = {
  /**
   * 获取景点列表
   */
  getAttractionList: (params?: any) => {
    return request<any>('/api/attractions', 'GET', params);
  },

  /**
   * 获取景点详情
   */
  getAttractionDetail: (id: string) => {
    return request<any>(`/api/attractions/${id}`);
  }
};