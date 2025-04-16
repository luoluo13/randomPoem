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

// 修改诗人数据加载函数
async function loadPoetList() {
    try {
        const response = await fetch('http://localhost:3000/api/poets');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const poets = await response.json();
        
        // 新增全局诗人列表存储
        window._poetList = poets;  // <-- 添加这行

        // 生成诗人子菜单
        const subMenu = document.querySelector('.sub-poet-list');
        subMenu.innerHTML = poets.map(poet => `
            <li class="poet-item" data-file="${poet.file}">${poet.name}</li>
        `).join('');

        // 添加诗人选择事件
        subMenu.querySelectorAll('.poet-item').forEach(item => {
            item.addEventListener('click', async () => {
                await loadPoetData(item.dataset.file);
            });
        });
        
        // 自动加载第一个诗人
        if (poets.length > 0) {
            await loadPoetData(poets[0].file);
        }
    } catch (error) {
        showError(`加载失败: ${error.message}`);
        console.error('Error loading poet list:', error);
    }
}

// 修改后的诗人数据加载函数
async function loadPoetData(filename) {
    try {
        const poetName = filename.replace('.json', '');
        const response = await fetch(`http://localhost:3000/api/poems/${poetName}`);
        poems = await response.json();
        
        if (document.body.classList.contains('all-random')) {
            currentIndex = Math.floor(Math.random() * poems.length);
        } else {
            currentIndex = 0;
        }
        loadPoem(currentIndex);
    } catch (error) {
        showError('诗歌数据加载失败');
    }
}

// 删除原 poetScript 相关代码，在初始化时加载
document.addEventListener('DOMContentLoaded', () => {
    loadPoetList(); // 替换原来的诗人列表加载
    
    // 保留原有事件监听...
});
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
        document.body.classList.toggle('all-random'); // 仅切换模式状态
    });

    // 子菜单交互
    document.querySelector('.poet-parent').addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
    });
});