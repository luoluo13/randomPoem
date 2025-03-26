let poems = []; // 用于存储加载的诗歌数据
let currentIndex = 0; // 当前展示的诗歌索引
// 从 nalanxingde.json 文件加载数据
fetch('./json/nalanxingde.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('无法加载诗歌数据！');
        }
        return response.json();
    })
    .then(data => {
        poems = data; // 将 JSON 数据存储到变量中
        if (poems.length > 0) {
            loadPoem(0); // 默认加载第一首诗歌
        } else {
            showError('数据为空！');
        }
    })
    .catch(error => {
        showError(error.message);
    });
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
// 随机选择诗歌
function showRandomPoem() {
    const randomIndex = Math.floor(Math.random() * poems.length);
    currentIndex = randomIndex;
    loadPoem(currentIndex);
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