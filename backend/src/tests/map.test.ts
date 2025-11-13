import request from 'supertest'
import app from '../app'

describe('地图接口', () => {
  describe('GET /api/map/geocode', () => {
    it('应该返回地理编码结果', async () => {
      const response = await request(app)
        .get('/api/map/geocode')
        .query({ address: '北京市', city: '北京' })
        .expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', '地理编码成功')
      expect(response.body.data).toHaveProperty('location')
      expect(response.body.data.location).toHaveProperty('longitude')
      expect(response.body.data.location).toHaveProperty('latitude')
    })
  })

  describe('GET /api/map/search', () => {
    it('应该返回POI搜索结果', async () => {
      const response = await request(app)
        .get('/api/map/search')
        .query({ keywords: '故宫', city: '北京' })
        .expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', 'POI搜索成功')
      expect(response.body.data).toHaveProperty('pois')
      expect(Array.isArray(response.body.data.pois)).toBe(true)
    })
  })

  describe('GET /api/map/driving', () => {
    it('应该返回驾车路径规划结果', async () => {
      const response = await request(app)
        .get('/api/map/driving')
        .query({
          origin: '116.397428,39.90923',
          destination: '116.407394,39.904211'
        })
        .expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', '路径规划成功')
      expect(response.body.data).toHaveProperty('routes')
      expect(Array.isArray(response.body.data.routes)).toBe(true)
    })
  })
})