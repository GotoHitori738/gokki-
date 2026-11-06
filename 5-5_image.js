const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");

let x = 100;
let y = 80;

let vx = 180;
let vy = 140;

const r = 24;

let last = performance.now();

// 画像を読み込む
const img = new Image();
img.src = "5-5_playr.png";

// 位置を更新する
function update(dt) {
    x = x + vx * dt;
    y = y + vy * dt;

    // 左右の壁
    if (x + r > canvas.width) {
        x = canvas.width - r;
        vx = -vx;
    }

    if (x - r < 0) {
        x = r;
        vx = -vx;
    }

    // 上下の壁
    if (y + r > canvas.height) {
        y = canvas.height - r;
        vy = -vy;
    }

    if (y - r < 0) {
        y = r;
        vy = -vy;
    }
}

// 描画する
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 画像を描画する
    ctx.drawImage(img, x - r, y - r, r * 2, r * 2);
}

// ゲームループ
function loop(now) {
    const dt = Math.min((now - last) / 1000, 0.033);
    last = now;

    info.textContent =
        "dt：" + dt.toFixed(4) +
        " 秒 ／ 1秒に約 " + (1 / dt).toFixed(0) + " 回";

    update(dt);
    draw();

    requestAnimationFrame(loop);
}

// 画像の読み込みが完了してから開始
img.onload = function () {
    requestAnimationFrame(loop);
};