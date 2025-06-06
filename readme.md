## 功能介绍

基于 Web 的古典诗词随机展示系统，支持以下特性：
- 自动加载诗人作品集
- 跨诗人随机选诗功能
- 响应式布局适配多设备
- 实时数据更新无需重载页面

数据来源：[最全中华古诗词数据库](https://github.com/luoluo13/chinese-poetry)

## 使用方法

1. **准备数据文件**
   
   - 将诗人 JSON 文件放入 `poetjs` 目录

   - 文件命名格式：`诗人名.json`（示例：`纳兰性德.json`）
   
   - 注意格式统一！示例格式：
   
     ```
     [
       {
         "title": "长相思·山一程",
         "para": [
           "山一程，水一程，身向榆关那畔行，夜深千帐灯",
           "风一更，雪一更，聒碎乡心梦不成，故园无此声"
         ],
         "author": "纳兰性德"
       },
       {
         "title": "木兰花令·拟古决绝词",
         "para": [
           "人生若只如初见，何事秋风悲画扇",
           "等闲变却故人心，却道故心人易变",
           "骊山语罢清宵半，泪雨霖铃终不怨",
           "何如薄幸锦衣郎，比翼连枝当日愿"
         ],
         "author": "纳兰性德"
       }
     ]
     ```
   
     
   
2. **启动服务**
```bash
npm install express cors
node server.js

或

npm run start
```
3. 访问应用
```plaintext
http://localhost:3000
```

## 系统特性
- 基于 Express 的 REST API 服务
- 自动检测诗人数据文件
- 前端异步加载数据
- 支持离线数据缓存
## 开源协议
本项目采用 [WTFPL](https://en.wikipedia.org/wiki/WTFPL) 协议开源
