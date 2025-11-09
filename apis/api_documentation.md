# 旅行攻略微信小程序 API 接口文档

## 1. 接口概述

本文档定义了旅行攻略微信小程序的后端API接口规范，基于RESTful API设计原则。所有接口均返回JSON格式数据，并遵循统一的响应格式。

## 2. 通用响应格式

### 2.1 成功响应

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 2.2 错误响应

```json
{
  "code": 错误码,
  "message": "错误描述",
  "data": null
}
```

### 2.3 错误码说明

| 错误码 | 描述 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
| 503 | 服务不可用 |

## 3. 攻略生成相关接口

### 3.1 生成旅行攻略

- **接口路径**: `/api/guides/generate`
- **请求方法**: `POST`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| destination | String | 是 | 目的地城市名称 |
| startDate | String | 是 | 开始日期，格式：YYYY-MM-DD |
| endDate | String | 是 | 结束日期，格式：YYYY-MM-DD |
| preferences | Array<String> | 否 | 兴趣偏好，如历史文化、美食、购物等 |
| companions | String | 否 | 同行人员，如情侣、家庭、朋友等 |
| budget | String | 否 | 预算范围，如2000-3000元/人 |

- **请求示例**:

```json
{
  "destination": "北京",
  "startDate": "2023-10-01",
  "endDate": "2023-10-04",
  "preferences": ["历史文化", "美食"],
  "companions": "情侣",
  "budget": "2000-3000元/人"
}
```

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "guideId": "12345678",
    "title": "北京三日游",
    "destination": "北京",
    "startDate": "2023-10-01",
    "endDate": "2023-10-04",
    "totalDays": 3,
    "attractionCount": 8,
    "budget": "约2500元/人",
    "dailyPlans": [
      {
        "day": 1,
        "date": "2023-10-01",
        "weather": {
          "dayweather": "晴",
          "nightweather": "晴",
          "daytemp": "14",
          "nighttemp": "1",
          "daywind": "西",
          "daypower": "1-3"
        },
        "attractions": [
          {
            "id": "B000A8UIN8",
            "name": "故宫博物院",
            "address": "景山前街4号",
            "location": "116.407,39.920",
            "openingTime": "08:30-17:00",
            "visitTime": "10:30 - 14:00",
            "duration": 210,
            "rating": "4.8",
            "description": "中国明清两代的皇家宫殿",
            "photos": ["http://store.is.autonavi.com/showpic/2f968490d105bb2741e17f90b85c6b79"],
            "tips": ["建议提前预约门票", "周一闭馆"]
          }
        ],
        "transportations": [
          {
            "mode": "driving",
            "origin": "116.404,39.915",
            "destination": "116.407,39.920",
            "distance": "764",
            "duration": "389",
            "steps": [
              {
                "instruction": "沿东华门大街向东行驶221米左转",
                "road": "东华门大街",
                "distance": "221",
                "orientation": "东"
              }
            ]
          }
        ]
      }
    ],
    "overallTips": [
      {
        "type": "weather",
        "content": "北京10月昼夜温差较大，建议携带外套"
      },
      {
        "type": "traffic",
        "content": "故宫周边停车不便，建议乘坐公共交通"
      }
    ]
  }
}
```

### 3.2 获取攻略详情

- **接口路径**: `/api/guides/:guideId`
- **请求方法**: `GET`
- **请求参数**:
  - `guideId`: 攻略ID（路径参数）

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "guideId": "12345678",
    "title": "北京三日游",
    "destination": "北京",
    "startDate": "2023-10-01",
    "endDate": "2023-10-04",
    "totalDays": 3,
    "attractionCount": 8,
    "budget": "约2500元/人",
    "dailyPlans": [
      {
        "day": 1,
        "date": "2023-10-01",
        "weather": {
          "dayweather": "晴",
          "nightweather": "晴",
          "daytemp": "14",
          "nighttemp": "1",
          "daywind": "西",
          "daypower": "1-3"
        },
        "attractions": [
          {
            "id": "B000A8UIN8",
            "name": "故宫博物院",
            "address": "景山前街4号",
            "location": "116.407,39.920",
            "openingTime": "08:30-17:00",
            "visitTime": "10:30 - 14:00",
            "duration": 210,
            "rating": "4.8",
            "description": "中国明清两代的皇家宫殿",
            "photos": ["http://store.is.autonavi.com/showpic/2f968490d105bb2741e17f90b85c6b79"],
            "tips": ["建议提前预约门票", "周一闭馆"]
          }
        ],
        "transportations": [
          {
            "mode": "driving",
            "origin": "116.404,39.915",
            "destination": "116.407,39.920",
            "distance": "764",
            "duration": "389",
            "steps": [
              {
                "instruction": "沿东华门大街向东行驶221米左转",
                "road": "东华门大街",
                "distance": "221",
                "orientation": "东"
              }
            ]
          }
        ]
      }
    ],
    "overallTips": [
      {
        "type": "weather",
        "content": "北京10月昼夜温差较大，建议携带外套"
      },
      {
        "type": "traffic",
        "content": "故宫周边停车不便，建议乘坐公共交通"
      }
    ]
  }
}
```

