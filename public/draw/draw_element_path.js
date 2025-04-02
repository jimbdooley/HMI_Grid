
HMIG_elementGetBounds["path"] = (e, b) => {
    for (let i = 0; i < e.path.length; i++) {
        if (e.path[i][0] == "arc") {
            const startTh = e.path[i][4]
            const endTh = e.path[i][5]
            for (let j = 0; j < 100; j++) {
                const th = startTh + (endTh - startTh) * j / 100
                const x = e.path[i][1] + e.path[i][2] * Math.cos(th)
                const y = e.path[i][1] + e.path[i][2] * Math.sin(th)
                b[0] = Math.min(b[0], x)
                b[2] = Math.max(b[2], x)
                b[1] = Math.min(b[1], y)
                b[3] = Math.max(b[3], y)
            }
        }
        if (e.path[i][0] == "moveTo" || e.path[i][0] == "lineTo") {
            b[0] = Math.min(e.path[i][1], b[0])
            b[2] = Math.max(e.path[i][1], b[2])
            b[1] = Math.min(e.path[i][2], b[1])
            b[3] = Math.max(e.path[i][2], b[3])
        }
    }
}

HMIG_elementDraw["path"] = (e, t, ctx, b) => {
    if (!e.func_doDraw(t)) return
    ctx.strokeStyle = e.func_getColor(t)
    ctx.lineWidth = e.func_getLineWidth(t)
    ctx.beginPath()
    for (let i = 0; i < e.path.length; i++) {
        if (e.path[i][0] == "arc") {
            ctx.arc(e.path[i][1], e.path[i][2], e.path[i][3], e.path[i][4], e.path[i][5])
        }
        if (e.path[i][0] == "moveTo") {
            ctx.moveTo(e.path[i][1], e.path[i][2])
        }
        if (e.path[i][0] == "lineTo") {
            ctx.lineTo(e.path[i][1], e.path[i][2])
        }
    }
    ctx.stroke()
}

HMIG_elementParseFunctions["path"] = (filename, i, e) => {
    HMIG_parseColorFunc(filename, i, e)
    HMIG_parseWidthFunc(filename, i, e)
    HMIG_parseDoDrawFunc(filename, i, e)
}
