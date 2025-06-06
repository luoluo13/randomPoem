# 更新日志

### 2025-04-15
**架构升级**
- 新增 Express 后端服务，使用 RESTful API 获取数据
- 弃用 generate-poetlist.js 和 poet-list.js
- 诗人数据文件格式从 JS 改为 JSON
- 新增自动检测诗人数据文件功能

**功能优化**
- 完善全部随机模式切换逻辑
- 修复全部随机模式无法正常关闭的问题
- 移除全部随机模式切换时的自动随机触发逻辑

### 2025-04-12
**功能更新**
- 实现「全部随机」跨诗人随机选诗功能
- 优化导航按钮的诗人切换逻辑

### 2025-04-10
**问题修复**
- 修复子菜单列表样式异常问题
- 移除诗人列表的空心圆点标记

**体验优化**
- 新增菜单展开动画效果
- 优化移动端菜单点击响应区域

### 2025-04-09
**新增功能**
- 实现诗人子菜单动态生成
- 新增诗人列表自动更新脚本
- 添加菜单栏交互功能

**样式更新**
- 重构页面布局适配侧边导航
- 优化诗歌卡片投影效果

### 2025-03-27
**架构调整**
- 将数据文件从 JSON 转为 JS 格式
- 新增数据格式转换工具 convert.html
- 实现本地文件协议直接运行支持