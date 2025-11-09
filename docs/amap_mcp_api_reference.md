# 高德地图 MCP API 数据结构参考

本文档记录了通过高德地图 MCP 服务器工具调用获取的数据结构，用于旅行攻略小程序开发参考。

## 1. 步行路径规划 (maps_direction_walking)

**请求参数：**
- `origin`: 出发点经纬度，格式为：经度,纬度
- `destination`: 目的地经纬度，格式为：经度,纬度

**响应数据结构：**
```json
{
  "route": {
    "origin": "116.404,39.915",
    "destination": "116.407,39.920",
    "paths": [
      {
        "distance": 778,
        "duration": 622,
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
  }
}
```

**数据说明：**
- `route`: 路线规划结果
  - `origin`: 起点坐标
  - `destination`: 终点坐标
  - `paths`: 规划路径数组
    - `distance`: 总距离(米)
    - `duration`: 总耗时(秒)
    - `steps`: 步骤详情数组
      - `instruction`: 步行指示
      - `road`: 道路名称
      - `distance`: 该段距离(米)
      - `orientation`: 方向
      - `duration`: 该段耗时(秒)

## 2. 驾车路径规划 (maps_direction_driving)

**请求参数：**
- `origin`: 出发点经纬度，格式为：经度,纬度
- `destination`: 目的地经纬度，格式为：经度,纬度

**响应数据结构：**
```json
{
  "origin": "116.404,39.915",
  "destination": "116.407,39.920",
  "paths": [
    {
      "path": "",
      "distance": "764",
      "duration": "389",
      "steps": [
        {
          "instruction": "沿东华门大街向东行驶221米左转",
          "road": "东华门大街",
          "distance": "221",
          "orientation": "东",
          "duration": "190"
        },
        {
          "instruction": "沿北河沿大街向北行驶505米右转",
          "road": "北河沿大街",
          "distance": "505",
          "orientation": "北",
          "duration": "166"
        },
        {
          "instruction": "沿骑河楼街向东行驶35米左转",
          "road": "骑河楼街",
          "distance": "35",
          "orientation": "东",
          "duration": "32"
        },
        {
          "instruction": "沿东黄城根南街向北行驶3米到达目的地",
          "road": "东黄城根南街",
          "distance": "3",
          "orientation": "北",
          "duration": "1"
        }
      ]
    }
  ]
}
```

**数据说明：**
- `origin`: 起点坐标
- `destination`: 终点坐标
- `paths`: 规划路径数组
  - `path`: 路径点字符串（此处为空）
  - `distance`: 总距离(米)，注意这里是字符串类型
  - `duration`: 总耗时(秒)，注意这里是字符串类型
  - `steps`: 步骤详情数组
    - `instruction`: 驾车指示
    - `road`: 道路名称
    - `distance`: 该段距离(米)，字符串类型
    - `orientation`: 方向
    - `duration`: 该段耗时(秒)，字符串类型

## 3. 骑行路径规划 (maps_direction_bicycling)

**请求参数：**
- `origin`: 出发点经纬度，格式为：经度,纬度
- `destination`: 目的地经纬度，格式为：经度,纬度

**响应数据结构：**
```json
{
  "origin": "116.404,39.915",
  "destination": "116.404,39.915",
  "paths": [
    {
      "distance": 778,
      "duration": 187,
      "steps": [
        {
          "instruction": "沿东华门大街向东骑行266米左转",
          "road": "东华门大街",
          "distance": 266,
          "orientation": "东",
          "duration": 64
        },
        {
          "instruction": "沿东黄城根南街骑行512米到达目的地",
          "road": "东黄城根南街",
          "distance": 512,
          "orientation": "",
          "duration": 123
        }
      ]
    }
  ]
}
```

**数据说明：**
- `origin`: 起点坐标
- `destination`: 终点坐标
- `paths`: 规划路径数组
  - `distance`: 总距离(米)
  - `duration`: 总耗时(秒)
  - `steps`: 步骤详情数组
    - `instruction`: 骑行指示
    - `road`: 道路名称
    - `distance`: 该段距离(米)
    - `orientation`: 方向
    - `duration`: 该段耗时(秒)

## 4. 地理编码 (maps_geo)

**请求参数：**
- `address`: 待解析的结构化地址信息
- `city`: 指定查询的城市

**响应数据结构：**
```json
{
  "results": [
    {
      "country": "中国",
      "province": "北京市",
      "city": "北京市",
      "citycode": "010",
      "district": "东城区",
      "street": [],
      "number": [],
      "adcode": "110101",
      "location": "116.416334,39.928359",
      "level": "区县"
    }
  ]
}
```

