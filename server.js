const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// 新增诗人目录路径定义
const poetDir = path.join(__dirname, 'poetjs'); // ← 添加这行关键定义

// 静态文件服务配置保持不动
app.use(express.static(path.join(__dirname))); 
app.use('/poetjs', express.static(poetDir));

// 获取诗人列表的路由需要添加异常处理
app.get('/api/poets', (req, res) => {
    try {
        const files = fs.readdirSync(poetDir)
            .filter(f => f.endsWith('.json'))
            .map(f => ({
                name: path.basename(f, '.json'),
                file: f
            }));
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: '无法读取诗人目录' });
    }
});

// 获取具体诗歌数据
// 修改服务器端路由处理
app.get('/api/poems/:poet', (req, res) => {
    const filePath = path.join(poetDir, `${req.params.poet}.json`); // 强制添加.json扩展名
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(404).json({ error: '诗人数据未找到' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));