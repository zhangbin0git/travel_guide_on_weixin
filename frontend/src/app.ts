/**
 * 小程序入口文件
 */
import wepy from '@wepy/core';
import './app.scss';

// 引入全局样式
import './assets/styles/index.scss';

// 注册全局组件
wepy.component({
  // 全局数据
  globalData: {
    userInfo: null,
    systemInfo: null,
    networkType: 'unknown',
    location: null
  },
  
  // 小程序生命周期
  onLoad() {
    console.log('小程序启动');
    this.initApp();
  },
  
  onShow() {
    console.log('小程序显示');
  },
  
  onHide() {
    console.log('小程序隐藏');
  },
  
  onError(error) {
    console.error('小程序错误:', error);
  },
  
  // 页面不存在
  onPageNotFound(res) {
    console.error('页面不存在:', res);
    wx.redirectTo({
      url: '/pages/index/index'
    });
  },
  
  // 方法
  methods: {
    /**
     * 初始化应用
     */
    initApp() {
      this.getSystemInfo();
      this.getNetworkType();
      this.checkUpdate();
    },
    
    /**
     * 获取系统信息
     */
    getSystemInfo() {
      try {
        const systemInfo = wx.getSystemInfoSync();
        this.globalData.systemInfo = systemInfo;
        console.log('系统信息:', systemInfo);
      } catch (error) {
        console.error('获取系统信息失败:', error);
      }
    },
    
    /**
     * 获取网络类型
     */
    getNetworkType() {
      wx.getNetworkType({
        success: (res) => {
          this.globalData.networkType = res.networkType;
          console.log('网络类型:', res.networkType);
        },
        fail: (error) => {
          console.error('获取网络类型失败:', error);
        }
      });
    },
    
    /**
     * 检查更新
     */
    checkUpdate() {
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        
        updateManager.onCheckForUpdate((res) => {
          console.log('是否有新版本:', res.hasUpdate);
        });
        
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: (res) => {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        
        updateManager.onUpdateFailed(() => {
          wx.showModal({
            title: '更新失败',
            content: '新版本下载失败，请检查网络后重试',
            showCancel: false
          });
        });
      }
    },
    
    /**
     * 获取用户信息
     */
    getUserInfo() {
      return this.globalData.userInfo;
    },
    
    /**
     * 设置用户信息
     */
    setUserInfo(userInfo) {
      this.globalData.userInfo = userInfo;
    },
    
    /**
     * 获取系统信息
     */
    getSystemInfoData() {
      return this.globalData.systemInfo;
    },
    
    /**
     * 获取网络类型
     */
    getNetworkTypeData() {
      return this.globalData.networkType;
    },
    
    /**
     * 获取位置信息
     */
    getLocation() {
      return this.globalData.location;
    },
    
    /**
     * 设置位置信息
     */
    setLocation(location) {
      this.globalData.location = location;
    }
  }
});

// 创建App实例
wepy.app({
  // 使用TypeScript
  use: ['typescript']
});