根据需求文档，完成技术架构设计文档，结果以 Markdown 格式写入 docs 目录下。

1. 设定清晰的目录结构规范。
2. 设定编码规范。
3. 我们的平台是微信是微信小程序，前端技术栈选择一个符合微信小程序要求的框架。
4. 后端部分使用千问大模型解析用户提示词，通过 MCP 的方式进行工具调用。涉及到大模型和 MCP Server 工具调用，生成攻略这里可能会很慢，接口使用 Websocket的方案给前端返回数据。为了避免复杂度，后端部分我们使用腾讯云函数完成接口开发。
5. 需要注意的是后端我们使用的是腾讯的云函数，一个云函数就相等于一个独立的小应用，腾讯云函数 “web函数” 介绍可以参考 https://cloud.tencent.com/document/product/583/56124 https://cloud.tencent.com/document/product/583/56126 。腾讯云函数对 Websocket 协议支持的文档描述 https://cloud.tencent.com/document/product/583/63406。
6. 我们需要实现一个通用的 MCP Client 调用 MCP Server 工具。采用标准的 MCP 配置文件格式，和 Trae、Cursor 里面的 MCP 配置文件一样，我们的项目目前只需要高德地图 MCP Server 的配置，我们会使用标准的 MCP 规范 https://github.com/modelcontextprotocol/typescript-sdk 。参考mcp_client_guide.md中的内容。
7. 所有的技术方案都是确定的，不要带一些不确定或二选一的方案再让我做决策。
8. 开始之前你先调用 Sequential Thinking 工具进行深度思考。
9. 架构图和数据流图用 Mermaid 语法绘制，使其更专业、更直观。
10. 技术架构里再补充下 后端使用 Express 框架，Nodejs 20.19 版本。

# 高德地图MCP Server 配置示例
{
  "mcpServers": {
    "amap-maps-streamableHTTP": {
      "url": "https://mcp.amap.com/sse?key=xxxx"
    }
  }
}


当前只是在实现技术架构文档，请你完成后，立即停止。技术架构文档不要有代码实现内容。

