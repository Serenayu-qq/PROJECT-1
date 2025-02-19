// 获取body元素
const body = document.body;

// 目标背景颜色 (#f29e9e)
const targetColor = { r: 242, g: 158, b: 158 };

// 初始背景颜色（黑色）
let currentColor = { r: 0, g: 0, b: 0 };

// 总变化时间（1分钟，即60000毫秒）
const totalDuration = 60000;

// 更新时间间隔（毫秒）
const interval = 100;

// 计算每次更新的颜色变化量
const colorChangePerInterval = {
    r: (targetColor.r - currentColor.r) / (totalDuration / interval),
    g: (targetColor.g - currentColor.g) / (totalDuration / interval),
    b: (targetColor.b - currentColor.b) / (totalDuration / interval),
};

// 定时器，每隔一段时间更新背景颜色
const timer = setInterval(() => {
    // 更新当前颜色值
    currentColor.r += colorChangePerInterval.r;
    currentColor.g += colorChangePerInterval.g;
    currentColor.b += colorChangePerInterval.b;

    // 设置新的背景颜色
    body.style.backgroundColor = `rgb(${Math.round(currentColor.r)}, ${Math.round(currentColor.g)}, ${Math.round(currentColor.b)})`;

    // 如果达到目标颜色，停止定时器
    if (
        currentColor.r >= targetColor.r &&
        currentColor.g >= targetColor.g &&
        currentColor.b >= targetColor.b
    ) {
        clearInterval(timer);
    }

}, interval);
