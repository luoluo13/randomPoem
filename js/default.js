let poems = []; // 用于存储加载的诗歌数据
let currentIndex = 0; // 当前展示的诗歌索引

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
    // 在生成诗人子菜单的代码处添加样式控制
    subMenu.innerHTML = window._poetList.map(poet => `
        <li class="poet-item" data-file="${poet.file}" 
            style="list-style-type: none;">${poet.name} <!-- 添加行内样式移除列表标记 -->
        </li>
    `).join('');
    
    // 或者更推荐的方式：在CSS文件中添加
    // 请在你的CSS文件中添加以下规则：
    // .sub-poet-list li { list-style: none; }
    
    // 添加诗人选择事件
    subMenu.querySelectorAll('.poet-item').forEach(item => {
        item.addEventListener('click', () => {
            loadPoetData(item.dataset.file);
        });
    });
};
document.head.appendChild(poetScript);

// 修改诗人数据加载函数
function loadPoetData(filename) {
    // 移除之前加载的诗人脚本
    const existingScripts = document.head.querySelectorAll('script[src^="./poetjs/"]');
    existingScripts.forEach(script => script.remove());

    const script = document.createElement('script');
    script.src = `./poetjs/${filename}`;
    script.onload = () => {
        poems = window._poemData;
        // 在全部随机模式下加载新诗人后自动随机选诗
        if (document.body.classList.contains('all-random')) {
            currentIndex = Math.floor(Math.random() * poems.length);
        } else {
            currentIndex = 0;
        }
        loadPoem(currentIndex);
    };
    script.onerror = () => showError('诗人数据加载失败');
    document.head.appendChild(script);
}

// 修改随机函数支持跨诗人随机
function showRandomPoem() {
    if (document.body.classList.contains('all-random')) {
        // 随机选择诗人并加载数据
        const randomPoet = window._poetList[Math.floor(Math.random() * window._poetList.length)];
        loadPoetData(randomPoet.file);
    } else {
        const randomIndex = Math.floor(Math.random() * poems.length);
        currentIndex = randomIndex;
        loadPoem(currentIndex);
    }
}

// 修改导航函数支持跨诗人随机
function showPreviousPoem() {
    if (document.body.classList.contains('all-random')) {
        showRandomPoem(); // 全部随机模式下直接触发新随机
    } else if (currentIndex > 0) {
        currentIndex--;
        loadPoem(currentIndex);
    }
}

function showNextPoem() {
    if (document.body.classList.contains('all-random')) {
        showRandomPoem(); // 全部随机模式下直接触发新随机
    } else if (currentIndex < poems.length - 1) {
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
    // 新增全部随机点击事件
    document.getElementById('all-poets').addEventListener('click', () => {
        document.body.classList.add('all-random');
        showRandomPoem();
    });

    // 子菜单交互
    document.querySelector('.poet-parent').addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
    });
});

