// 微信小程序API类型定义
declare namespace wx {
  // 基础API类型定义
  interface BaseOptions<T = any> {
    success?: (res: T) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  // 网络请求
  interface RequestOption extends BaseOptions<RequestSuccessCallbackResult> {
    url: string;
    data?: string | object | ArrayBuffer;
    header?: object;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS';
    dataType?: 'json' | '其他';
    responseType?: 'text' | 'arraybuffer';
  }

  interface RequestSuccessCallbackResult {
    data: string | object | ArrayBuffer;
    statusCode: number;
    header: object;
  }

  // 存储相关
  interface StorageOption extends BaseOptions {
    key: string;
  }

  interface GetStorageOption extends StorageOption {
    success?: (res: { data: any }) => void;
  }

  interface SetStorageOption extends StorageOption {
    data: any;
  }

  // 导航相关
  interface NavigateToOption extends BaseOptions {
    url: string;
    events?: any;
  }

  // 界面交互
  interface ToastOption extends BaseOptions {
    title: string;
    icon?: 'success' | 'error' | 'loading' | 'none';
    duration?: number;
    mask?: boolean;
  }

  // 位置相关
  interface LocationOption extends BaseOptions<LocationSuccessCallbackResult> {
    type?: 'wgs84' | 'gcj02';
    altitude?: boolean;
  }

  interface LocationSuccessCallbackResult {
    latitude: number;
    longitude: number;
    speed: number;
    accuracy: number;
    altitude: number;
    verticalAccuracy: number;
    horizontalAccuracy: number;
  }
}

// WePY类型定义
declare module '@wepy/core' {
  export default class WePY {
    static use: (plugin: any) => void;
    static mixin: (mixin: any) => void;
    static component: (component: any) => void;
  }
}

declare module '*.wpy' {
  import { Component } from '@wepy/core';
  const component: Component;
  export default component;
}

declare module '*.scss' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}