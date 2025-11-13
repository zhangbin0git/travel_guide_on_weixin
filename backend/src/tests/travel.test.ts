import request from 'supertest'
import app from '../app'

describe('旅行接口', () => {
  describe('GET /api/travel/destinations', () => {
    it('应该返回目的地列表', async () => {
      const response = await request(app).get('/api/travel/destinations').expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', '获取目的地列表成功')
      expect(response.body.data).toHaveProperty('destinations')
      expect(Array.isArray(response.body.data.destinations)).toBe(true)
    })
  })

  describe('GET /api/travel/destinations/:id', () => {
    it('应该返回目的地详情', async () => {
      const response = await request(app).get('/api/travel/destinations/1').expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', '获取目的地详情成功')
      expect(response.body.data).toHaveProperty('id')
      expect(response.body.data).toHaveProperty('name')
    })

    it('应该返回404当目的地不存在', async () => {
      const response = await request(app).get('/api/travel/destinations/999').expect(404)

      expect(response.body).toHaveProperty('code', 404)
      expect(response.body).toHaveProperty('message', '目的地不存在')
    })
  })

  describe('GET /api/travel/guides', () => {
    it('应该返回攻略列表', async () => {
      const response = await request(app).get('/api/travel/guides').expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', '获取攻略列表成功')
      expect(response.body.data).toHaveProperty('guides')
      expect(Array.isArray(response.body.data.guides)).toBe(true)
    })
  })
})
