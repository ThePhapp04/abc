// =========================================
// GLOBAL VARIABLES & CONFIG
// =========================================
const startDate = new Date("2026-04-25T00:00:00"); // Mốc bắt đầu yêu nhau (để ra kết quả 1 tháng 4 ngày)
let bgm = document.getElementById("bgm");
let isMusicPlaying = false;

// =========================================
// UTILS & SCREEN MANAGEMENT
// =========================================
function switchScreen(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);

    hideEl.classList.remove('active');
    setTimeout(() => {
        hideEl.classList.add('hidden');
        showEl.classList.remove('hidden');
        // trigger reflow
        void showEl.offsetWidth;
        showEl.classList.add('active');

        // Trigger specific init based on screen
        if (showId === 's3-timeline') initTimeline();
        if (showId === 's4-quiz') initQuiz();
        if (showId === 's5-slideshow') initSlideshow();
        if (showId === 's7-ending') initEnding();
    }, 800);
}

// =========================================
// AUDIO CONTROL & FLOATING NOTES
// =========================================
const toggleBtn = document.getElementById('music-toggle');
toggleBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgm.pause();
        toggleBtn.classList.remove('playing');
    } else {
        bgm.play();
        toggleBtn.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
});

function playMusic() {
    if (!isMusicPlaying) {
        bgm.play().then(() => {
            isMusicPlaying = true;
            toggleBtn.classList.remove('hidden');
            toggleBtn.classList.add('playing');
        }).catch(e => console.log("Audio autoplay blocked"));
    }
}

const notes = ["Ẻm ăn cơm chưa?", "Nhớ ngủ sớm nha em iuu", "Yêu em bé ❤️", "Đồ ngốc đáng yêu", "Nhớ Vân Anh", "Thương em bé", "Cười lên nào!"];
function spawnFloatingNote() {
    const container = document.getElementById('floating-notes-container');
    const note = document.createElement('div');
    note.className = 'floating-note';
    note.innerText = notes[Math.floor(Math.random() * notes.length)];

    // Random position
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 50;

    note.style.left = `${startX}px`;
    note.style.top = `${startY}px`;

    container.appendChild(note);

    // Animate using GSAP
    gsap.to(note, {
        y: -window.innerHeight - 100,
        x: startX + (Math.random() * 200 - 100), // Sway slightly
        rotation: Math.random() * 40 - 20,
        duration: 10 + Math.random() * 5,
        ease: "linear",
        onComplete: () => { note.remove(); }
    });
}
setInterval(spawnFloatingNote, 8000); // Mọi 8s xuất hiện 1 note

// =========================================
// SECTION 1: OPENING
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading effect
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');

    new Typed('#loading-typed', {
        strings: [
            "Đang kiểm tra dữ liệu tình yêu...",
            "Đang xác minh độ đáng yêu...",
            "Đang tải những khoảnh khắc hạnh phúc..."
        ],
        typeSpeed: 40,
        backSpeed: 20,
        showCursor: false,
        onComplete: () => {
            setTimeout(() => {
                document.getElementById('loading-container').classList.add('hidden');
                document.getElementById('intro-container').classList.remove('hidden');

                // GSAP zoom cinematic
                gsap.fromTo("#glowing-heart", { scale: 0 }, { scale: 1, duration: 1, ease: "back.out(1.7)" });
                gsap.fromTo(".intro-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
                gsap.fromTo(".intro-subtitle", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });
                gsap.fromTo("#btn-start", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.5 });
            }, 1000);
        }
    });

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) { progress = 100; clearInterval(loadingInterval); }
        progressBar.style.width = `${progress}%`;
    }, 500);

    // Easter Egg
    let clickCount = 0;
    document.getElementById('glowing-heart').addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            const egg = document.getElementById('easter-egg');
            egg.classList.remove('hidden');
            gsap.fromTo(egg, { scale: 0 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            setTimeout(() => {
                gsap.to(egg, { scale: 0, duration: 0.3, onComplete: () => egg.classList.add('hidden') });
                clickCount = 0;
            }, 3000);
        }
    });

    // Bắt đầu hành trình
    document.getElementById('btn-start').addEventListener('click', () => {
        playMusic();
        switchScreen('s1-opening', 's2-minigame');
        startMinigame();
    });
});

// =========================================
// SECTION 2: MINIGAME
// =========================================
let gameScore = 0;
let gameTimer = 10;
let gameInterval;
let spawnInterval;

function startMinigame() {
    gameScore = 0;
    gameTimer = 10;
    document.getElementById('game-score').innerText = gameScore;
    document.getElementById('game-time').innerText = gameTimer;
    document.getElementById('game-result').classList.add('hidden');
    document.getElementById('game-area').innerHTML = '';

    // Countdown
    gameInterval = setInterval(() => {
        gameTimer--;
        document.getElementById('game-time').innerText = gameTimer;
        if (gameTimer <= 0) {
            endMinigame();
        }
    }, 1000);

    // Spawn hearts
    spawnInterval = setInterval(() => {
        createGameHeart();
    }, 400); // 0.4s 1 heart
}

