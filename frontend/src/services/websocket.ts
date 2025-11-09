/**
 * WebSocket连接管理
 * 处理与后端的WebSocket通信
 */

// WebSocket连接实例
let socketTask: WechatMiniprogram.SocketTask | null = null;

// WebSocket连接状态
export enum SocketStatus {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3
}

// WebSocket消息类型枚举（与后端保持一致）
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

// WebSocket消息接口（与后端保持一致）
export interface IWebSocketMessage {
  type: MessageType;
  data?: any;
  timestamp: number;
  id?: string;
}

// 当前连接状态
let currentStatus: SocketStatus = SocketStatus.CLOSED;

// 重连配置
const RECONNECT_INTERVAL = 3000; // 重连间隔
const MAX_RECONNECT_COUNT = 5; // 最大重连次数
let reconnectCount = 0;
let reconnectTimer: number | null = null;

// 心跳检测配置
const HEARTBEAT_INTERVAL = 30000; // 心跳间隔
let heartbeatTimer: number | null = null;

// 消息监听器
type MessageListener = (message: IWebSocketMessage) => void;
const messageListeners: MessageListener[] = [];

// 状态监听器
type StatusListener = (status: SocketStatus) => void;
const statusListeners: StatusListener[] = [];

// WebSocket服务器地址
let serverUrl: string = '';

/**
 * 初始化WebSocket连接
 * @param url WebSocket服务器地址
 */
export function initWebSocket(url: string): void {
  serverUrl = url;
  
  if (socketTask) {
    socketTask.close();
  }

  currentStatus = SocketStatus.CONNECTING;
  notifyStatusListeners();

  socketTask = wx.connectSocket({
    url,
    protocols: ['websocket']
  });

  socketTask.onOpen(() => {
    console.log('WebSocket连接已打开');
    currentStatus = SocketStatus.OPEN;
    reconnectCount = 0;
    notifyStatusListeners();
    
    // 启动心跳检测
    startHeartbeat();
  });

  socketTask.onMessage((res) => {
    try {
      // 尝试解析JSON消息
      let message: IWebSocketMessage;
      
      if (typeof res.data === 'string') {
        message = JSON.parse(res.data);
      } else {
        // 如果不是字符串，可能是直接发送的消息类型
        message = {
          type: res.data as MessageType,
          timestamp: Date.now(),
        };
      }
      
      console.log('收到WebSocket消息:', message);
      
      // 处理特定类型的消息
      handleSpecialMessage(message);
      
      // 通知所有消息监听器
      notifyMessageListeners(message);
    } catch (error) {
      console.error('解析WebSocket消息失败:', error);
    }
  });

  socketTask.onClose(() => {
    console.log('WebSocket连接已关闭');
    currentStatus = SocketStatus.CLOSED;
    notifyStatusListeners();
    
    // 停止心跳检测
    stopHeartbeat();
    
    // 自动重连
    if (reconnectCount < MAX_RECONNECT_COUNT) {
      reconnectTimer = setTimeout(() => {
        reconnectCount++;
        console.log(`尝试重连 (${reconnectCount}/${MAX_RECONNECT_COUNT})`);
        initWebSocket(url);
      }, RECONNECT_INTERVAL);
    }
  });

  socketTask.onError((error) => {
    console.error('WebSocket连接错误:', error);
    currentStatus = SocketStatus.CLOSED;
    notifyStatusListeners();
  });
}

/**
 * 处理特定类型的消息
 * @param message WebSocket消息
 */
function handleSpecialMessage(message: IWebSocketMessage): void {
  switch (message.type) {
    case MessageType.PING:
      // 收到PING，回复PONG
      sendMessage(MessageType.PONG, { timestamp: Date.now() });
      break;
    case MessageType.PONG:
      // 收到PONG，更新心跳状态
      console.log('心跳响应正常');
      break;
    case MessageType.CONNECT:
      console.log('连接确认消息:', message.data);
      break;
    case MessageType.ERROR:
      console.error('服务器错误消息:', message.data);
      break;
  }
}

/**
 * 启动心跳检测
 */
function startHeartbeat(): void {
  stopHeartbeat(); // 先停止之前的心跳
  
  heartbeatTimer = setInterval(() => {
    if (currentStatus === SocketStatus.OPEN) {
      sendMessage(MessageType.PING, { timestamp: Date.now() });
    }
  }, HEARTBEAT_INTERVAL);
}

/**
 * 停止心跳检测
 */
function stopHeartbeat(): void {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

/**
 * 发送WebSocket消息
 * @param type 消息类型
 * @param data 消息数据
 */
export function sendMessage(type: MessageType, data?: any): boolean {
  if (currentStatus !== SocketStatus.OPEN || !socketTask) {
    console.error('WebSocket未连接，无法发送消息');
    return false;
  }

  try {
    const message: IWebSocketMessage = {
      type,
      data,
      timestamp: Date.now(),
      id: generateMessageId(),
    };
    
    socketTask.send({
      data: JSON.stringify(message)
    });
    return true;
  } catch (error) {
    console.error('发送WebSocket消息失败:', error);
    return false;
  }
}

/**
 * 生成消息ID
 * @returns 消息ID
 */
function generateMessageId(): string {
  return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 发送攻略生成请求
 * @param requestData 请求数据
 */
export function sendGuideRequest(requestData: any): boolean {
  return sendMessage(MessageType.GUIDE_REQUEST, requestData);
}

/**
 * 关闭WebSocket连接
 */
export function closeWebSocket(): void {
  // 停止重连定时器
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  
  // 停止心跳检测
  stopHeartbeat();

  // 关闭连接
  if (socketTask) {
    socketTask.close();
    socketTask = null;
  }

  currentStatus = SocketStatus.CLOSED;
  reconnectCount = 0;
}

/**
 * 获取当前连接状态
 */
export function getSocketStatus(): SocketStatus {
  return currentStatus;
}

/**
 * 添加消息监听器
 * @param listener 监听器函数
 */
export function addMessageListener(listener: MessageListener): void {
  messageListeners.push(listener);
}

/**
 * 移除消息监听器
 * @param listener 监听器函数
 */
export function removeMessageListener(listener: MessageListener): void {
  const index = messageListeners.indexOf(listener);
  if (index !== -1) {
    messageListeners.splice(index, 1);
  }
}

/**
 * 添加状态监听器
 * @param listener 监听器函数
 */
export function addStatusListener(listener: StatusListener): void {
  statusListeners.push(listener);
}

/**
 * 移除状态监听器
 * @param listener 监听器函数
 */
export function removeStatusListener(listener: StatusListener): void {
  const index = statusListeners.indexOf(listener);
  if (index !== -1) {
    statusListeners.splice(index, 1);
  }
}

/**
 * 通知所有消息监听器
 */
function notifyMessageListeners(message: IWebSocketMessage): void {
  messageListeners.forEach(listener => {
    try {
      listener(message);
    } catch (error) {
      console.error('消息监听器执行错误:', error);
    }
  });
}

/**
 * 通知所有状态监听器
 */
function notifyStatusListeners(): void {
  statusListeners.forEach(listener => {
    try {
      listener(currentStatus);
    } catch (error) {
      console.error('状态监听器执行错误:', error);
    }
  });
}