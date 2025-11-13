export default defineAppConfig({
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
    color: '#999999',
    selectedColor: '#1aad19',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home-active.png',
        text: '首页'
      },
      {
        pagePath: 'pages/search/index',
        iconPath: 'assets/images/search.png',
        selectedIconPath: 'assets/images/search-active.png',
        text: '搜索'
      },
      {
        pagePath: 'pages/guide/index',
        iconPath: 'assets/images/guide.png',
        selectedIconPath: 'assets/images/guide-active.png',
        text: '攻略'
      },
      {
        pagePath: 'pages/profile/index',
        iconPath: 'assets/images/profile.png',
        selectedIconPath: 'assets/images/profile-active.png',
        text: '我的'
      }
    ]
  }
})