function createGameHeart() {
    const area = document.getElementById('game-area');
    const heart = document.createElement('div');
    heart.className = 'game-heart';
    heart.innerHTML = '<i class="fas fa-heart"></i>';

    const size = 30 + Math.random() * 20;
    heart.style.fontSize = `${size}px`;

    const startX = Math.random() * (window.innerWidth - 50);
    heart.style.left = `${startX}px`;
    heart.style.top = `${window.innerHeight}px`;

    area.appendChild(heart);

    heart.addEventListener('click', () => {
        gameScore++;
        document.getElementById('game-score').innerText = gameScore;

        // Clicks effect
        gsap.to(heart, { scale: 3, opacity: 0, duration: 0.3, onComplete: () => heart.remove() });
    });

    gsap.to(heart, {
        y: -window.innerHeight - 100,
        duration: 3 + Math.random() * 2,
        ease: "linear",
        onComplete: () => heart.remove()
    });
}

function endMinigame() {
    clearInterval(gameInterval);
    clearInterval(spawnInterval);

    // Clear area
    document.getElementById('game-area').innerHTML = '';

    const resultModal = document.getElementById('game-result');
    const title = document.getElementById('result-title');
    const msg = document.getElementById('result-msg');

    if (gameScore >= 10) {
        title.innerText = "Wow! Tuyệt vời!";
        msg.innerText = "Đúng là người yêu chuyên nghiệp ❤️";
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
        title.innerText = "Hết giờ!";
        msg.innerText = "Không sao, anh vẫn chấm em 10 điểm 🥰";
    }

    resultModal.classList.remove('hidden');
    gsap.fromTo(resultModal, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
}

document.getElementById('btn-next-to-timeline').addEventListener('click', () => {
    switchScreen('s2-minigame', 's3-timeline');
});

// =========================================
// SECTION 3: TIMELINE
// =========================================
function initTimeline() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: document.getElementById('s3-timeline'),
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.getElementById('btn-next-to-quiz').addEventListener('click', () => {
    switchScreen('s3-timeline', 's4-quiz');
});

// =========================================
// SECTION 4: QUIZ
// =========================================
const questions = [
    { q: "1 tháng qua em thấy anh thế nào?", opts: ["Khá ổn", "Đáng yêu", "Siêu đáng yêu", "Không còn thuốc chữa"] },
    { q: "Em thích nụ cười của anh lúc nào nhất?", opts: ["Lúc ngớ ngẩn", "Lúc nhìn em", "Lúc nào cũng thích", "Cấm cười"] },
    { q: "Nơi hẹn hò lý tưởng của chúng mình?", opts: ["Quán cafe nhỏ", "Dạo phố đêm", "Rạp chiếu phim", "Nơi nào có em là được"] },
    { q: "Ai là người hay dỗi hơn?", opts: ["Anh chứ ai", "Chắc chắn là anh", "100% là anh", "Hỏi thừa"] },
    { q: "Món quà em thích nhất?", opts: ["Hoa", "Đồ ăn", "Anh", "Cả 3"] },
    { q: "Điểm yếu của anh là gì?", opts: ["Ngủ nhiều", "Hay quên", "Là em đó", "Không có điểm yếu"] },
    { q: "Lời hứa của tháng tiếp theo?", opts: ["Yêu em nhiều hơn", "Bớt chọc em", "Mua nhiều đồ ăn", "Tất cả đều đúng"] },
    { q: "Câu cuối: Em bé có yêu anh không?", opts: ["Có", "Rất nhiều", "Vô cùng", "Hơn cả vũ trụ"] }
];

let currentQ = 0;

function initQuiz() {
    currentQ = 0;
    renderQuestion();
}

function renderQuestion() {
    if (currentQ >= questions.length) {
        // Finish quiz
        switchScreen('s4-quiz', 's5-slideshow');
        return;
    }

    const data = questions[currentQ];
    document.getElementById('quiz-question').innerText = data.q;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    data.opts.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.innerText = opt;
        btn.onclick = () => handleOptionClick(btn);
        optionsContainer.appendChild(btn);
    });

    // Update progress
    const progress = ((currentQ) / questions.length) * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;
}

