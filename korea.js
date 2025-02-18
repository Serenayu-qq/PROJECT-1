document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const lyricsContainer = document.getElementById("lyrics");
    const progressBar = document.getElementById("progress");
    const progressContainer = document.getElementById("progress-container");
    const playPauseBtn = document.getElementById("play-pause");
    const currentTimeDisplay = document.getElementById("current-time");
    const durationDisplay = document.getElementById("duration");

    let lyricsData = []; // 存储歌词数据
    let currentLyricIndex = 0; // 当前歌词索引
    const lineHeight = 40; // 每行歌词的高度

    // 读取 LRC 歌词文件
    fetch("korea.lrc")
        .then(response => response.text())
        .then(parseLRC);

    function parseLRC(data) {
        const lines = data.split("\n");
        lyricsData = lines
            .map(line => {
                const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
                if (match) {
                    const minutes = parseInt(match[1]);
                    const seconds = parseFloat(match[2]);
                    return { time: minutes * 60 + seconds, text: match[3] };
                }
                return null;
            })
            .filter(line => line); // 过滤空行

        renderLyrics();
    }

    function renderLyrics() {
        lyricsContainer.innerHTML = "";
        lyricsData.forEach((line, index) => {
            const li = document.createElement("li");
            li.textContent = line.text;
            li.dataset.index = index;
            lyricsContainer.appendChild(li);
        });

        // **初始化时，确保第一行歌词可见**
        scrollToLyric(0, true);
    }

    function updateLyrics() {
        const currentTime = audio.currentTime;
        let activeIndex = 0;

        for (let i = 0; i < lyricsData.length; i++) {
            if (currentTime >= lyricsData[i].time) {
                activeIndex = i;
            } else {
                break;
            }
        }

        if (activeIndex !== currentLyricIndex) {
            currentLyricIndex = activeIndex;
            highlightLyric(activeIndex);
        }
    }

    function highlightLyric(index) {
        const lyricsList = lyricsContainer.getElementsByTagName("li");

        for (let i = 0; i < lyricsList.length; i++) {
            lyricsList[i].classList.remove("active");
        }

        if (lyricsList[index]) {
            lyricsList[index].classList.add("active");
            scrollToLyric(index);
        }
    }

    function scrollToLyric(index, initial = false) {
        const lyricsList = lyricsContainer.getElementsByTagName("li");

        if (lyricsList.length > 0) {
            let scrollOffset = initial ? 0 : (index - 4) * lineHeight;

            // 防止滚动超出歌词列表
            scrollOffset = Math.max(0, scrollOffset);

            lyricsContainer.style.transition = "transform 0.5s ease-in-out";
            lyricsContainer.style.transform = `translateY(-${scrollOffset}px)`;
        }
    }

    function updateProgress() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        if (!isNaN(duration)) {
            progressBar.style.width = (currentTime / duration) * 100 + "%";
            currentTimeDisplay.textContent = formatTime(currentTime);
            durationDisplay.textContent = formatTime(duration);
        }

        updateLyrics();
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    // **进度条可点击调整进度**
    progressContainer.addEventListener("click", (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if (!isNaN(duration)) {
            audio.currentTime = (clickX / width) * duration;
        }
    });

    // **播放/暂停按钮**
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "❤️";
        } else {
            audio.pause();
            playPauseBtn.textContent = "🤍";
        }
    });

    // **确保歌词滚动 & 进度条更新时间**
    audio.addEventListener("timeupdate", updateProgress);

    // **确保音频加载后正确显示总时长**
    audio.addEventListener("loadedmetadata", () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });
});
