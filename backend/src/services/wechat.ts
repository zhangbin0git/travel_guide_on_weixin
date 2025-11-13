import axios from 'axios'

/**
 * 微信小程序服务
 */
export class WechatService {
  private appId: string
  private appSecret: string

  constructor() {
    // 从环境变量获取微信小程序配置
    this.appId = process.env.WECHAT_APP_ID || 'your_wechat_app_id'
    this.appSecret = process.env.WECHAT_APP_SECRET || 'your_wechat_app_secret'
  }

  /**
   * 通过code获取用户openid和session_key
   * @param code 微信授权码
   * @returns 包含openid和session_key的对象
   */
  async code2Session(code: string): Promise<{ openid: string; session_key: string }> {
    try {
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`

      const response = await axios.get(url)
      const data = response.data

      if (data.errcode) {
        throw new Error(`微信API错误: ${data.errmsg}`)
      }

      return {
        openid: data.openid,
        session_key: data.session_key,
      }
    } catch (error) {
      // 在开发环境中，返回模拟数据
      if (process.env.NODE_ENV === 'development') {
        return {
          openid: `mock_openid_${Date.now()}`,
          session_key: `mock_session_key_${Date.now()}`,
        }
      }

      throw new Error(`获取微信用户信息失败: ${error.message}`)
    }
  }

  /**
   * 获取微信小程序access_token
   * @returns access_token
   */
  async getAccessToken(): Promise<string> {
    try {
      const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`

      const response = await axios.get(url)
      const data = response.data

      if (data.errcode) {
        throw new Error(`微信API错误: ${data.errmsg}`)
      }

      return data.access_token
    } catch (error) {
      // 在开发环境中，返回模拟数据
      if (process.env.NODE_ENV === 'development') {
        return `mock_access_token_${Date.now()}`
      }

      throw new Error(`获取微信access_token失败: ${error.message}`)
    }
  }

  /**
   * 生成小程序码
   * @param scene 场景值
   * @param page 小程序页面路径
   * @returns 小程序码二进制数据
   */
  async getUnlimitedQRCode(scene: string, page?: string): Promise<Buffer> {
    try {
      const accessToken = await this.getAccessToken()
      const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`

      const data = {
        scene,
        page,
      }

      const response = await axios.post(url, data, {
        responseType: 'arraybuffer',
      })

      // 检查响应是否是错误信息
      if (response.headers['content-type']?.includes('application/json')) {
        const errorData = JSON.parse(response.data.toString())
        throw new Error(`微信API错误: ${errorData.errmsg}`)
      }

      return response.data as Buffer
    } catch (error) {
      throw new Error(`生成小程序码失败: ${error.message}`)
    }
  }
}
