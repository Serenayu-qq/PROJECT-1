const lyrics = [
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "The last kiss had the flavor of cigarettes",
    "最後のキスはタバコの flavor がした",
    "A bitter and sad scent",
    "ニガくてせつない香り",
    "By this time tomorrow",
    "明日の今頃には",
    "where are you",
    "あなたはどこにいるんだろう",
    "Who are you thinking of?",
    "誰を思ってるんだろう",
    "You are always gonna be my love",
    "Even if I fall in love with someone again someday",
    "いつか誰かとまた恋に落ちても",
    "I'll remember to love",
    "You taught me how",
    "You are always gonna be the one",
    "It's still a sad love song",
    "今はまだ悲しい love song",
    "Until I can sing a new song",
    "新しい歌 歌えるまで",
    "time to stop",
    "立ち止まる時間が",
    "trying to move",
    "動き出そうとしてる",
    "All the things I don't want to forget",
    "忘れたくないことばかり",
    "By this time tomorrow",
    "明日の今頃には",
    "I'm probably crying",
    "私はきっと泣いている",
    "I guess I'm thinking of you yeah-yeah-yeah",
    "あなたを思ってるんだろう yeah-yeah-yeah",
    "You will always be inside my heart",
    "Because there's always a place just for you",
    "いつもあなただけの場所があるから",
    "I hope that I have a place in your heart too",
    "Now and forever you are still the one",
    "It's still a sad love song",
    "今はまだ悲しい love song",
];

let currentIndex = 0;
const lyricsList = document.getElementById("lyrics-list");
const playButton = document.getElementById("play-button");
const audio = document.getElementById("audio");
const progressBar = document.getElementById("progress-bar");
const timeDisplay = document.getElementById("time-display");

function updateLyrics() {
    lyricsList.innerHTML = "";
    const visibleLyrics = lyrics.slice(currentIndex, currentIndex + 10);
    
    visibleLyrics.forEach(line => {
        let li = document.createElement("li");
        li.textContent = line;
        lyricsList.appendChild(li);
    });
}

function scrollLyrics() {
    if (currentIndex + 10 < lyrics.length) {
        currentIndex++;
        updateLyrics();
    } else {
        clearInterval(scrollInterval);
    }
}

let scrollInterval;
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.style.opacity = "0.7"; // 播放时稍微变暗
        scrollInterval = setInterval(scrollLyrics, 3000);
    } else {
        audio.pause();
        playButton.style.opacity = "1"; // 暂停时恢复正常
        clearInterval(scrollInterval);
    }
});

// 监听音频播放进度
audio.addEventListener("timeupdate", () => {
    let currentTime = audio.currentTime;
    let duration = audio.duration;
    
    if (!isNaN(duration)) {
        progressBar.value = (currentTime / duration) * 100;
        timeDisplay.textContent = formatTime(currentTime) + " / " + formatTime(duration);
    }
});

// 进度条拖动控制播放进度
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// 格式化时间（秒 -> 分钟:秒）
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

updateLyrics();

