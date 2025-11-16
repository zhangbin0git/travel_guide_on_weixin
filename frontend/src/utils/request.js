/**
 * HTTP请求封装工具
 * 基于Taro.request实现，支持拦截器、错误处理等功能
 */

import Taro from '@tarojs/taro'

// 请求拦截器
const requestInterceptor = (chain) => {
  const requestParams = chain.requestParams
  const { header } = requestParams

  // 添加通用请求头
  requestParams.header = {
    ...header,
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }

  // 可以在这里添加token等认证信息
  const token = Taro.getStorageSync('token')
  if (token) {
    requestParams.header.Authorization = `Bearer ${token}`
  }

  return chain.proceed(requestParams)
}

// 响应拦截器
const responseInterceptor = (chain) => {
  return chain.proceed(chain.requestParams).then((response) => {
    // 统一处理响应
    const { statusCode, data } = response

    if (statusCode >= 200 && statusCode < 300) {
      // 请求成功
      if (data && data.code === 200) {
        return data
      } else {
        // 业务逻辑错误
        Taro.showToast({
          title: data.message || '请求失败',
          icon: 'none',
          duration: 2000
        })
        return Promise.reject(new Error(data.message || '请求失败'))
      }
    } else {
      // HTTP错误
      Taro.showToast({
        title: `请求错误: ${statusCode}`,
        icon: 'none',
        duration: 2000
      })
      return Promise.reject(new Error(`HTTP错误: ${statusCode}`))
    }
  }).catch((error) => {
    // 网络错误等
    Taro.showToast({
      title: '网络错误，请检查网络连接',
      icon: 'none',
      duration: 2000
    })
    return Promise.reject(error)
  })
}

// 添加拦截器
Taro.addInterceptor(requestInterceptor)
Taro.addInterceptor(responseInterceptor)

/**
 * 基础请求方法
 * @param {Object} options - 请求配置
 * @returns {Promise} 请求结果
 */
export const request = (options) => {
  const defaultOptions = {
    method: 'GET',
    timeout: 10000,
    dataType: 'json'
  }

  return Taro.request({
    ...defaultOptions,
    ...options
  })
}

/**
 * GET请求
 * @param {string} url - 请求URL
 * @param {Object} params - 请求参数
 * @param {Object} options - 其他配置
 * @returns {Promise} 请求结果
 */
export const get = (url, params = {}, options = {}) => {
  return request({
    url,
    method: 'GET',
    data: params,
    ...options
  })
}

/**
 * POST请求
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @param {Object} options - 其他配置
 * @returns {Promise} 请求结果
 */
export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

/**
 * PUT请求
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @param {Object} options - 其他配置
 * @returns {Promise} 请求结果
 */
export const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

/**
 * DELETE请求
 * @param {string} url - 请求URL
 * @param {Object} params - 请求参数
 * @param {Object} options - 其他配置
 * @returns {Promise} 请求结果
 */
export const del = (url, params = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data: params,
    ...options
  })
}

/**
 * 文件上传
 * @param {string} url - 上传URL
 * @param {Object} filePath - 文件路径
 * @param {Object} formData - 表单数据
 * @param {Object} options - 其他配置
 * @returns {Promise} 上传结果
 */
export const uploadFile = (url, filePath, formData = {}, options = {}) => {
  return Taro.uploadFile({
    url,
    filePath,
    name: 'file',
    formData,
    ...options
  })
}

export default {
  request,
  get,
  post,
  put,
  del,
  uploadFile
}