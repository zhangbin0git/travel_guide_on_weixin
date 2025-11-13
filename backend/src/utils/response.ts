import { Response } from 'express'

/**
 * 统一成功响应格式
 * @param res Express响应对象
 * @param data 响应数据
 * @param message 响应消息
 * @param code 响应状态码，默认200
 */
export const sendSuccess = (
  res: Response,
  data: any = null,
  message: string = '操作成功',
  code: number = 200
) => {
  res.status(code).json({
    code,
    message,
    data,
    timestamp: Date.now()
  })
}

/**
 * 统一错误响应格式
 * @param res Express响应对象
 * @param message 错误消息
 * @param code 错误状态码
 * @param data 错误详情
 */
export const sendError = (
  res: Response,
  message: string,
  code: number = 500,
  data: any = null
) => {
  res.status(code).json({
    code,
    message,
    data,
    timestamp: Date.now()
  })
}

/**
 * 分页响应格式
 * @param res Express响应对象
 * @param data 响应数据
 * @param page 当前页码
 * @param limit 每页数量
 * @param total 总数量
 * @param message 响应消息
 */
export const sendPaginatedResponse = (
  res: Response,
  data: any[],
  page: number,
  limit: number,
  total: number,
  message: string = '获取数据成功'
) => {
  const totalPages = Math.ceil(total / limit)
  
  res.status(200).json({
    code: 200,
    message,
    data: {
      items: data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    },
    timestamp: Date.now()
  })
}