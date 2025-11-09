import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { logger } from '../utils/logger';
import { config } from '../config';

/**
 * WebSocket消息类型枚举
 */
export enum MessageType {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  GUIDE_REQUEST = 'guide_request',
  GUIDE_UPDATE = 'guide_update',
  GUIDE_COMPLETE = 'guide_complete',
  ERROR = 'error',
  PING = 'ping',
  PONG = 'pong',
}

/**
 * WebSocket消息接口
 */
export interface IWebSocketMessage {
  type: MessageType;
  data?: any;
  timestamp: number;
  id?: string;
}

/**
 * WebSocket控制器
 */
export class WebSocketController {
  private io: SocketIOServer;
  private connectedClients: Map<string, any> = new Map();

  /**
   * 初始化WebSocket服务
   * @param httpServer HTTP服务器实例
   */
  public initialize(httpServer: HTTPServer): void {
    // 创建Socket.IO服务器实例
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: '*', // 在生产环境中应该设置为具体的域名
        methods: ['GET', 'POST'],
      },
      transports: ['websocket', 'polling'], // 支持websocket和polling两种传输方式
    });

    // 监听连接事件
    this.io.on('connection', (socket) => {
      logger.info('WebSocket客户端连接', {
        socketId: socket.id,
        ip: socket.handshake.address,
      });

      // 保存客户端连接
      this.connectedClients.set(socket.id, socket);

      // 发送连接确认消息
      this.sendMessage(socket, MessageType.CONNECT, {
        message: '连接成功',
        socketId: socket.id,
      });

      // 监听断开连接事件
      socket.on('disconnect', (reason) => {
        logger.info('WebSocket客户端断开连接', {
          socketId: socket.id,
          reason,
        });

        // 从连接列表中移除
        this.connectedClients.delete(socket.id);
      });

      // 监听攻略生成请求
      socket.on(MessageType.GUIDE_REQUEST, (data) => {
        logger.info('收到攻略生成请求', {
          socketId: socket.id,
          data,
        });

        // 这里暂时返回一个模拟的响应
        // 在实际实现中，这里会调用攻略生成服务
        this.handleGuideRequest(socket, data);
      });

      // 监听心跳检测
      socket.on(MessageType.PING, () => {
        this.sendMessage(socket, MessageType.PONG, {
          timestamp: Date.now(),
        });
      });
    });

    logger.info('WebSocket服务初始化完成');
  }

  /**
   * 处理攻略生成请求
   * @param socket Socket实例
   * @param data 请求数据
   */
  private handleGuideRequest(socket: any, data: any): void {
    // 模拟攻略生成过程
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;

      // 发送进度更新
      this.sendMessage(socket, MessageType.GUIDE_UPDATE, {
        progress,
        message: `正在生成攻略... ${progress}%`,
      });

      // 当进度达到100%时，发送完成消息
      if (progress >= 100) {
        clearInterval(interval);
        
        // 发送完成消息
        this.sendMessage(socket, MessageType.GUIDE_COMPLETE, {
          message: '攻略生成完成',
          guide: {
            id: 'guide_' + Date.now(),
            title: `${data.destination || '目的地'}旅行攻略`,
            days: data.days || 3,
            content: '这里是生成的攻略内容...',
          },
        });
      }
    }, 1000);
  }

  /**
   * 发送消息到指定客户端
   * @param socket Socket实例
   * @param type 消息类型
   * @param data 消息数据
   */
  public sendMessage(socket: any, type: MessageType, data?: any): void {
    const message: IWebSocketMessage = {
      type,
      data,
      timestamp: Date.now(),
      id: this.generateMessageId(),
    };

    socket.emit(type, message);
    logger.debug('发送WebSocket消息', {
      socketId: socket.id,
      messageType: type,
      messageId: message.id,
    });
  }

  /**
   * 广播消息到所有连接的客户端
   * @param type 消息类型
   * @param data 消息数据
   */
  public broadcastMessage(type: MessageType, data?: any): void {
    const message: IWebSocketMessage = {
      type,
      data,
      timestamp: Date.now(),
      id: this.generateMessageId(),
    };

    this.io.emit(type, message);
    logger.debug('广播WebSocket消息', {
      messageType: type,
      messageId: message.id,
      clientCount: this.connectedClients.size,
    });
  }

  /**
   * 获取当前连接的客户端数量
   * @returns 客户端数量
   */
  public getClientCount(): number {
    return this.connectedClients.size;
  }

  /**
   * 生成消息ID
   * @returns 消息ID
   */
  private generateMessageId(): string {
    return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * 获取Socket.IO实例
   * @returns Socket.IO实例
   */
  public getIO(): SocketIOServer {
    return this.io;
  }
}

// 导出单例实例
export const webSocketController = new WebSocketController();