let poems = []; // 用于存储加载的诗歌数据
let currentIndex = 0; // 当前展示的诗歌索引
// 从 nalanxingde.json 文件加载数据
// 将原json文件改为js格式并添加全局变量

// 替换为 ↓↓↓
// 动态创建script标签加载数据
const script = document.createElement('script');
script.onload = () => {
    poems = window._poemData; // 使用全局变量
    if (poems.length > 0) loadPoem(0);
};
script.onerror = () => showError('数据加载失败！');
document.head.appendChild(script);
// 显示错误消息
function showError(message) {
    document.getElementById('poem-title').textContent = '出错了！';
    document.getElementById('poem-author').textContent = '';
    document.getElementById('poem-content').textContent = message;
}
// 载入诗歌到页面
function loadPoem(index) {
    const poem = poems[index];
    document.getElementById('poem-title').textContent = poem.title;
    document.getElementById('poem-author').textContent = `作者: ${poem.author}`;
    document.getElementById('poem-content').textContent = poem.para.join('\n');
}
// 修改为动态加载诗人JS列表
const poetScript = document.createElement('script');
poetScript.src = './poetjs/poet-list.js'; // 自动化生成的诗人列表
poetScript.onload = () => {
    // 自动加载第一个诗人的数据
    const firstPoet = window._poetList[0];
    loadPoetData(firstPoet.file);
    
    // 生成诗人子菜单
    const subMenu = document.querySelector('.sub-poet-list');
    subMenu.innerHTML = window._poetList.map(poet => `
        <li class="poet-item" data-file="${poet.file}">${poet.name}</li>
    `).join('');
    
    // 添加诗人选择事件
    subMenu.querySelectorAll('.poet-item').forEach(item => {
        item.addEventListener('click', () => {
            loadPoetData(item.dataset.file);
        });
    });
};
document.head.appendChild(poetScript);

// 新增诗人数据加载函数
function loadPoetData(filename) {
    const script = document.createElement('script');
    script.src = `./poetjs/${filename}`;
    script.onload = () => {
        poems = window._poemData;
        currentIndex = 0;
        loadPoem(0);
    };
    script.onerror = () => showError('诗人数据加载失败');
    document.head.appendChild(script);
}

// 修改随机函数支持全部随机模式
function showRandomPoem() {
    if (document.body.classList.contains('all-random')) {
        // 随机选择诗人
        const randomPoet = window._poetList[Math.floor(Math.random() * window._poetList.length)];
        loadPoetData(randomPoet.file);
    } else {
        const randomIndex = Math.floor(Math.random() * poems.length);
        currentIndex = randomIndex;
        loadPoem(currentIndex);
    }
}
// 上一首诗
function showPreviousPoem() {
    if (currentIndex > 0) {
        currentIndex--;
        loadPoem(currentIndex);
    }
}
// 下一首诗
function showNextPoem() {
    if (currentIndex < poems.length - 1) {
        currentIndex++;
        loadPoem(currentIndex);
    }
}
// 初始化按钮事件监听
document.getElementById('random-btn').addEventListener('click', showRandomPoem);
document.getElementById('prev-btn').addEventListener('click', showPreviousPoem);
document.getElementById('next-btn').addEventListener('click', showNextPoem);

// 初始化时加载
document.addEventListener('DOMContentLoaded', () => {
    
    // 子菜单交互
    document.querySelector('.poet-parent').addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
    });
});

