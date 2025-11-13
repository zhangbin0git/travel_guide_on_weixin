import { Request, Response } from 'express'
import { travelService } from '../services/travel'
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/response'

/**
 * 旅行控制器
 */
export class TravelController {
  /**
   * 获取目的地列表
   */
  async getDestinations(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, keyword } = req.query

      const result = await travelService.getDestinations({
        page: Number(page),
        limit: Number(limit),
        keyword: keyword as string,
      })

      sendPaginatedResponse(res, result.data, result.total, Number(page), Number(limit))
    } catch (error) {
      sendError(res, '获取目的地列表失败', 500)
    }
  }

  /**
   * 获取目的地详情
   */
  async getDestinationDetail(req: Request, res: Response) {
    try {
      const { id } = req.params

      const destination = await travelService.getDestinationById(id)

      if (!destination) {
        return sendError(res, '目的地不存在', 404)
      }

      sendSuccess(res, destination, '获取目的地详情成功')
    } catch (error) {
      sendError(res, '获取目的地详情失败', 500)
    }
  }

  /**
   * 搜索目的地
   */
  async searchDestinations(req: Request, res: Response) {
    try {
      const { keyword, page = 1, limit = 10 } = req.query

      if (!keyword) {
        return sendError(res, '搜索关键词不能为空', 400)
      }

      const result = await travelService.searchDestinations({
        keyword: keyword as string,
        page: Number(page),
        limit: Number(limit),
      })

      sendPaginatedResponse(res, result.data, result.total, Number(page), Number(limit))
    } catch (error) {
      sendError(res, '搜索目的地失败', 500)
    }
  }

  /**
   * 获取旅行攻略列表
   */
  async getGuides(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, destination_id, category } = req.query

      const result = await travelService.getGuides({
        page: Number(page),
        limit: Number(limit),
        destinationId: destination_id as string,
        category: category as string,
      })

      sendPaginatedResponse(res, result.data, result.total, Number(page), Number(limit))
    } catch (error) {
      sendError(res, '获取攻略列表失败', 500)
    }
  }

  /**
   * 获取攻略详情
   */
  async getGuideDetail(req: Request, res: Response) {
    try {
      const { id } = req.params

      const guide = await travelService.getGuideById(id)

      if (!guide) {
        return sendError(res, '攻略不存在', 404)
      }

      sendSuccess(res, guide, '获取攻略详情成功')
    } catch (error) {
      sendError(res, '获取攻略详情失败', 500)
    }
  }

  /**
   * 创建攻略
   */
  async createGuide(req: Request, res: Response) {
    try {
      const userId = req.user?.id

      if (!userId) {
        return sendError(res, '未授权访问', 401)
      }

      const { title, description, content, destination_id, tags } = req.body

      // 验证必填字段
      if (!title || !description || !content || !destination_id) {
        return sendError(res, '标题、描述、内容和目的地ID不能为空', 400)
      }

      const guide = await travelService.createGuide({
        title,
        description,
        content,
        destinationId: destination_id,
        tags,
        authorId: userId,
      })

      sendSuccess(res, guide, '创建攻略成功', 201)
    } catch (error) {
      sendError(res, '创建攻略失败', 500)
    }
  }

  /**
   * 获取推荐攻略
   */
  async getRecommendedGuides(req: Request, res: Response) {
    try {
      const { limit = 10 } = req.query

      const guides = await travelService.getRecommendedGuides({
        limit: Number(limit),
      })

      sendSuccess(res, guides, '获取推荐攻略成功')
    } catch (error) {
      sendError(res, '获取推荐攻略失败', 500)
    }
  }

  /**
   * 获取旅行计划列表
   */
  async getTravelPlans(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, userId } = req.query

      const result = await travelService.getTravelPlans({
        page: Number(page),
        limit: Number(limit),
        userId: (userId as string) || req.user?.id || '',
      })

      sendPaginatedResponse(res, result.data, result.total, Number(page), Number(limit))
    } catch (error) {
      sendError(res, '获取旅行计划列表失败', 500)
    }
  }

  /**
   * 获取旅行计划详情
   */
  async getTravelPlanDetail(req: Request, res: Response) {
    try {
      const { id } = req.params

      const plan = await travelService.getTravelPlanById(id)

      if (!plan) {
        return sendError(res, '旅行计划不存在', 404)
      }

      sendSuccess(res, plan, '获取旅行计划详情成功')
    } catch (error) {
      sendError(res, '获取旅行计划详情失败', 500)
    }
  }

  /**
   * 创建旅行计划
   */
  async createTravelPlan(req: Request, res: Response) {
    try {
      const userId = req.user?.id

      if (!userId) {
        return sendError(res, '未授权访问', 401)
      }

      const { title, destination, start_date, end_date, days, budget, notes } = req.body

      // 验证必填字段
      if (!title || !destination || !start_date || !end_date || !days) {
        return sendError(res, '标题、目的地、开始日期、结束日期和天数为必填字段', 400)
      }

      const plan = await travelService.createTravelPlan({
        title,
        destination,
        startDate: start_date,
        endDate: end_date,
        days: Number(days),
        budget,
        notes,
        userId,
      })

      sendSuccess(res, plan, '创建旅行计划成功', 201)
    } catch (error) {
      sendError(res, '创建旅行计划失败', 500)
    }
  }

  /**
   * 生成AI旅行攻略
   */
  async generateTravelGuide(req: Request, res: Response) {
    try {
      const { destination, days, budget, interests, travel_style } = req.body

      // 验证必填字段
      if (!destination || !days) {
        return sendError(res, '目的地和天数为必填字段', 400)
      }

      const guide = await travelService.generateTravelGuide({
        destination,
        days: Number(days),
        budget,
        interests,
        travelStyle: travel_style,
      })

      sendSuccess(res, guide, '生成旅行攻略成功')
    } catch (error) {
      sendError(res, '生成旅行攻略失败', 500)
    }
  }
}

// 导出控制器实例
export const travelController = new TravelController()

// 导出各个方法，方便路由使用
export const {
  getDestinations,
  getDestinationDetail,
  searchDestinations,
  getGuides,
  getGuideDetail,
  createGuide,
  getRecommendedGuides,
  getTravelPlans,
  getTravelPlanDetail,
  createTravelPlan,
  generateTravelGuide,
} = travelController
