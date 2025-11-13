import { Router } from 'express'
import {
  getDestinations,
  getDestinationDetail,
  searchDestinations,
  getGuides,
  getGuideDetail,
  createGuide,
  getRecommendedGuides,
} from './travel'

const router = Router()

// 目的地相关路由
router.get('/destinations', getDestinations)
router.get('/destinations/:id', getDestinationDetail)
router.get('/destinations/search', searchDestinations)

// 攻略相关路由
router.get('/guides', getGuides)
router.get('/guides/:id', getGuideDetail)
router.post('/guides', createGuide)
router.get('/guides/recommended', getRecommendedGuides)

export default router
