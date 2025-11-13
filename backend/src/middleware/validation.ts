import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'

/**
 * 验证中间件工厂函数
 * @param schema Joi验证模式
 * @param source 验证数据来源，默认为body
 * @returns 验证中间件
 */
export const validate = (schema: Schema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    })

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }))

      return res.status(400).json({
        code: 400,
        message: '请求参数验证失败',
        data: errors,
        timestamp: Date.now(),
      })
    }

    // 将验证后的值替换原始值
    req[source] = value
    next()
  }
}

/**
 * 验证请求体
 * @param schema Joi验证模式
 * @returns 验证中间件
 */
export const validateBody = (schema: Schema) => validate(schema, 'body')

/**
 * 验证查询参数
 * @param schema Joi验证模式
 * @returns 验证中间件
 */
export const validateQuery = (schema: Schema) => validate(schema, 'query')

/**
 * 验证路径参数
 * @param schema Joi验证模式
 * @returns 验证中间件
 */
export const validateParams = (schema: Schema) => validate(schema, 'params')
