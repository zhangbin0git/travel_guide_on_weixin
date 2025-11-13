import request from 'supertest'
import app from '../app'

describe('系统接口', () => {
  describe('GET /system/health', () => {
    it('应该返回健康状态', async () => {
      const response = await request(app)
        .get('/system/health')
        .expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', '服务运行正常')
      expect(response.body.data).toHaveProperty('uptime')
      expect(response.body.data).toHaveProperty('timestamp')
    })
  })

  describe('GET /system/info', () => {
    it('应该返回API信息', async () => {
      const response = await request(app)
        .get('/system/info')
        .expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', 'API信息获取成功')
      expect(response.body.data).toHaveProperty('name')
      expect(response.body.data).toHaveProperty('version')
      expect(response.body.data).toHaveProperty('description')
      expect(response.body.data).toHaveProperty('endpoints')
    })
  })
})