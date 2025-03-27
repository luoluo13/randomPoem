## 功能介绍

2025.03.26

​	使用html + css + js开发了一个随机选诗的功能，本意是为了抄诗方便。

​	素材来源：[最全中华古诗词数据库](https://github.com/luoluo13/chinese-poetry)

2025.03.27

​	使用方法更新：

​		1. 从[素材来源](https://github.com/luoluo13/chinese-poetry)下载想要的json文件后，使用convert.html将json转换为js并保存到./json文件夹中，运行index.html即可。



## BUG记录

#### 	2025.03.26

​		重大错误：该项目无法使用file协议在本地进行读取，必须使用http/https协议在服务器（或本地服务器localhost）运行。正在尝试解决。【已于2025.03.27解决】



## BUG解决记录

#### 2025.03.27

​		解决了2025.03.26发现的BUG。
​		由于在本地文件协议（file://）环境下，浏览器出于安全限制确实会阻止fetch请求本地JSON文件（CORS限制），作者修改了代码逻辑，将json替换为js，并提供了转换工具。
​		现在只需要将下载的json文件通过项目根目录下的convert.html工具修改为.js，并保存到./json文件夹中，即可使用file协议正常使用该项目。



## 开源协议

本项目基于 [WTFPL](https://en.wikipedia.org/wiki/WTFPL) 协议开源。