### 3.3 获取攻略生成进度

- **接口路径**: `/api/guides/:guideId/progress`
- **请求方法**: `GET`
- **请求参数**:
  - `guideId`: 攻略ID（路径参数）

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "guideId": "12345678",
    "status": "processing",
    "progress": 50,
    "steps": [
      {
        "id": 1,
        "name": "分析旅行需求",
        "completed": true
      },
      {
        "id": 2,
        "name": "推荐景点和路线",
        "completed": true
      },
      {
        "id": 3,
        "name": "整合天气和交通信息",
        "completed": false
      },
      {
        "id": 4,
        "name": "生成完整攻略",
        "completed": false
      }
    ]
  }
}
```

## 4. 搜索相关接口

### 4.1 搜索热门目的地

- **接口路径**: `/api/destinations/popular`
- **请求方法**: `GET`
- **请求参数**: 无

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "name": "北京",
      "guideCount": 2341
    },
    {
      "name": "上海",
      "guideCount": 1892
    },
    {
      "name": "成都",
      "guideCount": 1567
    },
    {
      "name": "西安",
      "guideCount": 1245
    }
  ]
}
```

### 4.2 搜索景点

- **接口路径**: `/api/attractions/search`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| keyword | String | 是 | 搜索关键词 |
| city | String | 否 | 城市名称 |
| type | String | 否 | 景点类型 |
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认10 |

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "attractions": [
      {
        "id": "B000A8UIN8",
        "name": "故宫博物院",
        "address": "景山前街4号",
        "typecode": "110201|140100",
        "photo": "http://store.is.autonavi.com/showpic/2f968490d105bb2741e17f90b85c6b79"
      }
    ]
  }
}
```

### 4.3 获取景点详情

- **接口路径**: `/api/attractions/:id`
- **请求方法**: `GET`
- **请求参数**:
  - `id`: 景点ID（路径参数）

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "B000A8UIN8",
    "name": "故宫博物院",
    "location": "116.407,39.920",
    "address": "景山前街4号",
    "city": "北京市",
    "type": "风景名胜;文物古迹;博物馆",
    "photo": "http://store.is.autonavi.com/showpic/2f968490d105bb2741e17f90b85c6b79",
    "openTime": "08:30-17:00",
    "ticketInfo": "60元/人",
    "level": "AAAAA",
    "rating": "4.8",
    "description": "中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一。"
  }
}
```

## 5. 地图相关接口

### 5.1 获取路径规划

- **接口路径**: `/api/maps/directions`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| origin | String | 是 | 起点经纬度，格式：经度,纬度 |
| destination | String | 是 | 终点经纬度，格式：经度,纬度 |
| mode | String | 是 | 交通方式：driving(驾车)、walking(步行)、transit(公交)、bicycling(骑行) |

- **响应示例** (以驾车为例):

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "origin": "116.404,39.915",
    "destination": "116.407,39.920",
    "distance": "764",
    "duration": "389",
    "steps": [
      {
        "instruction": "沿东华门大街向东行驶221米左转",
        "road": "东华门大街",
        "distance": "221",
        "orientation": "东",
        "duration": "190"
      }
    ]
  }
}
```

### 5.2 地理编码

- **接口路径**: `/api/maps/geo`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| address | String | 是 | 地址信息 |
| city | String | 否 | 指定城市 |

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "country": "中国",
    "province": "北京市",
    "city": "北京市",
    "district": "东城区",
    "location": "116.416334,39.928359",
    "level": "区县"
  }
}
```

### 5.3 逆地理编码

- **接口路径**: `/api/maps/regeo`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| location | String | 是 | 经纬度，格式：经度,纬度 |

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "country": "中国",
    "province": "北京市",
    "city": "北京市",
    "district": "东城区"
  }
}
```

### 5.4 周边搜索

- **接口路径**: `/api/maps/around`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| keywords | String | 是 | 搜索关键词 |
| location | String | 是 | 中心点经纬度，格式：经度,纬度 |
| radius | Number | 否 | 搜索半径，默认1000米 |

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "pois": [
      {
        "id": "B000A9R476",
        "name": "故宫商店(故宫急救站东北)",
        "address": "东华门大街97号",
        "typecode": "060200",
        "photo": "http://store.is.autonavi.com/showpic/54cc823ca310b3053ef4c7d7"
      }
    ]
  }
}
```

### 5.5 获取天气信息

- **接口路径**: `/api/maps/weather`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| city | String | 是 | 城市名称或adcode |
| days | Number | 否 | 预报天数，默认7天 |

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "city": "北京市",
    "forecasts": [
      {
        "date": "2025-11-09",
        "week": "7",
        "dayweather": "晴",
        "nightweather": "晴",
        "daytemp": "14",
        "nighttemp": "1",
        "daywind": "西",
        "nightwind": "西",
        "daypower": "1-3",
        "nightpower": "1-3"
      }
    ]
  }
}
```

## 6. 用户相关接口

### 6.1 获取用户信息

- **接口路径**: `/api/user/info`
- **请求方法**: `GET`
- **请求参数**: 无（通过token识别用户）

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": "wx123456",
    "nickname": "旅行者",
    "avatar": "https://wx.qlogo.cn/xxx",
    "favoriteCount": 12,
    "historyCount": 23
  }
}
```

