import request from 'supertest'
import app from '../app'

describe('认证接口', () => {
  describe('POST /api/auth/login', () => {
    it('应该成功登录并返回token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        })
        .expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', '登录成功')
      expect(response.body.data).toHaveProperty('token')
      expect(response.body.data).toHaveProperty('user')
    })

    it('应该拒绝无效的用户名或密码', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'invaliduser',
          password: 'wrongpassword'
        })
        .expect(401)

      expect(response.body).toHaveProperty('code', 401)
      expect(response.body).toHaveProperty('message', '用户名或密码错误')
    })
  })

  describe('GET /api/auth/userinfo', () => {
    it('应该返回用户信息', async () => {
      // 先登录获取token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        })

      const token = loginResponse.body.data.token

      // 使用token获取用户信息
      const response = await request(app)
        .get('/api/auth/userinfo')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(response.body).toHaveProperty('code', 200)
      expect(response.body).toHaveProperty('message', '获取用户信息成功')
      expect(response.body.data).toHaveProperty('id')
      expect(response.body.data).toHaveProperty('username')
    })

    it('应该拒绝无效的token', async () => {
      const response = await request(app)
        .get('/api/auth/userinfo')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401)

      expect(response.body).toHaveProperty('code', 401)
      expect(response.body).toHaveProperty('message', '无效的访问令牌')
    })
  })
})