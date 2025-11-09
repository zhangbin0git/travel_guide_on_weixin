/**
 * 小程序配置文件
 */
export default {
  // 小程序页面路径配置
  pages: [
    'pages/index/index',
    'pages/guide-detail/index',
    'pages/search/index',
    'pages/user/index'
  ],
  
  // 全局默认窗口表现
  window: {
    // 导航栏背景颜色
    navigationBarBackgroundColor: '#ffffff',
    // 导航栏标题颜色，仅支持 black/white
    navigationBarTextStyle: 'black',
    // 导航栏标题文字内容
    navigationBarTitleText: '旅行攻略',
    // 导航栏样式，仅支持 default/custom
    navigationStyle: 'default',
    // 窗口的背景色
    backgroundColor: '#f5f5f5',
    // 下拉背景字体、loading图的样式，仅支持 dark/light
    backgroundTextStyle: 'dark',
    // 是否开启下拉刷新
    enablePullDownRefresh: false,
    // 页面上拉触底事件触发时距页面底部距离，单位为px
    onReachBottomDistance: 50
  },
  
  // 全局默认的tabBar配置
  tabBar: {
    // tabBar的颜色
    color: '#999999',
    // tabBar选中时的文字颜色
    selectedColor: '#007aff',
    // tabBar的背景色
    backgroundColor: '#ffffff',
    // tabBar的边框颜色
    borderStyle: 'black',
    // tabBar的列表
    list: [
      {
        // 页面路径
        pagePath: 'pages/index/index',
        // 图片路径
        text: '首页',
        // 图标路径
        iconPath: 'assets/images/tab-home.png',
        // 选中时图标路径
        selectedIconPath: 'assets/images/tab-home-active.png'
      },
      {
        pagePath: 'pages/search/index',
        text: '搜索',
        iconPath: 'assets/images/tab-search.png',
        selectedIconPath: 'assets/images/tab-search-active.png'
      },
      {
        pagePath: 'pages/guides/index',
        text: '攻略',
        iconPath: 'assets/images/tab-guide.png',
        selectedIconPath: 'assets/images/tab-guide-active.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/images/tab-user.png',
        selectedIconPath: 'assets/images/tab-user-active.png'
      }
    ]
  },
  
  // 网络超时时间
  networkTimeout: {
    request: 10000,
    downloadFile: 10000,
    uploadFile: 10000,
    connectSocket: 10000
  },
  
  // 是否开启调试模式
  debug: false,
  
  // 配置自定义组件
  usingComponents: {}
};