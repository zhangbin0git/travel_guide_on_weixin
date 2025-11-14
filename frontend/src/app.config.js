export default {
  pages: [
    'pages/home/index',
    'pages/search/index',
    'pages/guide/index',
    'pages/guide-detail/index',
    'pages/profile/index',
    // 扩展页面
    'pages/my-guides/index',
    'pages/favorites/index',
    'pages/history/index',
    'pages/settings/index',
    'pages/edit-profile/index',
    'pages/feedback/index',
    'pages/about/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '旅行攻略',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666',
    selectedColor: '#1890ff',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/tab-bar/home.png',
        selectedIconPath: './assets/tab-bar/home-active.png'
      },
      {
        pagePath: 'pages/search/index',
        text: '搜索',
        iconPath: './assets/tab-bar/search.png',
        selectedIconPath: './assets/tab-bar/search-active.png'
      },
      {
        pagePath: 'pages/guide/index',
        text: '攻略',
        iconPath: './assets/tab-bar/guide.png',
        selectedIconPath: './assets/tab-bar/guide-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: './assets/tab-bar/profile.png',
        selectedIconPath: './assets/tab-bar/profile-active.png'
      }
    ]
  }
}