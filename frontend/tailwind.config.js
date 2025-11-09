module.exports = {
  content: [
    './src/**/*.{wxml,wxss,js,ts,vue}',
    './src/pages/**/*.{wxml,wxss,js,ts,vue}',
    './src/components/**/*.{wxml,wxss,js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007aff',
          light: '#4da6ff',
          dark: '#0056cc'
        },
        secondary: {
          DEFAULT: '#8e8e93',
          light: '#aeaeb2',
          dark: '#636366'
        },
        accent: {
          DEFAULT: '#ff9500',
          light: '#ffb143',
          dark: '#cc7700'
        },
        success: {
          DEFAULT: '#4cd964',
          light: '#7ee68f',
          dark: '#3dad4f'
        },
        warning: {
          DEFAULT: '#f0ad4e',
          light: '#f4c27a',
          dark: '#c08a3e'
        },
        danger: {
          DEFAULT: '#dd524d',
          light: '#e57f7b',
          dark: '#b1423e'
        },
        info: {
          DEFAULT: '#5ac8fa',
          light: '#8cd9fc',
          dark: '#48a0c8'
        }
      },
      spacing: {
        'xs': '8rpx',
        'sm': '16rpx',
        'md': '24rpx',
        'lg': '32rpx',
        'xl': '48rpx',
        '2xl': '64rpx',
        '3xl': '96rpx',
        '4xl': '128rpx'
      },
      borderRadius: {
        'xs': '6rpx',
        'sm': '8rpx',
        'md': '12rpx',
        'lg': '16rpx',
        'xl': '24rpx',
        '2xl': '32rpx',
        'full': '50%'
      },
      fontSize: {
        'xs': ['20rpx', { lineHeight: '28rpx' }],
        'sm': ['24rpx', { lineHeight: '32rpx' }],
        'base': ['28rpx', { lineHeight: '40rpx' }],
        'lg': ['32rpx', { lineHeight: '44rpx' }],
        'xl': ['36rpx', { lineHeight: '48rpx' }],
        '2xl': ['40rpx', { lineHeight: '56rpx' }],
        '3xl': ['48rpx', { lineHeight: '64rpx' }],
        '4xl': ['56rpx', { lineHeight: '72rpx' }],
        '5xl': ['64rpx', { lineHeight: '80rpx' }]
      },
      boxShadow: {
        'sm': '0 1rpx 4rpx rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 2rpx 8rpx rgba(0, 0, 0, 0.1)',
        'md': '0 4rpx 12rpx rgba(0, 0, 0, 0.15)',
        'lg': '0 8rpx 24rpx rgba(0, 0, 0, 0.15)',
        'xl': '0 12rpx 32rpx rgba(0, 0, 0, 0.2)',
        'inner': 'inset 0 2rpx 8rpx rgba(0, 0, 0, 0.1)'
      },
      zIndex: {
        'base': '1',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false // 禁用 Tailwind 的基础样式重置，避免与小程序样式冲突
  }
}