/**
 * WebSocket测试启动脚本
 * 用于快速启动WebSocket服务器进行测试
 */

const { createServer } = require('./dist/app');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// 启动服务器
const { app, server } = createServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`WebSocket测试服务器已启动`);
  console.log(`HTTP服务地址: http://localhost:${PORT}`);
  console.log(`WebSocket服务地址: ws://localhost:${PORT}/ws/guide`);
  console.log('健康检查地址: http://localhost:${PORT}/health');
  console.log('\n按 Ctrl+C 停止服务器');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭服务器...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});