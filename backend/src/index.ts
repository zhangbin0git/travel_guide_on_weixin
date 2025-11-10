import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 中间件配置
app.use(helmet()); // 安全头
app.use(cors()); // 跨域
app.use(morgan('combined')); // 日志
app.use(express.json()); // JSON解析
app.use(express.urlencoded({ extended: true })); // URL编码解析

// 基础路由
app.get('/', (req, res) => {
  res.json({
    code: 200,
    message: '旅行攻略微信小程序后端服务',
    data: {
      version: '1.0.0',
      status: 'running'
    },
    timestamp: Date.now()
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    code: 200,
    message: '服务健康',
    data: {
      status: 'healthy',
      uptime: process.uptime()
    },
    timestamp: Date.now()
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

export default app;