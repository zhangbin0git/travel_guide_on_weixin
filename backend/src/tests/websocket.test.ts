/**
 * WebSocket服务测试用例
 * 验证WebSocket连接、消息发送和接收功能
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { webSocketController } from '../src/controllers/websocketController';

// 模拟Socket.IO服务器和客户端
const mockIo = {
  on: jest.fn(),
  to: jest.fn(() => ({
    emit: jest.fn()
  })),
  emit: jest.fn(),
  close: jest.fn()
};

const mockSocket = {
  id: 'test-socket-id',
  on: jest.fn(),
  emit: jest.fn(),
  disconnect: jest.fn()
};

// 模拟HTTP服务器
const mockServer = {
  on: jest.fn(),
  close: jest.fn()
};

describe('WebSocket服务测试', () => {
  beforeEach(() => {
    // 重置所有模拟函数
    jest.clearAllMocks();
    
    // 模拟Socket.IO构造函数
    jest.doMock('socket.io', () => {
      return jest.fn(() => mockIo);
    });
  });

  afterEach(() => {
    // 清理WebSocket控制器
    webSocketController.close();
  });

  it('应该能够初始化WebSocket服务', () => {
    // 初始化WebSocket服务
    webSocketController.initialize(mockServer);
    
    // 验证Socket.IO服务器是否创建
    expect(mockIo.on).toHaveBeenCalledWith('connection', expect.any(Function));
  });

  it('应该能够处理客户端连接', () => {
    // 初始化WebSocket服务
    webSocketController.initialize(mockServer);
    
    // 获取连接回调函数
    const connectionCallback = mockIo.on.mock.calls[0][1];
    
    // 模拟客户端连接
    connectionCallback(mockSocket);
    
    // 验证客户端是否被添加到连接列表
    expect(webSocketController.getClientCount()).toBe(1);
    
    // 验证是否发送了连接确认消息
    expect(mockSocket.emit).toHaveBeenCalledWith('connect', {
      message: '连接成功',
      timestamp: expect.any(Number)
    });
  });

  it('应该能够处理客户端断开连接', () => {
    // 初始化WebSocket服务并添加客户端
    webSocketController.initialize(mockServer);
    const connectionCallback = mockIo.on.mock.calls[0][1];
    connectionCallback(mockSocket);
    
    // 获取断开连接回调函数
    const disconnectCallback = mockSocket.on.mock.calls.find(
      call => call[0] === 'disconnect'
    )[1];
    
    // 模拟客户端断开连接
    disconnectCallback();
    
    // 验证客户端是否从连接列表中移除
    expect(webSocketController.getClientCount()).toBe(0);
  });

  it('应该能够处理攻略生成请求', () => {
    // 初始化WebSocket服务并添加客户端
    webSocketController.initialize(mockServer);
    const connectionCallback = mockIo.on.mock.calls[0][1];
    connectionCallback(mockSocket);
    
    // 获取消息处理回调函数
    const messageCallback = mockSocket.on.mock.calls.find(
      call => call[0] === 'message'
    )[1];
    
    // 模拟攻略生成请求
    const guideRequest = {
      type: 'guide_request',
      data: {
        destination: '北京',
        duration: 3,
        interests: ['历史文化', '美食'],
        budget: '中等',
        groupType: '情侣'
      },
      timestamp: Date.now()
    };
    
    // 处理消息
    messageCallback(guideRequest);
    
    // 验证是否发送了开始生成消息
    expect(mockSocket.emit).toHaveBeenCalledWith('guide_update', {
      status: 'start',
      message: '开始生成攻略',
      timestamp: expect.any(Number)
    });
  });

  it('应该能够处理心跳消息', () => {
    // 初始化WebSocket服务并添加客户端
    webSocketController.initialize(mockServer);
    const connectionCallback = mockIo.on.mock.calls[0][1];
    connectionCallback(mockSocket);
    
    // 获取消息处理回调函数
    const messageCallback = mockSocket.on.mock.calls.find(
      call => call[0] === 'message'
    )[1];
    
    // 模拟心跳消息
    const pingMessage = {
      type: 'ping',
      timestamp: Date.now()
    };
    
    // 处理消息
    messageCallback(pingMessage);
    
    // 验证是否回复了pong消息
    expect(mockSocket.emit).toHaveBeenCalledWith('pong', {
      timestamp: expect.any(Number)
    });
  });

  it('应该能够广播消息给所有客户端', () => {
    // 初始化WebSocket服务并添加两个客户端
    webSocketController.initialize(mockServer);
    const connectionCallback = mockIo.on.mock.calls[0][1];
    
    const mockSocket1 = { ...mockSocket, id: 'test-socket-1' };
    const mockSocket2 = { ...mockSocket, id: 'test-socket-2' };
    
    connectionCallback(mockSocket1);
    connectionCallback(mockSocket2);
    
    // 广播消息
    webSocketController.broadcast('test_message', { data: 'test' });
    
    // 验证是否向所有客户端广播了消息
    expect(mockIo.to).toHaveBeenCalledWith('all');
    expect(mockIo.to().emit).toHaveBeenCalledWith('test_message', {
      data: 'test',
      timestamp: expect.any(Number)
    });
  });

  it('应该能够向特定客户端发送消息', () => {
    // 初始化WebSocket服务并添加客户端
    webSocketController.initialize(mockServer);
    const connectionCallback = mockIo.on.mock.calls[0][1];
    connectionCallback(mockSocket);
    
    // 向特定客户端发送消息
    webSocketController.sendToClient(mockSocket.id, 'test_message', { data: 'test' });
    
    // 验证是否向指定客户端发送了消息
    expect(mockIo.to).toHaveBeenCalledWith(mockSocket.id);
    expect(mockIo.to().emit).toHaveBeenCalledWith('test_message', {
      data: 'test',
      timestamp: expect.any(Number)
    });
  });

  it('应该能够获取客户端统计信息', () => {
    // 初始化WebSocket服务
    webSocketController.initialize(mockServer);
    
    // 获取初始统计信息
    let stats = webSocketController.getStats();
    expect(stats.clientCount).toBe(0);
    expect(stats.totalConnections).toBe(0);
    
    // 添加客户端
    const connectionCallback = mockIo.on.mock.calls[0][1];
    connectionCallback(mockSocket);
    
    // 获取更新后的统计信息
    stats = webSocketController.getStats();
    expect(stats.clientCount).toBe(1);
    expect(stats.totalConnections).toBe(1);
    
    // 断开客户端
    const disconnectCallback = mockSocket.on.mock.calls.find(
      call => call[0] === 'disconnect'
    )[1];
    disconnectCallback();
    
    // 获取最终统计信息
    stats = webSocketController.getStats();
    expect(stats.clientCount).toBe(0);
    expect(stats.totalConnections).toBe(1);
  });
});