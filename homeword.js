const sentenceElement = document.getElementById("sentence");

const meaningfulSentences = [
    "LOVE IS WHEN YOU BUILD EACH OTHER UP",
    "LOVE IS SHARING FOOD SHARING HAPPINESS",
    "LOVE INCLUDES THE NECESSARY SPACE FOR PAIN",
    "LOVE IS IN THE SMALLEST THINGS AND THE DETAIL",
    "LOVE MAKES ROOM FOR CHANGE AND GROWTH",
    "LOVE IS COMFORT IN UNCOMFORTABLE PLACES.",
    "LOVE IS A FEELING OF COMFORT WARM AND GRATEFUL",
    "LOVE FEELS LIKE COMING HOME AND HAVE A HOT SOUP",
];

let isRandomizing = true;
let speed = 50; // 控制跳动的速度（单位：毫秒）

// 获取随机句子
function getRandomSentence() {
    return meaningfulSentences[Math.floor(Math.random() * meaningfulSentences.length)];
}

// 让句子持续跳动
function animateRandomText() {
    if (isRandomizing) {
        sentenceElement.textContent = getRandomSentence();
        frame = setTimeout(animateRandomText, speed); // 通过 setTimeout 控制速度
    } else {
        clearTimeout(frame);
        frame = null; // 清除定时器
    }
}

// 停止跳动，并保持当前内容
function stopRandomizing() {
    isRandomizing = false;
    if (frame) {
        clearTimeout(frame);
        frame = null; // 防止重复调用
    }
    sentenceElement.classList.remove("flicker");
}

// 开始跳动
function startRandomizing() {
    if (!isRandomizing) { // 确保不会重复调用
        isRandomizing = true;
        sentenceElement.classList.add("flicker");
        animateRandomText();
    }
}

// 监听点击事件，切换状态
document.body.addEventListener("click", () => {
    if (isRandomizing) {
        stopRandomizing(); // 暂停随机化
    } else {
        startRandomizing(); // 重新开始随机化
    }
});

// 启动初始的随机跳动
startRandomizing();
