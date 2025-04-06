// arguments (t, ctx, b)

const color = Date.now() % 2000 < 1000 ? "red" : "yellow"

ctx.fillStyle = color
ctx.fillRect(b[0], b[1], b[2]-b[0], b[3]-b[1])