**数据说明：**
- `results`: 结果数组
  - `country`: 国家
  - `province`: 省份
  - `city`: 城市
  - `citycode`: 城市代码
  - `district`: 区县
  - `street`: 街道数组
  - `number`: 门牌号数组
  - `adcode`: 区域编码
  - `location`: 经纬度坐标，格式为：经度,纬度
  - `level`: 匹配级别

## 5. 逆地理编码 (maps_regeocode)

**请求参数：**
- `location`: 经纬度，格式为：经度,纬度

**响应数据结构：**
```json
{
  "country": "中国",
  "province": "北京市",
  "city": [],
  "district": "东城区"
}
```

**数据说明：**
- `country`: 国家
- `province`: 省份
- `city`: 城市数组
- `district`: 区县

## 6. 周边搜索 (maps_around_search)

**请求参数：**
- `keywords`: 搜索关键词
- `location`: 中心点经度纬度
- `radius`: 搜索半径

**响应数据结构：**
```json
{
  "pois": [
    {
      "id": "B000A9R476",
      "name": "故宫商店(故宫急救站东北)",
      "address": "东华门大街97号",
      "typecode": "060200",
      "photo": "http://store.is.autonavi.com/showpic/54cc823ca310b3053ef4c7d7"
    },
    {
      "id": "B0FFMC1096",
      "name": "普度寺大殿",
      "address": "普渡寺东巷与磁器库北巷交叉口西60米",
      "typecode": "110205",
      "photo": "http://store.is.autonavi.com/showpic/754fc76820e6ff9b3903ffa10ef9fce0"
    },
    // 更多POI数据...
  ]
}
```

**数据说明：**
- `pois`: POI（兴趣点）数组
  - `id`: POI的唯一标识
  - `name`: POI名称
  - `address`: POI地址
  - `typecode`: POI类型代码
  - `photo`: POI图片URL（可能为null）

## 7. 文本搜索 (maps_text_search)

**请求参数：**
- `keywords`: 查询关键字
- `city`: 查询城市
- `citylimit`: 是否限制城市范围内搜索，默认不限制

**响应数据结构：**
```json
{
  "suggestion": {
    "keywords": "",
    "ciytes": {
      "suggestion": []
    }
  },
  "pois": [
    {
      "id": "B000A8UIN8",
      "name": "故宫博物院",
      "address": "景山前街4号",
      "typecode": "110201|140100",
      "photo": "http://store.is.autonavi.com/showpic/2f968490d105bb2741e17f90b85c6b79"
    },
    {
      "id": "B0FFKL520U",
      "name": "故宫博物院检票处",
      "address": "景山前街4号故宫博物院内(南侧)",
      "typecode": "070000",
      "photo": "https://aos-comment.amap.com/B0FFKL520U/comment/content_media_external_file_1000007925_ss__1755577638042_70227714.jpg"
    },
    // 更多POI数据...
  ]
}
```

**数据说明：**
- `suggestion`: 建议信息
  - `keywords`: 关键词建议
  - `ciytes`: 城市建议
    - `suggestion`: 城市建议列表
- `pois`: POI（兴趣点）数组
  - `id`: POI的唯一标识
  - `name`: POI名称
  - `address`: POI地址
  - `typecode`: POI类型代码（可能包含多个类型，用|分隔）
  - `photo`: POI图片URL

## 8. POI详情查询 (maps_search_detail)

**请求参数：**
- `id`: POI的唯一标识，可通过文本搜索或周边搜索获取

**响应数据结构：**
```json
{
  "id": "B015F02AH1",
  "name": "晋祠景区",
  "location": "112.450794,37.704552",
  "address": "古唐路",
  "business_area": "",
  "city": "太原市",
  "type": "风景名胜;公园广场;公园",
  "alias": "晋祠胜境",
  "photo": "http://store.is.autonavi.com/showpic/0c64b753ffcf75bf91dbcce5d0a50950",
  "cost": "",
  "opentime2": "11-01至03-31 周一至周日 08:30-17:30；04-01至10-31 周一至周日 08:30-18:00",
  "level": "AAAA",
  "rating": "4.8",
  "open_time": "08:30-17:30 08:30-18:00",
  "ticket_ordering": "0"
}
```

