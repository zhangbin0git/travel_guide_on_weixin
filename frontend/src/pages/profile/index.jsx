import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TopNavBar from '../../components/common/TopNavBar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import { useRouter } from '../../hooks/useRouter'
import './index.scss'

const Profile = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    avatar: '',
    nickname: '旅行达人',
    level: 'LV.5',
    totalGuides: 12,
    totalLikes: 256,
    totalViews: 1280
  })

  // 处理登录
  const handleLogin = async () => {
    try {
      setLoading(true)
      // 这里应该调用微信登录API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟登录成功
      setUserInfo({
        avatar: 'https://via.placeholder.com/100x100',
        nickname: '旅行达人',
        level: 'LV.5',
        totalGuides: 12,
        totalLikes: 256,
        totalViews: 1280
      })
      
      Taro.showToast({
        title: '登录成功',
        icon: 'success'
      })
    } catch (error) {
      Taro.showToast({
        title: '登录失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  // 处理退出登录
  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          setUserInfo(null)
          Taro.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  }

  // 处理菜单项点击
  const handleMenuClick = (type) => {
    switch (type) {
      case 'myGuides':
        router.goToMyGuides()
        break
      case 'favorites':
        router.goToFavorites()
        break
      case 'history':
        router.goToHistory()
        break
      case 'settings':
        router.goToSettings()
        break
      case 'feedback':
        router.goToFeedback()
        break
      case 'about':
        router.goToAbout()
        break
      default:
        console.log('点击了菜单项:', type)
    }
  }

  // 处理编辑资料
  const handleEditProfile = () => {
    router.goToEditProfile()
  }

  return (
    <View className='profile'>
      <TopNavBar 
        title='个人中心'
        backgroundColor='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        textColor='#fff'
      />
      
      {loading && <Loading overlay text='登录中...' />}

      <View className='profile-content'>
        {/* 用户信息卡片 */}
        <Card className='user-card'>
          {userInfo ? (
            <View className='user-info'>
              <View className='user-avatar'>
                <image 
                  className='avatar-image'
                  src={userInfo.avatar || 'https://via.placeholder.com/100x100'}
                  mode='aspectFill'
                />
                <View className='level-badge'>
                  <Text className='level-text'>{userInfo.level}</Text>
                </View>
              </View>
              
              <View className='user-details'>
                <Text className='nickname'>{userInfo.nickname}</Text>
                <Text className='user-desc'>热爱旅行，分享美好</Text>
                
                <View className='user-stats'>
                  <View className='stat-item'>
                    <Text className='stat-number'>{userInfo.totalGuides}</Text>
                    <Text className='stat-label'>攻略</Text>
                  </View>
                  <View className='stat-item'>
                    <Text className='stat-number'>{userInfo.totalLikes}</Text>
                    <Text className='stat-label'>获赞</Text>
                  </View>
                  <View className='stat-item'>
                    <Text className='stat-number'>{userInfo.totalViews}</Text>
                    <Text className='stat-label'>浏览</Text>
                  </View>
                </View>
              </View>
              
              <Button 
                type='outline' 
                size='small'
                onClick={handleEditProfile}
              >
                编辑资料
              </Button>
            </View>
          ) : (
            <View className='login-prompt'>
              <View className='login-icon'>👤</View>
              <Text className='login-text'>登录后查看更多信息</Text>
              <Button 
                type='primary' 
                size='medium'
                onClick={handleLogin}
              >
                立即登录
              </Button>
            </View>
          )}
        </Card>

        {/* 我的服务 */}
        <Card className='service-card'>
          <View className='card-header'>
            <Text className='card-title'>我的服务</Text>
          </View>
          
          <View className='service-grid'>
            <View 
              className='service-item'
              onClick={() => handleMenuClick('myGuides')}
            >
              <View className='service-icon'>📝</View>
              <Text className='service-text'>我的攻略</Text>
            </View>
            <View 
              className='service-item'
              onClick={() => handleMenuClick('favorites')}
            >
              <View className='service-icon'>⭐</View>
              <Text className='service-text'>收藏夹</Text>
            </View>
            <View 
              className='service-item'
              onClick={() => handleMenuClick('history')}
            >
              <View className='service-icon'>🕐</View>
              <Text className='service-text'>历史记录</Text>
            </View>
            <View 
              className='service-item'
              onClick={() => handleMenuClick('settings')}
            >
              <View className='service-icon'>⚙️</View>
              <Text className='service-text'>设置</Text>
            </View>
          </View>
        </Card>

        {/* 更多功能 */}
        <Card className='menu-card'>
          <View className='menu-list'>
            <View 
              className='menu-item'
              onClick={() => handleMenuClick('feedback')}
            >
              <View className='menu-icon'>💬</View>
              <Text className='menu-text'>意见反馈</Text>
              <View className='menu-arrow'>›</View>
            </View>
            
            <View 
              className='menu-item'
              onClick={() => handleMenuClick('about')}
            >
              <View className='menu-icon'>ℹ️</View>
              <Text className='menu-text'>关于我们</Text>
              <View className='menu-arrow'>›</View>
            </View>
            
            <View className='menu-item'>
              <View className='menu-icon'>📞</View>
              <Text className='menu-text'>联系客服</Text>
              <View className='menu-arrow'>›</View>
            </View>
            
            <View className='menu-item'>
              <View className='menu-icon'>🔄</View>
              <Text className='menu-text'>检查更新</Text>
              <View className='menu-arrow'>›</View>
            </View>
          </View>
        </Card>

        {/* 退出登录按钮 */}
        {userInfo && (
          <View className='logout-section'>
            <Button 
              type='outline' 
              size='large'
              block
              onClick={handleLogout}
            >
              退出登录
            </Button>
          </View>
        )}
      </View>
    </View>
  )
}

export default Profile