### 6.2 获取用户收藏的攻略

- **接口路径**: `/api/user/favorites`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| page | Number | 否 | 页码，默认1 |
| pageSize | Number | 否 | 每页数量，默认10 |

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 12,
    "page": 1,
    "pageSize": 10,
    "favorites": [
      {
        "guideId": "12345678",
        "title": "北京三日游",
        "destination": "北京",
        "startDate": "2023-10-01",
        "endDate": "2023-10-04",
        "favoriteTime": "2023-09-15T10:30:00Z"
      }
    ]
  }
}
```

### 6.3 收藏/取消收藏攻略

- **接口路径**: `/api/user/favorites/:guideId`
- **请求方法**: `POST`
- **请求参数**:
  - `guideId`: 攻略ID（路径参数）

- **请求体**:

```json
{
  "action": "add" // add或remove
}
```

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "guideId": "12345678",
    "action": "add",
    "success": true
  }
}
```

## 7. WebSocket 接口

### 7.1 攻略生成实时更新

- **连接路径**: `/ws/guides/generate`
- **消息格式**:

**客户端发送**:
```json
{
  "type": "start",
  "data": {
    "destination": "北京",
    "startDate": "2023-10-01",
    "endDate": "2023-10-04",
    "preferences": ["历史文化", "美食"]
  }
}
```

**服务端推送**:
```json
{
  "type": "progress",
  "data": {
    "progress": 30,
    "step": "推荐景点和路线",
    "content": "正在为您推荐北京市内热门景点..."
  }
}
```

```json
{
  "type": "update",
  "data": {
    "section": "dailyPlans",
    "content": {
      "day": 1,
      "attractions": [
        {
          "id": "B000A8UIN8",
          "name": "故宫博物院",
          "visitTime": "10:30 - 14:00"
        }
      ]
    }
  }
}
```

```json
{
  "type": "complete",
  "data": {
    "guideId": "12345678",
    "status": "success"
  }
}
```

## 8. 实用工具接口

### 8.1 创建行程地图链接

- **接口路径**: `/api/utils/map-link`
- **请求方法**: `POST`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| title | String | 是 | 行程名称 |
| points | Array<Object> | 是 | 行程点列表 |

- **请求体**:

```json
{
  "title": "北京三日游行程",
  "points": [
    {
      "name": "天安门广场",
      "lon": 116.404,
      "lat": 39.915,
      "poiId": "B000A16967"
    },
    {
      "name": "故宫博物院",
      "lon": 116.407,
      "lat": 39.920,
      "poiId": "B000A8UIN8"
    }
  ]
}
```

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "mapUrl": "amapuri://workInAmap/createWithToken?polymericId=mcp_aa4f238f8ffc4fcbb39d0553eba11187&from=MCP"
  }
}
```

### 8.2 创建导航链接

- **接口路径**: `/api/utils/navi-link`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| lon | Number | 是 | 终点经度 |
| lat | Number | 是 | 终点纬度 |

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "naviUrl": "amapuri://navi?sourceApplication=amap_mcp&lon=116.404&lat=39.915&dev=1&style=2"
  }
}
```

### 8.3 创建打车链接

- **接口路径**: `/api/utils/taxi-link`
- **请求方法**: `GET`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| slon | Number | 是 | 起点经度 |
| slat | Number | 是 | 起点纬度 |
| sname | String | 是 | 起点名称 |
| dlon | Number | 是 | 终点经度 |
| dlat | Number | 是 | 终点纬度 |
| dname | String | 是 | 终点名称 |

- **响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "taxiUrl": "amapuri://drive/takeTaxi?sourceApplication=amapplatform&slat=39.915&slon=116.404&sname=天安门&dlon=116.407&dlat=39.920&dname=故宫"
  }
}
```

## 9. 错误处理

所有API接口均采用统一的错误处理机制，返回标准化的错误响应。常见错误类型包括：

1. **参数错误** (400): 请求参数缺失或格式不正确
2. **认证错误** (401): 用户未登录或认证信息失效
3. **授权错误** (403): 用户无权限访问请求的资源
4. **资源不存在** (404): 请求的资源不存在
5. **服务器错误** (500): 服务器内部错误
6. **服务不可用** (503): 服务暂时不可用

## 10. API版本控制

API版本通过URL路径中的v1标识，例如：`/api/v1/guides/generate`。当API接口有重大变更时，将在URL中升级版本号，以保证向后兼容性。

## 11. 安全规范

1. 所有API接口均支持HTTPS加密传输
2. 用户认证基于微信小程序的用户信息授权机制
3. 敏感操作需要进行身份验证
4. API接口调用频率限制，防止恶意请求
5. 输入内容进行安全过滤，防止注入攻击