**数据说明：**
- `id`: POI的唯一标识
- `name`: POI名称
- `location`: 经纬度坐标，格式为：经度,纬度
- `address`: POI详细地址
- `business_area`: 所属商圈
- `city`: 所属城市
- `type`: POI类型，多个类型用分号分隔
- `alias`: POI别名
- `photo`: POI图片URL
- `cost`: 消费信息
- `opentime2`: 详细开放时间
- `level`: 景区等级（如适用）
- `rating`: 评分
- `open_time`: 开放时间简要信息
- `ticket_ordering`: 票务预订信息

## 9. 公共交通路径规划 (maps_direction_transit_integrated)

**请求参数：**
- `origin`: 出发点经纬度，格式为：经度,纬度
- `destination`: 目的地经纬度，格式为：经度,纬度
- `city`: 公共交通规划起点城市
- `cityd`: 公共交通规划终点城市

**响应数据结构：**
```json
{
  "origin": "116.404,39.915",
  "destination": "116.407,39.920",
  "distance": "888",
  "transits": [
    {
      "duration": "1046",
      "walking_distance": "413",
      "segments": [
        {
          "walking": {
            "origin": "116.403992,39.915169",
            "destination": "116.406685,39.915836",
            "distance": "291",
            "duration": "249",
            "steps": [
              {
                "instruction": "沿东华门大街步行227米左转",
                "road": "东华门大街",
                "distance": "227",
                "action": "左转",
                "assistant_action": ""
              },
              {
                "instruction": "沿北河沿大街步行64米到达锡拉胡同",
                "road": "北河沿大街",
                "distance": "64",
                "action": "",
                "assistant_action": "到达锡拉胡同"
              }
            ]
          },
          "bus": {
            "buslines": [
              {
                "name": "60路(龙潭公园--黄寺总政大院)",
                "distance": "399",
                "duration": "693",
                "departure_stop": {"name": "锡拉胡同"},
                "arrival_stop": {"name": "骑河楼"},
                "via_stops": []
              }
            ]
          },
          "entrance": {"name": ""},
          "exit": {"name": ""},
          "railway": {"name": "", "trip": ""}
        },
        // 更多步行段...
      ]
    },
    // 更多换乘方案...
  ]
}
```

**数据说明：**
- `origin`: 起点坐标
- `destination`: 终点坐标
- `distance`: 总距离
- `transits`: 换乘方案数组
  - `duration`: 总耗时(秒)
  - `walking_distance`: 步行总距离
  - `segments`: 换乘段数组（每段包含步行、公交等信息）
    - `walking`: 步行信息
      - `origin`: 步行起点
      - `destination`: 步行终点
      - `distance`: 步行距离
      - `duration`: 步行耗时
      - `steps`: 步行步骤
        - `instruction`: 步行指示
        - `road`: 道路名称
        - `distance`: 该段距离
        - `action`: 动作
        - `assistant_action`: 辅助动作
    - `bus`: 公交信息
      - `buslines`: 公交线路数组
        - `name`: 公交线路名称
        - `distance`: 公交距离
        - `duration`: 公交耗时
        - `departure_stop`: 出发站点
        - `arrival_stop`: 到达站点
        - `via_stops`: 途经站点
    - `entrance`: 入口信息
    - `exit`: 出口信息
    - `railway`: 铁路信息

## 10. 距离计算 (maps_distance)

**请求参数：**
- `origins`: 起点经度，纬度，可以传多个坐标，使用竖线隔离，比如120,30|120,31
- `destination`: 终点经度，纬度
- `type`: 距离测量类型,1代表驾车距离测量，0代表直线距离测量，3步行距离测量

**响应数据结构：**
```json
{
  "results": [
    {
      "origin_id": "1",
      "dest_id": "1",
      "distance": "612",
      "duration": "0"
    }
  ]
}
```

**数据说明：**
- `results`: 结果数组
  - `origin_id`: 起点ID
  - `dest_id`: 终点ID
  - `distance`: 距离(米)
  - `duration`: 耗时(秒)

## 11. IP定位 (maps_ip_location)

**请求参数：**
- `ip`: IP地址

**响应数据结构：**
```json
{
  "province": "北京市",
  "city": "北京市",
  "adcode": "110000",
  "rectangle": "116.0119343,39.66127144;116.7829835,40.2164962"
}
```

**数据说明：**
- `province`: 省份
- `city`: 城市
- `adcode`: 行政区划代码
- `rectangle`: 城市范围矩形，格式为：左下经度,左下纬度;右上经度,右上纬度

## 12. 地图展示 (maps_schema_personal_map)

