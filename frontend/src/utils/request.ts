import Taro from '@tarojs/taro'

// 请求配置
const BASE_URL = 'https://your-api-domain.com/api'

// 请求拦截器
const requestInterceptor = (chain) => {
  const requestParams = chain.requestParams
  const { header } = requestParams

  // 添加token
  const token = Taro.getStorageSync('token')
  if (token) {
    header.Authorization = `Bearer ${token}`
  }

  // 添加公共参数
  header['Content-Type'] = header['Content-Type'] || 'application/json'

  return chain.proceed(requestParams)
}

// 响应拦截器
const responseInterceptor = (chain) => {
  const { statusCode, data } = chain.response

  // 处理HTTP状态码
  if (statusCode >= 200 && statusCode < 300) {
    // 处理业务状态码
    if (data.code === 200) {
      return data.data
    } else if (data.code === 401) {
      // 未授权，跳转登录页
      Taro.navigateTo({ url: '/pages/login/index' })
      return Promise.reject(new Error(data.message || '请先登录'))
    } else {
      Taro.showToast({
        title: data.message || '请求失败',
        icon: 'none'
      })
      return Promise.reject(new Error(data.message || '请求失败'))
    }
  } else {
    Taro.showToast({
      title: '网络错误',
      icon: 'none'
    })
    return Promise.reject(new Error('网络错误'))
  }
}

// 添加拦截器
Taro.addInterceptor(Taro.interceptors.logInterceptor)
Taro.addInterceptor(requestInterceptor)
Taro.addInterceptor(responseInterceptor)

// 请求方法封装
const request = (options: Taro.request.Option) => {
  return Taro.request({
    url: `${BASE_URL}${options.url}`,
    ...options
  })
}

// GET请求
export const get = (url: string, data?: any) => {
  return request({
    url,
    method: 'GET',
    data
  })
}

// POST请求
export const post = (url: string, data?: any) => {
  return request({
    url,
    method: 'POST',
    data
  })
}

// PUT请求
export const put = (url: string, data?: any) => {
  return request({
    url,
    method: 'PUT',
    data
  })
}

// DELETE请求
export const del = (url: string, data?: any) => {
  return request({
    url,
    method: 'DELETE',
    data
  })
}

// 上传文件
export const uploadFile = (url: string, filePath: string, name?: string) => {
  const token = Taro.getStorageSync('token')
  return Taro.uploadFile({
    url: `${BASE_URL}${url}`,
    filePath,
    name: name || 'file',
    header: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })
}

export default {
  get,
  post,
  put,
  del,
  uploadFile
}