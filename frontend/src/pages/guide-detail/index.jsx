import React, { useState, useEffect } from 'react'
import { View, Text, Image, Button as TaroButton } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

/**
 * 攻略详情页组件
 */
const GuideDetail = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [guideData, setGuideData] = useState(null)
  const [isCollected, setIsCollected] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(128)
  const [shareVisible, setShareVisible] = useState(false)

  // 页面参数
  useEffect(() => {
    const params = Taro.getCurrentInstance().router.params
    if (params.id) {
      loadGuideDetail(params.id)
    }
  }, [])

  // 加载攻略详情
  const loadGuideDetail = async (guideId) => {
    setLoading(true)
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟攻略详情数据
      const mockGuideData = {
        id: guideId,
        title: '北京三日游完美攻略',
        destination: '北京',
        duration: '3天',
        budget: '2000-3000元',
        author: {
          id: '1',
          name: '旅行达人小王',
          avatar: 'https://img.qzonestyle.top/2020/05/24/avatar1.png',
          level: '高级旅行家'
        },
        coverImage: 'https://img.qzonestyle.top/2020/05/24/beijing-cover.png',
        tags: ['历史文化', '美食探索', '摄影打卡'],
        publishTime: '2024-01-15',
        readCount: 5234,
        summary: '这是一份详细的北京三日游攻略，涵盖了故宫、长城、天坛等著名景点，以及地道的北京美食推荐，让你的北京之行完美无缺。',
        itinerary: [
          {
            day: 1,
            title: '皇家文化之旅',
            date: '第1天',
            spots: [
              {
                name: '天安门广场',
                time: '08:00-09:00',
                description: '观看升旗仪式，感受庄严氛围',
                tips: '建议提前1小时到达，安检需要时间',
                images: ['https://img.qzonestyle.top/2020/05/24/tiananmen.png']
              },
              {
                name: '故宫博物院',
                time: '09:30-14:00',
                description: '游览紫禁城，了解明清皇室文化',
                tips: '建议租用讲解器，提前网上预约门票',
                images: ['https://img.qzonestyle.top/2020/05/24/gugong.png']
              },
              {
                name: '景山公园',
                time: '14:30-16:00',
                description: '登顶俯瞰故宫全景',
                tips: '日落时分景色最佳',
                images: ['https://img.qzonestyle.top/2020/05/24/jingshan.png']
              }
            ],
            meals: [
              {
                type: '午餐',
                name: '全聚德烤鸭店',
                description: '品尝正宗北京烤鸭',
                price: '人均150-200元'
              },
              {
                type: '晚餐',
                name: '簋街美食',
                description: '体验北京夜市文化',
                price: '人均50-100元'
              }
            ]
          },
          {
            day: 2,
            title: '长城雄风之旅',
            date: '第2天',
            spots: [
              {
                name: '八达岭长城',
                time: '08:00-14:00',
                description: '攀登万里长城，感受中华文明',
                tips: '建议穿舒适运动鞋，带好防晒用品',
                images: ['https://img.qzonestyle.top/2020/05/24/badaling.png']
              },
              {
                name: '明十三陵',
                time: '15:00-17:00',
                description: '参观明朝皇陵，了解古代陵墓文化',
                tips: '建议请导游讲解，历史价值很高',
                images: ['https://img.qzonestyle.top/2020/05/24/mingtombs.png']
              }
            ],
            meals: [
              {
                type: '午餐',
                name: '长城脚下农家院',
                description: '品尝农家菜，体验乡村生活',
                price: '人均80-120元'
              },
              {
                type: '晚餐',
                name: '王府井小吃街',
                description: '品尝各种北京小吃',
                price: '人均30-80元'
              }
            ]
          },
          {
            day: 3,
            title: '文化休闲之旅',
            date: '第3天',
            spots: [
              {
                name: '天坛公园',
                time: '09:00-11:30',
                description: '参观古代祭天建筑，感受天人合一',
                tips: '早晨可以看到当地人晨练，很有生活气息',
                images: ['https://img.qzonestyle.top/2020/05/24/tiantan.png']
              },
              {
                name: '南锣鼓巷',
                time: '14:00-16:00',
                description: '逛胡同，体验老北京文化',
                tips: '有很多特色小店和咖啡馆',
                images: ['https://img.qzonestyle.top/2020/05/24/nanluogu.png']
              },
              {
                name: '后海酒吧街',
                time: '19:00-21:00',
                description: '体验北京夜生活',
                tips: '有很多live house，可以听民谣',
                images: ['https://img.qzonestyle.top/2020/05/24/houhai.png']
              }
            ],
            meals: [
              {
                type: '午餐',
                name: '老北京炸酱面',
                description: '品尝地道北京面食',
                price: '人均30-50元'
              },
              {
                type: '晚餐',
                name: '后海餐厅',
                description: '边欣赏夜景边用餐',
                price: '人均100-150元'
              }
            ]
          }
        ],
        transportation: {
          '机场到市区': '机场快轨/机场大巴，约1小时，费用25-30元',
          '市内交通': '地铁为主，配合公交，建议购买交通卡',
          '景点间交通': '地铁+步行，部分景点可乘坐旅游专线'
        },
        accommodation: {
          '推荐区域': '王府井、前门、西单区域，交通便利',
          '价格区间': '经济型200-400元，舒适型400-800元，豪华型800元以上',
          '预订建议': '提前1-2周预订，旺季需更早'
        },
        budget: {
          '交通': '约500元（含往返机票）',
          '住宿': '约600元（2晚）',
          '餐饮': '约400元',
          '门票': '约300元',
          '其他': '约200元',
          '总计': '约2000元'
        },
        tips: [
          '北京春秋两季最佳，避开节假日高峰期',
          '故宫、长城等热门景点一定要提前网上预约',
          '北京天气干燥，多喝水，注意保湿',
          '地铁是最便捷的交通方式，建议办理交通卡',
          '老北京小吃很有特色，但注意卫生',
          '拍照时注意文物保护规定'
        ]
      }
      
      setGuideData(mockGuideData)
    } catch (error) {
      Taro.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  // 收藏攻略
  const handleCollect = () => {
    setIsCollected(!isCollected)
    Taro.showToast({
      title: isCollected ? '已取消收藏' : '收藏成功',
      icon: 'success'
    })
  }

  // 点赞攻略
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    Taro.showToast({
      title: isLiked ? '已取消点赞' : '点赞成功',
      icon: 'success'
    })
  }

  // 分享攻略
  const handleShare = () => {
    setShareVisible(true)
  }

  // 分享到微信
  const handleShareToWechat = () => {
    Taro.showToast({
      title: '分享功能开发中',
      icon: 'none'
    })
    setShareVisible(false)
  }

  // 分享到朋友圈
  const handleShareToMoments = () => {
    Taro.showToast({
      title: '分享功能开发中',
      icon: 'none'
    })
    setShareVisible(false)
  }

  // 复制链接
  const handleCopyLink = () => {
    Taro.setClipboardData({
      data: `https://travel.example.com/guide/${guideData?.id}`,
      success: () => {
        Taro.showToast({
          title: '链接已复制',
          icon: 'success'
        })
      }
    })
    setShareVisible(false)
  }

  // 渲染作者信息
  const renderAuthor = () => (
    <View className='author-info'>
      <Image 
        className='author-avatar' 
        src={guideData.author.avatar}
        mode='aspectFill'
      />
      <View className='author-details'>
        <Text className='author-name'>{guideData.author.name}</Text>
        <Text className='author-level'>{guideData.author.level}</Text>
      </View>
      <Button 
        type='outline' 
        size='small'
        onClick={() => Taro.showToast({ title: '关注功能开发中', icon: 'none' })}
      >
        + 关注
      </Button>
    </View>
  )

  // 渲染行程安排
  const renderItinerary = () => (
    <View className='itinerary-section'>
      <Text className='section-title'>行程安排</Text>
      {guideData.itinerary.map((day, index) => (
        <Card key={index} className='day-card'>
          <View className='day-header'>
            <Text className='day-title'>{day.title}</Text>
            <Text className='day-date'>{day.date}</Text>
          </View>
          
          {day.spots.map((spot, spotIndex) => (
            <View key={spotIndex} className='spot-item'>
              <View className='spot-time'>{spot.time}</View>
              <View className='spot-content'>
                <Text className='spot-name'>{spot.name}</Text>
                <Text className='spot-description'>{spot.description}</Text>
                {spot.tips && (
                  <View className='spot-tips'>
                    <Text className='tips-label'>💡 小贴士：</Text>
                    <Text className='tips-text'>{spot.tips}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
          
          <View className='meals-section'>
            <Text className='meals-title'>🍽️ 用餐推荐</Text>
            {day.meals.map((meal, mealIndex) => (
              <View key={mealIndex} className='meal-item'>
                <Text className='meal-type'>{meal.type}：</Text>
                <Text className='meal-name'>{meal.name}</Text>
                <Text className='meal-desc'>{meal.description}</Text>
                <Text className='meal-price'>{meal.price}</Text>
              </View>
            ))}
          </View>
        </Card>
      ))}
    </View>
  )

  // 渲染实用信息
  const renderPracticalInfo = () => (
    <View className='practical-info'>
      <Card title='🚗 交通信息' className='info-card'>
        {Object.entries(guideData.transportation).map(([key, value]) => (
          <View key={key} className='info-item'>
            <Text className='info-label'>{key}：</Text>
            <Text className='info-value'>{value}</Text>
          </View>
        ))}
      </Card>

      <Card title='🏨 住宿建议' className='info-card'>
        {Object.entries(guideData.accommodation).map(([key, value]) => (
          <View key={key} className='info-item'>
            <Text className='info-label'>{key}：</Text>
            <Text className='info-value'>{value}</Text>
          </View>
        ))}
      </Card>

      <Card title='💰 预算明细' className='info-card'>
        {Object.entries(guideData.budget).map(([key, value]) => (
          <View key={key} className='info-item'>
            <Text className='info-label'>{key}：</Text>
            <Text className='info-value'>{value}</Text>
          </View>
        ))}
      </Card>

      <Card title='📝 温馨提示' className='info-card'>
        {guideData.tips.map((tip, index) => (
          <Text key={index} className='tip-item'>• {tip}</Text>
        ))}
      </Card>
    </View>
  )

  // 渲染分享弹窗
  const renderShareModal = () => (
    shareVisible && (
      <View className='share-modal'>
        <View className='share-mask' onClick={() => setShareVisible(false)} />
        <View className='share-content'>
          <Text className='share-title'>分享攻略</Text>
          <View className='share-options'>
            <View className='share-option' onClick={handleShareToWechat}>
              <Text className='share-icon'>💬</Text>
              <Text className='share-text'>微信好友</Text>
            </View>
            <View className='share-option' onClick={handleShareToMoments}>
              <Text className='share-icon'>👥</Text>
              <Text className='share-text'>朋友圈</Text>
            </View>
            <View className='share-option' onClick={handleCopyLink}>
              <Text className='share-icon'>🔗</Text>
              <Text className='share-text'>复制链接</Text>
            </View>
          </View>
          <Button 
            type='text' 
            size='medium'
            onClick={() => setShareVisible(false)}
          >
            取消
          </Button>
        </View>
      </View>
    )
  )

  if (loading) {
    return <Loading fullScreen text='加载中...' />
  }

  if (!guideData) {
    return (
      <View className='guide-detail'>
        <TopNavBar title='攻略详情' showBack />
        <View className='error-content'>
          <Text className='error-text'>攻略不存在或已删除</Text>
          <Button type='primary' onClick={() => router.safeGoBack()}>
            返回上一页
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View className='guide-detail'>
      <TopNavBar title='攻略详情' showBack />
      
      <View className='guide-content'>
        {/* 封面图片 */}
        <View className='cover-section'>
          <Image 
            className='cover-image' 
            src={guideData.coverImage}
            mode='aspectFill'
          />
          <View className='cover-overlay'>
            <Text className='guide-title'>{guideData.title}</Text>
            <View className='guide-meta'>
              <Text className='meta-item'>📍 {guideData.destination}</Text>
              <Text className='meta-item'>⏱️ {guideData.duration}</Text>
              <Text className='meta-item'>💰 {guideData.budget}</Text>
            </View>
          </View>
        </View>

        {/* 作者信息 */}
        <Card className='author-card'>
          {renderAuthor()}
        </Card>

        {/* 攻略简介 */}
        <Card title='攻略简介' className='summary-card'>
          <Text className='summary-text'>{guideData.summary}</Text>
          <View className='guide-tags'>
            {guideData.tags.map((tag, index) => (
              <Text key={index} className='tag'>#{tag}</Text>
            ))}
          </View>
        </Card>

        {/* 行程安排 */}
        {renderItinerary()}

        {/* 实用信息 */}
        {renderPracticalInfo()}

        {/* 操作按钮 */}
        <View className='action-bar'>
          <View className='action-left'>
            <View className='action-item' onClick={handleCollect}>
              <Text className='action-icon'>{isCollected ? '❤️' : '🤍'}</Text>
              <Text className='action-text'>收藏</Text>
            </View>
            <View className='action-item' onClick={handleLike}>
              <Text className='action-icon'>{isLiked ? '👍' : '👍🏻'}</Text>
              <Text className='action-text'>{likeCount}</Text>
            </View>
          </View>
          <View className='action-right'>
            <Button 
              type='primary' 
              size='medium'
              onClick={handleShare}
            >
              分享攻略
            </Button>
          </View>
        </View>
      </View>

      {/* 分享弹窗 */}
      {renderShareModal()}
    </View>
  )
}

export default GuideDetail