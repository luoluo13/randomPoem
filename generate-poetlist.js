const fs = require('fs');
const path = require('path');

const poetDir = path.join(__dirname, 'poetjs');
const files = fs.readdirSync(poetDir)
    .filter(f => f.endsWith('.js') && f !== 'poet-list.js')
    .map(f => ({
        name: f.replace('.js', ''),
        file: f,
        varName: `_poemData` // 假设所有诗人都使用相同的变量名
    }));

const output = `window._poetList = ${JSON.stringify(files, null, 2)};`;
fs.writeFileSync(path.join(poetDir, 'poet-list.js'), output);
console.log('诗人列表已更新！');