import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { sendError } from './response'

// 验证中间件工厂函数
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ')
      return sendError(res, 400, message)
    }
    
    next()
  }
}

// 验证查询参数
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query)
    
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ')
      return sendError(res, 400, message)
    }
    
    next()
  }
}

// 验证路径参数
export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params)
    
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ')
      return sendError(res, 400, message)
    }
    
    next()
  }
}

// 常用验证规则
export const commonValidations = {
  id: Joi.string().required().messages({
    'string.empty': 'ID不能为空',
    'any.required': 'ID是必填项'
  }),
  
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  }),
  
  keyword: Joi.string().min(1).max(50).messages({
    'string.empty': '关键词不能为空',
    'string.min': '关键词至少需要1个字符',
    'string.max': '关键词不能超过50个字符'
  }),
  
  coordinates: Joi.object({
    longitude: Joi.number().min(-180).max(180).required(),
    latitude: Joi.number().min(-90).max(90).required()
  }).messages({
    'object.unknown': '坐标格式不正确',
    'any.required': '坐标是必填项'
  })
}