import Joi from 'joi'

// 用户相关验证规则
export const userValidation = {
  login: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
  }),

  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().required(),
    nickname: Joi.string().min(2).max(30).optional(),
  }),

  update: Joi.object({
    nickname: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().optional(),
    avatar: Joi.string().uri().optional(),
  }),
}

// 旅行相关验证规则
export const travelValidation = {
  destination: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(500).optional(),
    image: Joi.string().uri().optional(),
    location: Joi.object({
      longitude: Joi.number().min(-180).max(180).required(),
      latitude: Joi.number().min(-90).max(90).required(),
    }).required(),
  }),

  guide: Joi.object({
    title: Joi.string().min(5).max(100).required(),
    content: Joi.string().min(20).required(),
    destinationId: Joi.number().integer().positive().required(),
    tags: Joi.array().items(Joi.string().max(20)).max(10).optional(),
    images: Joi.array().items(Joi.string().uri()).max(9).optional(),
  }),
}

// 地图相关验证规则
export const mapValidation = {
  geocode: Joi.object({
    address: Joi.string().min(2).max(100).required(),
    city: Joi.string().max(50).optional(),
  }),

  regeocode: Joi.object({
    location: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
  }),

  search: Joi.object({
    keywords: Joi.string().min(2).max(50).required(),
    city: Joi.string().max(50).optional(),
    citylimit: Joi.boolean().optional(),
  }),

  around: Joi.object({
    keywords: Joi.string().min(2).max(50).required(),
    location: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
    radius: Joi.number().integer().min(100).max(50000).optional(),
  }),

  driving: Joi.object({
    origin: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
    destination: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
  }),

  walking: Joi.object({
    origin: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
    destination: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
  }),

  bicycling: Joi.object({
    origin: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
    destination: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
  }),

  distance: Joi.object({
    origins: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)(\|(-?\d+\.?\d*),(-?\d+\.?\d*))*$/)
      .required(),
    destination: Joi.string()
      .pattern(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/)
      .required(),
    type: Joi.string().valid('0', '1', '3').optional(),
  }),
}

// 通用验证规则
export const commonValidation = {
  id: Joi.number().integer().positive().required(),
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
  keyword: Joi.string().min(1).max(50).required(),
}