**请求参数：**
- `orgName`: 行程规划地图小程序名称
- `lineList`: 行程列表
  - `title`: 行程名称描述（按行程顺序）
  - `pointInfoList`: 行程目标位置点描述
    - `name`: 行程目标位置点名称
    - `lon`: 行程目标位置点经度
    - `lat`: 行程目标位置点纬度
    - `poiId`: 行程目标位置点POIID

**响应数据结构：**
```
amapuri://workInAmap/createWithToken?polymericId=mcp_aa4f238f8ffc4fcbb39d0553eba11187&from=MCP
```

**数据说明：**
- 返回的是一个高德地图客户端唤醒URI，用户点击该URI即可在高德地图中查看行程规划

## 13. 导航 (maps_schema_navi)

**请求参数：**
- `lon`: 终点经度
- `lat`: 终点纬度

**响应数据结构：**
```
amapuri://navi?sourceApplication=amap_mcp&lon=116.404&lat=39.915&dev=1&style=2
```

**数据说明：**
- 返回的是一个高德地图客户端唤醒URI，用户点击该URI即可在高德地图中打开导航到指定终点

## 14. 打车 (maps_schema_take_taxi)

**请求参数：**
- `slon`: 起点经度
- `slat`: 起点纬度
- `sname`: 起点名称
- `dlon`: 终点经度
- `dlat`: 终点纬度
- `dname`: 终点名称

**响应数据结构：**
```
amapuri://drive/takeTaxi?sourceApplication=amapplatform&slat=39.915&slon=116.404&sname=%E5%A4%A9%E5%AE%89%E9%97%A8&dlon=116.407&dlat=39.920&dname=%E6%95%85%E5%AE%AB
```

**数据说明：**
- 返回的是一个高德地图客户端唤醒URI，用户点击该URI即可在高德地图中打开打车功能，自动填充起点和终点信息

## 15. 天气查询 (maps_weather)

**请求参数：**
- `city`: 城市名称或者adcode

**响应数据结构：**
```json
{
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
      "nightpower": "1-3",
      "daytemp_float": "14.0",
      "nighttemp_float": "1.0"
    },
    {
      "date": "2025-11-10",
      "week": "1",
      "dayweather": "晴",
      "nightweather": "晴",
      "daytemp": "12",
      "nighttemp": "1",
      "daywind": "南",
      "nightwind": "南",
      "daypower": "1-3",
      "nightpower": "1-3",
      "daytemp_float": "12.0",
      "nighttemp_float": "1.0"
    },
    // 更多天气预报...
  ]
}
```

**数据说明：**
- `city`: 城市名称
- `forecasts`: 天气预报数组
  - `date`: 日期
  - `week`: 星期（1-7表示周一到周日）
  - `dayweather`: 白天天气
  - `nightweather`: 夜间天气
  - `daytemp`: 白天温度
  - `nighttemp`: 夜间温度
  - `daywind`: 白天风向
  - `nightwind`: 夜间风向
  - `daypower`: 白天风力
  - `nightpower`: 夜间风力
  - `daytemp_float`: 白天温度浮点数
  - `nighttemp_float`: 夜间温度浮点数

## 总结

本文档整理了高德地图MCP工具的数据结构，包括以下15个工具：

1. **步行路径规划 (maps_direction_walking)**：获取步行导航路线
2. **驾车路径规划 (maps_direction_driving)**：获取驾车导航路线
3. **骑行路径规划 (maps_direction_bicycling)**：获取骑行导航路线
4. **地理编码 (maps_geo)**：将地址转换为经纬度坐标
5. **逆地理编码 (maps_regeocode)**：将经纬度坐标转换为地址
6. **周边搜索 (maps_around_search)**：搜索指定位置周边的POI
7. **文本搜索 (maps_text_search)**：根据关键词搜索POI
8. **POI详情查询 (maps_search_detail)**：根据POI ID查询详细信息
9. **公共交通路径规划 (maps_direction_transit_integrated)**：获取公共交通换乘方案
10. **距离计算 (maps_distance)**：计算两点之间的距离
11. **IP定位 (maps_ip_location)**：根据IP地址定位位置
12. **地图展示 (maps_schema_personal_map)**：创建行程规划地图链接
13. **导航 (maps_schema_navi)**：创建导航链接
14. **打车 (maps_schema_take_taxi)**：创建打车链接
15. **天气查询 (maps_weather)**：获取指定城市的天气信息

这些工具可以为旅行攻略小程序提供全面的地图服务支持，包括位置搜索、路径规划、天气查询、导航和出行安排等核心功能，帮助用户更好地规划旅行行程。根据这些数据结构，开发者可以设计和实现符合需求的小程序功能。