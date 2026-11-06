const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");

let x = 100;
let y = 80;
let vx = 180;
let vy = 140;
const r = 14;
let last = performance.now();

// キーボード入力
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    vx = vx * 1.2;
    vy = vy * 1.2;
  }

  if (e.code === "ArrowDown") {
    vx = vx * 0.8;
    vy = vy * 0.8;
  }

  if (e.code === "ArrowRight") {
    vx = Math.abs(vx);
  }

  if (e.code === "ArrowLeft") {
    vx = -Math.abs(vx);
  }
});

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

  // 下の壁に当たったとき
  if (y + r > canvas.height) {
    y = canvas.height - r;
    vy = -vy;

    // 速度を20%減らす
    vx = vx * 0.8;
    vy = vy * 0.8;
  }

  // 上の壁
  if (y - r < 0) {
    y = r;
    vy = -vy;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function loop(now) {
  const dt = (now - last) / 1000;
  last = now;

  info.textContent =
    "dt：" + dt.toFixed(4) +
    " 秒 ／ 1秒に約 " + (1 / dt).toFixed(0) + " 回";

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);