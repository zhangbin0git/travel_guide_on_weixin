构建一个 MCP Client的方法，具体方法如下：

1. 使用 TypeScript 语言
2. 代码要简洁，易读，易维护。要适当添加注释。
4. MCP Client 实现要完全遵循 MCP 协议。
5. 请根据我提供的已经验证过 MCP 服务器进行自测，你需要建立一个 MCP Server 的配置文件，具体配置信息后续我会填充，当前你可按照下面给的示例填充
6. 使用 OpenAI SDK 替换 @anthropic-ai/sdk，可以兼容更多的大模型，你需要将模型的配置信息放到 .env 文件中，你可以创建一个 .env 的 example 文件

请一定认真阅读以上需求，并严格遵守。实现过程中请一定参考以下文档：
1. 针对客户端开发者 MCP 开发指南 https://modelcontextprotocol.io/quickstart/client#node
2. MCP 核心架构 https://modelcontextprotocol.io/docs/concepts/architecture
3. TypeScript 开发的 MCP Client 示例 https://github.com/modelcontextprotocol/quickstart-resources/blob/main/mcp-client-typescript/index.ts
4. llms-full.txt https://modelcontextprotocol.io/llms-full.txt
5. 用于调试的 MCP 服务器配置示例
{
  "mcpServers": {
    "amap-sse": {
      "url": "https://mcp.amap.com/sse?key=71c9de2861765469608fd94dec354c10"
    }
  }
}
  
6. 使用 OpenAI SDK 替换 @anthropic-ai/sdk，使用阿里 Qwen API https://bailian.console.aliyun.com/?spm=a2c4g.11186623.0.0.2fc948233ZRN85&tab=api#/api/?type=model&url=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F2712576.html

