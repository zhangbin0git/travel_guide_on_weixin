import { Router } from 'express'
import {
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
  generateTravelGuide
} from '../controllers/travel'
import { authenticate } from '../middleware/auth'

const router = Router()

// 目的地相关路由
router.get('/destinations', getDestinations)
router.get('/destinations/search', searchDestinations)
router.get('/destinations/:id', getDestinationDetail)

// 攻略相关路由
router.get('/guides', getGuides)
router.get('/guides/recommended', getRecommendedGuides)
router.get('/guides/:id', getGuideDetail)
router.post('/guides', authenticate, createGuide)
router.post('/guides/generate', generateTravelGuide)

// 旅行计划相关路由
router.get('/plans', authenticate, getTravelPlans)
router.get('/plans/:id', getTravelPlanDetail)
router.post('/plans', authenticate, createTravelPlan)

export default router