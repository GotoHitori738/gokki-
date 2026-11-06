const canvas = document.getElementById("stage");   // 紙（canvas）を取り出す
const ctx = canvas.getContext("2d");                // 描く道具（コンテキスト）を取り出す

ctx.fillStyle = "#7aa2ff";        // 塗る色
ctx.fillRect(40, 300, 40, 40);     // 四角を塗る（x, y, 幅, 高さ）