function handleOptionClick(btn) {
    // Show sticker effect
    const sticker = document.getElementById('quiz-sticker');
    sticker.innerHTML = ['💖', '😍', '😘', '🥰'][Math.floor(Math.random() * 4)];
    sticker.style.left = `${btn.getBoundingClientRect().left + btn.offsetWidth / 2}px`;
    sticker.style.top = `${btn.getBoundingClientRect().top}px`;

    sticker.classList.remove('hidden');
    // reset animation
    sticker.style.animation = 'none';
    sticker.offsetHeight; /* trigger reflow */
    sticker.style.animation = 'floatUp 1s ease-out forwards';

    setTimeout(() => {
        sticker.classList.add('hidden');
        currentQ++;

        // Animate card out and in
        gsap.to('#quiz-card', {
            x: -50, opacity: 0, duration: 0.3, onComplete: () => {
                renderQuestion();
                if (currentQ < questions.length) {
                    gsap.fromTo('#quiz-card', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
                }
            }
        });
    }, 600);
}

// =========================================
// SECTION 5: SLIDESHOW
// =========================================
const images = [
    { src: "assets/images/photo5.jpg", cap: "Xinh xẻo ❤️" },
    { src: "assets/images/photo6.jpg", cap: "Khoảnh khắc cute" },
    { src: "assets/images/photo7.jpg", cap: "Nhớ em" },
    { src: "assets/images/photo8.jpg", cap: "Yêu nè 🥰" }
];

function initSlideshow() {
    new Typed('#surprise-text', {
        strings: [
            "Khoan đã...",
            "Dữ liệu khảo sát cho thấy...",
            "Anh cực kỳ may mắn."
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        showCursor: false,
        onComplete: () => {
            setTimeout(() => {
                document.getElementById('surprise-text').classList.add('hidden');
                startPolaroids();
            }, 1000);
        }
    });
}

function startPolaroids() {
    const container = document.getElementById('polaroid-slider');
    container.classList.remove('hidden');

    images.forEach((img, idx) => {
        const div = document.createElement('div');
        div.className = 'polaroid';
        div.style.setProperty('--rand', Math.random());
        div.innerHTML = `
            <img src="${img.src}" alt="Memory">
            <div class="polaroid-caption">${img.cap}</div>
        `;
        container.appendChild(div);

        // Staggered entrance
        setTimeout(() => {
            div.classList.add('active');
        }, idx * 2000);
    });

    setTimeout(() => {
        const btn = document.getElementById('btn-next-to-letter');
        btn.classList.remove('hidden');
        gsap.fromTo(btn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    }, images.length * 2000 + 1000);
}

document.getElementById('btn-next-to-letter').addEventListener('click', () => {
    switchScreen('s5-slideshow', 's6-letter');
});

// =========================================
// SECTION 6: LOVE LETTER
// =========================================
let letterOpened = false;
document.getElementById('envelope-wrapper').addEventListener('click', function () {
    if (letterOpened) return;
    letterOpened = true;

    this.classList.add('open');
    document.getElementById('envelope-hint').classList.add('hidden');

    setTimeout(() => {
        new Typed('#letter-typed', {
            strings: [
                "Gửi VanAnh, em bé của anh,<br><br>Cảm ơn em iuu vì đã xuất hiện trong cuộc đời anh. 1 tháng qua trôi qua thật nhanh, nhưng cũng đủ để anh biết mình đã yêu em bé nhiều thế nào. <br><br>Những lúc được nói chuyện, được nhìn thấy bé cười, mọi muộn phiền của anh dường như tan biến. Anh không hứa sẽ mang lại cho em những điều lớn lao nhất, nhưng anh hứa sẽ luôn ở bên, che chở và yêu thương em iuu bằng tất cả những gì anh có.<br><br>Yêu em bé Vân Anh nhiều hơn những gì anh có thể diễn tả. ❤️(không phải AI đâu nha =))))"
            ],
            typeSpeed: 30,
            showCursor: false,
            onComplete: () => {
                const btn = document.getElementById('btn-next-to-end');
                btn.classList.remove('hidden');
                gsap.fromTo(btn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
            }
        });
    }, 1000); // Đợi animation kéo thư lên xong
});

document.getElementById('btn-next-to-end').addEventListener('click', () => {
    switchScreen('s6-letter', 's7-ending');
});

// =========================================
// SECTION 7: ENDING
// =========================================
function initEnding() {
    // 1. Confetti burst
    var duration = 3000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // 2. Particles JS (Stars)
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 0.5, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } },
        "retina_detect": true
    });

    // 3. Counter Realtime
    updateCounter();
    setInterval(updateCounter, 1000);
}

function updateCounter() {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let mins = now.getMinutes() - startDate.getMinutes();
    let secs = now.getSeconds() - startDate.getSeconds();

    if (secs < 0) {
        secs += 60;
        mins--;
    }
    if (mins < 0) {
        mins += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    if (years > 0) {
        months += years * 12;
    }

    document.getElementById('count-months').innerText = months;
    document.getElementById('count-days').innerText = days;
    document.getElementById('count-hours').innerText = hours;
    document.getElementById('count-mins').innerText = mins;
    document.getElementById('count-secs').innerText = secs;
}
