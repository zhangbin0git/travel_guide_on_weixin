import app from './app'

// 启动应用
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`服务器运行在端口 ${process.env.PORT || 3000}`)
  console.log(`API文档地址: http://localhost:${process.env.PORT || 3000}/api/health`)
})

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('SIGTERM信号接收，正在关闭服务器')
  server.close(() => {
    console.log('服务器已关闭')
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT信号接收，正在关闭服务器')
  server.close(() => {
    console.log('服务器已关闭')
  })
})
