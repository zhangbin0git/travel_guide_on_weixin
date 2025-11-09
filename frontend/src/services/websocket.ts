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

// 当前连接状态
let currentStatus: SocketStatus = SocketStatus.CLOSED;

// 重连配置
const RECONNECT_INTERVAL = 3000; // 重连间隔
const MAX_RECONNECT_COUNT = 5; // 最大重连次数
let reconnectCount = 0;
let reconnectTimer: number | null = null;

// 消息监听器
type MessageListener = (data: any) => void;
const messageListeners: MessageListener[] = [];

// 状态监听器
type StatusListener = (status: SocketStatus) => void;
const statusListeners: StatusListener[] = [];

/**
 * 初始化WebSocket连接
 * @param url WebSocket服务器地址
 */
export function initWebSocket(url: string): void {
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
  });

  socketTask.onMessage((res) => {
    try {
      const data = JSON.parse(res.data as string);
      console.log('收到WebSocket消息:', data);
      notifyMessageListeners(data);
    } catch (error) {
      console.error('解析WebSocket消息失败:', error);
    }
  });

  socketTask.onClose(() => {
    console.log('WebSocket连接已关闭');
    currentStatus = SocketStatus.CLOSED;
    notifyStatusListeners();
    
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
 * 发送WebSocket消息
 * @param data 要发送的数据
 */
export function sendMessage(data: any): boolean {
  if (currentStatus !== SocketStatus.OPEN || !socketTask) {
    console.error('WebSocket未连接，无法发送消息');
    return false;
  }

  try {
    const message = typeof data === 'string' ? data : JSON.stringify(data);
    socketTask.send({
      data: message
    });
    return true;
  } catch (error) {
    console.error('发送WebSocket消息失败:', error);
    return false;
  }
}

/**
 * 关闭WebSocket连接
 */
export function closeWebSocket(): void {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

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
function notifyMessageListeners(data: any): void {
  messageListeners.forEach(listener => {
    try {
      listener(data);
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