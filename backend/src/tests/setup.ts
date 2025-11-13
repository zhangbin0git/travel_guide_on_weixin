import { config } from 'dotenv'

// 加载测试环境变量
config({ path: '.env.test' })

// 设置测试超时时间
jest.setTimeout(30000)

// 全局测试设置
beforeAll(async () => {
  // 在所有测试开始前执行的操作
})

afterAll(async () => {
  // 在所有测试结束后执行的操作
})

// 每个测试前的设置
beforeEach(() => {
  // 清除模拟函数的调用记录
  jest.clearAllMocks()
})
