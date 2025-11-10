# 旅行攻略微信小程序 API 接口文档

## 1. 概述

本文档定义了旅行攻略微信小程序的API接口规范，基于REST API设计原则，整合高德地图MCP Server提供的地图服务能力。所有接口均返回JSON格式数据，遵循统一的响应结构。

### 1.1 基础信息

- **基础URL**: `https://api.travel-guide.com/v1`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

### 1.2 通用响应格式

所有API响应均遵循以下格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": "2023-10-01T12:00:00Z"
}
```

**字段说明**:
- `code`: 状态码，200表示成功，其他值表示错误
- `message`: 响应消息，成功时为"success"，失败时为错误描述
- `data`: 响应数据，具体结构根据接口而定
- `timestamp`: 响应时间戳，ISO 8601格式

### 1.3 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权，需要登录 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |
| 503 | 服务不可用 |

## 2. 认证接口

### 2.1 微信登录

**接口**: `POST /auth/wechat-login`

**描述**: 通过微信授权登录，获取访问令牌

**请求参数**:
```json
{
  "code": "string",        // 微信授权码
  "userInfo": {            // 用户信息（可选）
    "nickName": "string",
    "avatarUrl": "string",
    "gender": 1,
    "language": "string",
    "city": "string",
    "province": "string",
    "country": "string"
  }
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "accessToken": "string",    // 访问令牌
    "refreshToken": "string",   // 刷新令牌
    "expiresIn": 7200,          // 令牌过期时间（秒）
    "userInfo": {               // 用户信息
      "id": "string",
      "openId": "string",
      "nickName": "string",
      "avatarUrl": "string",
      "gender": 1,
      "language": "string",
      "city": "string",
      "province": "string",
      "country": "string",
      "createTime": "2023-10-01T12:00:00Z"
    }
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 2.2 刷新令牌

**接口**: `POST /auth/refresh-token`

**描述**: 使用刷新令牌获取新的访问令牌

**请求参数**:
```json
{
  "refreshToken": "string"
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": 7200
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

## 3. 旅行攻略接口

### 3.1 解析旅行需求

**接口**: `POST /travel/parse-requirements`

**描述**: 解析用户输入的旅行需求，提取关键信息

**请求参数**:
```json
{
  "input": "string"          // 用户输入的旅行需求，如"北京三日游，喜欢历史文化景点"
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "destination": {          // 目的地信息
      "name": "北京",
      "citycode": "010",
      "adcode": "110000",
      "location": "116.405285,39.904989"
    },
    "duration": {             // 旅行时长
      "days": 3,
      "startDate": "2023-10-01",
      "endDate": "2023-10-03"
    },
    "preferences": [          // 兴趣偏好
      "历史文化",
      "美食",
      "购物"
    ],
    "companions": {           // 同行人员
      "type": "朋友",
      "count": 2,
      "ageGroup": "青年"
    },
    "budget": {               // 预算
      "min": 1000,
      "max": 3000,
      "currency": "CNY"
    }
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 3.2 生成旅行攻略

**接口**: `POST /travel/generate-guide`

**描述**: 根据解析后的旅行需求生成完整的旅行攻略

**请求参数**:
```json
{
  "destination": {
    "name": "北京",
    "citycode": "010",
    "adcode": "110000",
    "location": "116.405285,39.904989"
  },
  "duration": {
    "days": 3,
    "startDate": "2023-10-01",
    "endDate": "2023-10-03"
  },
  "preferences": [
    "历史文化",
    "美食",
    "购物"
  ],
  "companions": {
    "type": "朋友",
    "count": 2,
    "ageGroup": "青年"
  },
  "budget": {
    "min": 1000,
    "max": 3000,
    "currency": "CNY"
  }
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",              // 攻略ID
    "title": "北京三日游历史文化之旅",
    "destination": "北京",
    "duration": {
      "days": 3,
      "startDate": "2023-10-01",
      "endDate": "2023-10-03"
    },
    "overview": {
      "totalAttractions": 8,
      "estimatedCost": 2500,
      "currency": "CNY"
    },
    "dailyItineraries": [        // 每日行程
      {
        "day": 1,
        "date": "2023-10-01",
        "theme": "历史文化探索",
        "attractions": [
          {
            "id": "B000A8UIN8",   // 景点ID，对应高德地图POI ID
            "name": "故宫博物院",
            "location": "116.397128,39.917544",
            "address": "景山前街4号",
            "type": "风景名胜;博物馆",
            "rating": "4.8",
            "level": "AAAAA",
            "photo": "http://store.is.autonavi.com/showpic/2f968490d105bb2741e17f90b85c6b79",
            "openTime": "08:30-17:00",
            "ticketPrice": "60元/人（旺季），40元/人（淡季）",
            "recommendedDuration": "3.5小时",
            "description": "故宫博物院是中国最大的古代文化艺术博物馆，也是世界上现存规模最大、保存最为完整的木质结构古建筑之一。",
            "visitTime": {
              "start": "08:30",
              "end": "12:00"
            },
            "transportation": {
              "fromPrevious": {
                "type": "walking",
                "distance": 500,
                "duration": 600,
                "description": "从天安门广场步行至故宫博物院"
              }
            },
            "tips": [
              "需提前在线预约",
              "周一闭馆（法定节假日除外）",
              "建议携带身份证"
            ]
          }
          // 更多景点...
        ],
        "dailyTips": {
          "weather": {
            "condition": "晴",
            "temperature": "15-25℃",
            "suggestion": "建议穿薄外套，注意防晒"
          },
          "transportation": "天安门周边停车位紧张，建议乘坐地铁1号线在天安门东站下车",
          "dining": {
            "recommendation": "王府井小吃街",
            "description": "汇集了北京各种传统小吃"
          }
        }
      }
      // 更多天数行程...
    ],
    "mapData": {                 // 地图数据，用于在高德地图中展示
      "center": "116.405285,39.904989",
      "zoom": 11,
      "markers": [
        {
          "id": "B000A8UIN8",
          "name": "故宫博物院",
          "location": "116.397128,39.917544",
          "day": 1,
          "order": 2
        }
        // 更多标记点...
      ],
      "polylines": [
        {
          "day": 1,
          "points": [
            "116.397428,39.908738",
            "116.397128,39.917544"
          ]
        }
        // 更多路线...
      ]
    },
    "generalTips": [             // 通用旅行提示
      {
        "type": "weather",
        "title": "天气提醒",
        "content": "北京10月天气宜人，但早晚温差较大，建议携带薄外套",
        "icon": "cloud"
      },
      {
        "type": "transportation",
        "title": "交通建议",
        "content": "北京市区交通拥堵，建议优先选择地铁出行",
        "icon": "subway"
      },
      {
        "type": "culture",
        "title": "文化提示",
        "content": "参观历史文化景点时请保持安静，尊重当地文化习俗",
        "icon": "info-circle"
      }
    ],
    "createdAt": "2023-10-01T12:00:00Z"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 3.3 获取攻略详情

**接口**: `GET /travel/guide/{id}`

**描述**: 根据攻略ID获取攻略详情

**路径参数**:
- `id`: 攻略ID

**响应数据**: 与生成攻略接口响应数据中的`data`字段相同

### 3.4 获取用户攻略列表

**接口**: `GET /travel/guides`

**描述**: 获取当前用户的攻略列表

**查询参数**:
- `page`: 页码，默认为1
- `size`: 每页数量，默认为10，最大为50
- `status`: 攻略状态，可选值：all（全部）、draft（草稿）、published（已发布），默认为all

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 15,
    "page": 1,
    "size": 10,
    "pages": 2,
    "list": [
      {
        "id": "string",
        "title": "北京三日游历史文化之旅",
        "destination": "北京",
        "duration": {
          "days": 3,
          "startDate": "2023-10-01",
          "endDate": "2023-10-03"
        },
        "coverImage": "http://example.com/cover.jpg",
        "status": "published",
        "viewCount": 128,
        "likeCount": 36,
        "createdAt": "2023-10-01T12:00:00Z",
        "updatedAt": "2023-10-01T15:30:00Z"
      }
      // 更多攻略...
    ]
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 3.5 收藏攻略

**接口**: `POST /travel/guide/{id}/favorite`

**描述**: 收藏或取消收藏攻略

**路径参数**:
- `id`: 攻略ID

**请求参数**:
```json
{
  "action": "add"              // 操作类型：add（收藏）或remove（取消收藏）
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "isFavorited": true,
    "favoriteCount": 37
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 3.6 获取收藏攻略列表

**接口**: `GET /travel/favorites`

**描述**: 获取当前用户收藏的攻略列表

**查询参数**:
- `page`: 页码，默认为1
- `size`: 每页数量，默认为10，最大为50

**响应数据**: 与获取用户攻略列表接口响应数据结构相同

## 4. 地图服务接口

### 4.1 地理编码

**接口**: `GET /map/geo`

**描述**: 将地址转换为经纬度坐标

**查询参数**:
- `address`: 待解析的结构化地址信息
- `city`: 指定查询的城市（可选）

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "country": "中国",
    "province": "北京市",
    "city": "北京市",
    "citycode": "010",
    "district": "东城区",
    "adcode": "110101",
    "location": "116.416334,39.928359",
    "level": "区县"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.2 逆地理编码

**接口**: `GET /map/regeocode`

**描述**: 将经纬度坐标转换为地址信息

**查询参数**:
- `location`: 经纬度，格式为：经度,纬度

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "country": "中国",
    "province": "北京市",
    "city": "北京市",
    "district": "东城区",
    "township": "东华门街道",
    "address": "东华门大街97号"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.3 POI搜索

**接口**: `GET /map/search/poi`

**描述**: 根据关键词搜索POI（兴趣点）

**查询参数**:
- `keywords`: 查询关键字
- `city`: 查询城市（可选）
- `citylimit`: 是否限制城市范围内搜索，默认为false
- `page`: 页码，默认为1
- `size`: 每页数量，默认为20，最大为50

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 156,
    "page": 1,
    "size": 20,
    "pages": 8,
    "pois": [
      {
        "id": "B000A8UIN8",
        "name": "故宫博物院",
        "address": "景山前街4号",
        "location": "116.397128,39.917544",
        "typecode": "110201|140100",
        "photo": "http://store.is.autonavi.com/showpic/2f968490d105bb2741e17f90b85c6b79",
        "distance": 500,        // 与搜索中心的距离（米），如果提供了location参数
        "rating": "4.8"
      }
      // 更多POI...
    ]
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.4 周边搜索

**接口**: `GET /map/search/around`

**描述**: 搜索指定位置周边的POI

**查询参数**:
- `keywords`: 搜索关键词
- `location`: 中心点经纬度，格式为：经度,纬度
- `radius`: 搜索半径（米），默认为1000，最大为50000
- `page`: 页码，默认为1
- `size`: 每页数量，默认为20，最大为50

**响应数据**: 与POI搜索接口响应数据结构相同

### 4.5 POI详情

**接口**: `GET /map/poi/{id}`

**描述**: 根据POI ID获取详细信息

**路径参数**:
- `id`: POI的唯一标识

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "B015F02AH1",
    "name": "晋祠景区",
    "location": "112.450794,37.704552",
    "address": "古唐路",
    "businessArea": "",
    "city": "太原市",
    "type": "风景名胜;公园广场;公园",
    "alias": "晋祠胜境",
    "photo": "http://store.is.autonavi.com/showpic/0c64b753ffcf75bf91dbcce5d0a50950",
    "cost": "",
    "opentime2": "11-01至03-31 周一至周日 08:30-17:30；04-01至10-31 周一至周日 08:30-18:00",
    "level": "AAAA",
    "rating": "4.8",
    "openTime": "08:30-17:30 08:30-18:00",
    "ticketOrdering": "0",
    "description": "晋祠是中国现存最早的古典宗祠园林，位于山西省太原市晋源区晋祠镇，原为晋王祠（唐叔虞祠），是为纪念晋国开国诸侯唐叔虞而建。"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.6 路径规划

**接口**: `GET /map/direction/{type}`

**描述**: 根据起点和终点计算路径规划

**路径参数**:
- `type`: 路径规划类型，可选值：walking（步行）、driving（驾车）、bicycling（骑行）、transit（公共交通）

**查询参数**:
- `origin`: 出发点经纬度，格式为：经度,纬度
- `destination`: 目的地经纬度，格式为：经度,纬度
- `city`: 城市名称（公共交通规划时必需）
- `cityd`: 目的地城市名称（公共交通规划时，跨城场景必需）

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "origin": "116.404,39.915",
    "destination": "116.407,39.920",
    "paths": [
      {
        "distance": 778,        // 总距离（米）
        "duration": 622,        // 总耗时（秒）
        "steps": [
          {
            "instruction": "沿东华门大街向东步行266米左转",
            "road": "东华门大街",
            "distance": 266,
            "orientation": "东",
            "duration": 213
          },
          {
            "instruction": "沿东黄城根南街步行512米到达目的地",
            "road": "东黄城根南街",
            "distance": 512,
            "orientation": "",
            "duration": 410
          }
        ]
      }
    ]
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.7 距离计算

**接口**: `GET /map/distance`

**描述**: 计算两点之间的距离

**查询参数**:
- `origins`: 起点经度,纬度，可以传多个坐标，使用竖线隔离，比如120,30|120,31
- `destination`: 终点经度,纬度
- `type`: 距离测量类型，1代表驾车距离测量，0代表直线距离测量，3代表步行距离测量

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "results": [
      {
        "originId": "1",
        "destId": "1",
        "distance": "612",
        "duration": "0"
      }
    ]
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.8 天气查询

**接口**: `GET /map/weather`

**描述**: 获取指定城市的天气信息

**查询参数**:
- `city`: 城市名称或者adcode

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "city": "北京市",
    "forecasts": [
      {
        "date": "2023-10-01",
        "week": "7",
        "dayweather": "晴",
        "nightweather": "晴",
        "daytemp": "14",
        "nighttemp": "1",
        "daywind": "西",
        "nightwind": "西",
        "daypower": "1-3",
        "nightpower": "1-3",
        "daytempFloat": "14.0",
        "nighttempFloat": "1.0"
      }
      // 更多天气预报...
    ]
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.9 生成地图链接

**接口**: `POST /map/schema/personal-map`

**描述**: 生成高德地图个人地图链接，用于展示行程规划

**请求参数**:
```json
{
  "orgName": "旅行攻略小程序",
  "lineList": [
    {
      "title": "第一天行程",
      "pointInfoList": [
        {
          "name": "天安门广场",
          "lon": 116.397428,
          "lat": 39.908738,
          "poiId": "B000A7BD6C"
        },
        {
          "name": "故宫博物院",
          "lon": 116.397128,
          "lat": 39.917544,
          "poiId": "B000A8UIN8"
        }
      ]
    }
    // 更多行程...
  ]
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "mapUrl": "amapuri://workInAmap/createWithToken?polymericId=mcp_aa4f238f8ffc4fcbb39d0553eba11187&from=MCP"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.10 生成导航链接

**接口**: `POST /map/schema/navigation`

**描述**: 生成高德地图导航链接

**请求参数**:
```json
{
  "lon": 116.397128,
  "lat": 39.917544
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "naviUrl": "amapuri://navi?sourceApplication=amap_mcp&lon=116.397128&lat=39.917544&dev=1&style=2"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### 4.11 生成打车链接

**接口**: `POST /map/schema/taxi`

**描述**: 生成高德地图打车链接

**请求参数**:
```json
{
  "slon": 116.397428,     // 起点经度
  "slat": 39.908738,      // 起点纬度
  "sname": "天安门广场",  // 起点名称
  "dlon": 116.397128,     // 终点经度
  "dlat": 39.917544,      // 终点纬度
  "dname": "故宫博物院"   // 终点名称
}
```

**响应数据**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "taxiUrl": "amapuri://drive/takeTaxi?sourceApplication=amapplatform&slat=39.908738&slon=116.397428&sname=%E5%A4%A9%E5%AE%89%E9%97%A8&dlon=116.397128&dlat=39.917544&dname=%E6%95%85%E5%AE%AB"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

## 5. WebSocket接口

### 5.1 攻略生成进度推送

**连接地址**: `wss://api.travel-guide.com/ws/progress`

**描述**: 建立WebSocket连接，接收攻略生成进度推送

**认证**: 在连接URL中添加access_token参数，如：`wss://api.travel-guide.com/ws/progress?access_token=xxx`

**消息格式**:
```json
{
  "type": "progress",
  "data": {
    "guideId": "string",      // 攻略ID
    "stage": "analyzing",     // 当前阶段：analyzing（分析需求）、searching（搜索景点）、planning（规划路线）、generating（生成攻略）
    "progress": 25,           // 进度百分比（0-100）
    "message": "正在分析您的旅行需求..."  // 进度描述
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

**完成消息**:
```json
{
  "type": "complete",
  "data": {
    "guideId": "string",
    "message": "攻略生成完成！"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

**错误消息**:
```json
{
  "type": "error",
  "data": {
    "code": 500,
    "message": "生成攻略时发生错误，请稍后重试"
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

## 6. 数据模型

### 6.1 攻略数据模型

```json
{
  "id": "string",              // 攻略ID
  "title": "string",           // 攻略标题
  "destination": "string",     // 目的地
  "duration": {                // 旅行时长
    "days": 3,
    "startDate": "2023-10-01",
    "endDate": "2023-10-03"
  },
  "overview": {                // 攻略概览
    "totalAttractions": 8,
    "estimatedCost": 2500,
    "currency": "CNY"
  },
  "dailyItineraries": [        // 每日行程
    {
      "day": 1,
      "date": "2023-10-01",
      "theme": "string",
      "attractions": [
        {
          "id": "string",      // 景点ID，对应高德地图POI ID
          "name": "string",
          "location": "string", // 经纬度，格式为：经度,纬度
          "address": "string",
          "type": "string",
          "rating": "string",
          "level": "string",
          "photo": "string",
          "openTime": "string",
          "ticketPrice": "string",
          "recommendedDuration": "string",
          "description": "string",
          "visitTime": {
            "start": "string",
            "end": "string"
          },
          "transportation": {
            "fromPrevious": {
              "type": "string", // walking, driving, transit, bicycling
              "distance": 500,
              "duration": 600,
              "description": "string"
            }
          },
          "tips": ["string"]
        }
      ],
      "dailyTips": {
        "weather": {
          "condition": "string",
          "temperature": "string",
          "suggestion": "string"
        },
        "transportation": "string",
        "dining": {
          "recommendation": "string",
          "description": "string"
        }
      }
    }
  ],
  "mapData": {                 // 地图数据
    "center": "string",
    "zoom": 11,
    "markers": [
      {
        "id": "string",
        "name": "string",
        "location": "string",
        "day": 1,
        "order": 2
      }
    ],
    "polylines": [
      {
        "day": 1,
        "points": ["string"]
      }
    ]
  },
  "generalTips": [             // 通用旅行提示
    {
      "type": "string",
      "title": "string",
      "content": "string",
      "icon": "string"
    }
  ],
  "status": "string",          // 攻略状态：draft, published
  "isPublic": false,           // 是否公开
  "viewCount": 0,              // 浏览次数
  "likeCount": 0,              // 点赞次数
  "createdAt": "string",       // 创建时间
  "updatedAt": "string"        // 更新时间
}
```

### 6.2 用户数据模型

```json
{
  "id": "string",              // 用户ID
  "openId": "string",          // 微信OpenID
  "unionId": "string",         // 微信UnionID（可选）
  "nickName": "string",        // 昵称
  "avatarUrl": "string",       // 头像URL
  "gender": 1,                 // 性别：0-未知，1-男，2-女
  "language": "string",        // 语言
  "city": "string",            // 城市
  "province": "string",        // 省份
  "country": "string",         // 国家
  "createTime": "string",      // 注册时间
  "lastLoginTime": "string"    // 最后登录时间
}
```

## 7. 接口调用示例

### 7.1 完整攻略生成流程

1. **用户登录**
```http
POST /auth/wechat-login
Content-Type: application/json

{
  "code": "wx_auth_code",
  "userInfo": {
    "nickName": "旅行者",
    "avatarUrl": "https://example.com/avatar.jpg"
  }
}
```

2. **解析旅行需求**
```http
POST /travel/parse-requirements
Authorization: Bearer access_token
Content-Type: application/json

{
  "input": "北京三日游，喜欢历史文化景点，预算2000元左右"
}
```

3. **建立WebSocket连接接收进度**
```javascript
const ws = new WebSocket('wss://api.travel-guide.com/ws/progress?access_token=xxx');

ws.onmessage = function(event) {
  const data = JSON.parse(event.data);
  if (data.type === 'progress') {
    console.log(`攻略生成进度: ${data.data.progress}%`);
    console.log(`当前阶段: ${data.data.message}`);
  } else if (data.type === 'complete') {
    console.log('攻略生成完成!');
    // 跳转到攻略详情页
  }
};
```

4. **生成旅行攻略**
```http
POST /travel/generate-guide
Authorization: Bearer access_token
Content-Type: application/json

{
  "destination": {
    "name": "北京",
    "citycode": "010",
    "adcode": "110000",
    "location": "116.405285,39.904989"
  },
  "duration": {
    "days": 3,
    "startDate": "2023-10-01",
    "endDate": "2023-10-03"
  },
  "preferences": [
    "历史文化"
  ],
  "companions": {
    "type": "朋友",
    "count": 2,
    "ageGroup": "青年"
  },
  "budget": {
    "min": 1500,
    "max": 2500,
    "currency": "CNY"
  }
}
```

5. **获取攻略详情**
```http
GET /travel/guide/guide_id
Authorization: Bearer access_token
```

6. **生成地图链接**
```http
POST /map/schema/personal-map
Authorization: Bearer access_token
Content-Type: application/json

{
  "orgName": "旅行攻略小程序",
  "lineList": [
    {
      "title": "第一天行程",
      "pointInfoList": [
        {
          "name": "天安门广场",
          "lon": 116.397428,
          "lat": 39.908738,
          "poiId": "B000A7BD6C"
        },
        {
          "name": "故宫博物院",
          "lon": 116.397128,
          "lat": 39.917544,
          "poiId": "B000A8UIN8"
        }
      ]
    }
  ]
}
```

## 8. 注意事项

1. 所有需要认证的接口必须在请求头中添加`Authorization: Bearer access_token`
2. 所有时间格式均使用ISO 8601标准，如：`2023-10-01T12:00:00Z`
3. 经纬度坐标格式为：`经度,纬度`，如：`116.397128,39.917544`
4. 分页查询的页码从1开始
5. 所有接口均支持CORS，可在微信小程序中直接调用
6. 高德地图MCP Server的数据结构限制：所有地图相关接口返回的数据均需符合高德地图MCP Server定义的数据结构
7. 攻略生成是异步操作，需要通过WebSocket接收进度推送
8. 地图链接生成后，需要在微信小程序中调用`wx.openLocation`或`wx.navigateToMiniProgram`打开高德地图小程序