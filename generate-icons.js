const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// 创建输出目录
const outputDir = path.join(__dirname, 'frontend', 'src', 'assets', 'tab-bar');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 创建81x81的画布
function createIcon(name, isActive) {
    const canvas = createCanvas(81, 81);
    const ctx = canvas.getContext('2d');
    
    // 设置颜色
    const color = isActive ? '#ff6b6b' : '#999999';
    
    // 清空画布（透明背景）
    ctx.clearRect(0, 0, 81, 81);
    
    switch(name) {
        case 'home':
            drawHomeIcon(ctx, color);
            break;
        case 'search':
            drawSearchIcon(ctx, color);
            break;
        case 'guide':
            drawGuideIcon(ctx, color);
            break;
        case 'profile':
            drawProfileIcon(ctx, color);
            break;
    }
    
    // 保存为PNG文件
    const filename = isActive ? `${name}-active.png` : `${name}.png`;
    const filepath = path.join(outputDir, filename);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filepath, buffer);
    
    console.log(`已生成图标: ${filename}`);
}

// 绘制房屋图标
function drawHomeIcon(ctx, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    // 屋顶
    ctx.beginPath();
    ctx.moveTo(40.5, 15);
    ctx.lineTo(15, 35);
    ctx.lineTo(66, 35);
    ctx.closePath();
    ctx.fill();
    
    // 房屋主体
    ctx.fillRect(20, 35, 41, 31);
    
    // 门
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(35, 50, 11, 16);
    
    // 窗户
    ctx.fillStyle = color;
    ctx.fillRect(25, 42, 8, 8);
    ctx.fillRect(48, 42, 8, 8);
}

// 绘制搜索图标
function drawSearchIcon(ctx, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    
    // 放大镜圆圈
    ctx.beginPath();
    ctx.arc(30, 30, 12, 0, 2 * Math.PI);
    ctx.stroke();
    
    // 放大镜手柄
    ctx.beginPath();
    ctx.moveTo(39, 39);
    ctx.lineTo(55, 55);
    ctx.stroke();
}

// 绘制攻略图标
function drawGuideIcon(ctx, color) {
    ctx.fillStyle = color;
    
    // 书本主体
    ctx.fillRect(20, 20, 41, 35);
    
    // 书页线条
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(25, 28);
    ctx.lineTo(56, 28);
    ctx.moveTo(25, 35);
    ctx.lineTo(56, 35);
    ctx.moveTo(25, 42);
    ctx.lineTo(56, 42);
    ctx.stroke();
    
    // 书签
    ctx.fillStyle = color;
    ctx.fillRect(38, 15, 5, 20);
}

// 绘制个人中心图标
function drawProfileIcon(ctx, color) {
    ctx.fillStyle = color;
    
    // 头部圆圈
    ctx.beginPath();
    ctx.arc(40.5, 28, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // 身体轮廓
    ctx.beginPath();
    ctx.arc(40.5, 50, 15, 0, Math.PI);
    ctx.fill();
}

// 生成所有图标
console.log('开始生成TabBar图标...');

const icons = [
    { name: 'home', active: false },
    { name: 'home', active: true },
    { name: 'search', active: false },
    { name: 'search', active: true },
    { name: 'guide', active: false },
    { name: 'guide', active: true },
    { name: 'profile', active: false },
    { name: 'profile', active: true }
];

icons.forEach(icon => {
    createIcon(icon.name, icon.active);
});

console.log('所有图标生成完成！');