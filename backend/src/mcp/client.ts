import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import path from 'path'
import fs from 'fs'

/**
 * MCP客户端配置
 */
const MCP_CONFIG = {
  // 高德地图MCP服务器路径
  serverPath: path.join(__dirname, '../../config/mcp-server.json'),
  // 连接超时时间（毫秒）
  timeout: 30000,
}

/**
 * MCP客户端类
 */
export class MCPClient {
  private client: Client | null = null
  private transport: StdioClientTransport | null = null

  /**
   * 连接到MCP服务器
   */
  async connect(): Promise<void> {
    try {
      // 读取MCP服务器配置
      const configPath = MCP_CONFIG.serverPath
      let serverConfig

      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf-8')
        serverConfig = JSON.parse(configContent)
      } else {
        // 如果配置文件不存在，使用默认配置
        serverConfig = {
          command: 'npx',
          args: ['-y', '@amap/mcp-server'],
        }
      }

      // 创建传输层
      this.transport = new StdioClientTransport({
        command: serverConfig.command,
        args: serverConfig.args,
      })

      // 创建客户端
      this.client = new Client(
        {
          name: 'travel-guide-backend',
          version: '1.0.0',
        },
        {
          capabilities: {},
        }
      )

      // 连接到服务器
      await this.client.connect(this.transport)
      console.log('MCP客户端连接成功')
    } catch (error) {
      console.error('MCP客户端连接失败:', error)
      throw error
    }
  }

  /**
   * 断开MCP连接
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
    if (this.transport) {
      await this.transport.close()
      this.transport = null
    }
    console.log('MCP客户端已断开连接')
  }

  /**
   * 调用MCP工具
   * @param toolName 工具名称
   * @param args 工具参数
   * @returns 工具执行结果
   */
  async callTool(toolName: string, args: any): Promise<any> {
    if (!this.client) {
      throw new Error('MCP客户端未连接')
    }

    try {
      const result = await this.client.callTool({
        name: toolName,
        arguments: args,
      })

      return result.content
    } catch (error) {
      console.error(`调用MCP工具失败 [${toolName}]:`, error)
      throw error
    }
  }

  /**
   * 检查客户端是否已连接
   * @returns 是否已连接
   */
  isConnected(): boolean {
    return this.client !== null
  }
}

/**
 * 创建并初始化MCP客户端实例
 */
export const createMCPClient = async (): Promise<MCPClient> => {
  const client = new MCPClient()
  await client.connect()
  return client
}

/**
 * 默认MCP客户端实例
 */
let defaultMCPClient: MCPClient | null = null

/**
 * 获取默认MCP客户端实例（单例模式）
 * @returns MCP客户端实例
 */
export const getMCPClient = async (): Promise<MCPClient> => {
  if (!defaultMCPClient || !defaultMCPClient.isConnected()) {
    defaultMCPClient = await createMCPClient()
  }
  return defaultMCPClient
}