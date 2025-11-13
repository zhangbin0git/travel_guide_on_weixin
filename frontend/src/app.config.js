export default {
  pages: [
    'pages/home/index',
    'pages/search/index',
    'pages/guide/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '旅行攻略',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#ff6b6b',
    backgroundColor: '#fff',
    borderStyle: 'black',
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