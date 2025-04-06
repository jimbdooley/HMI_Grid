
HMIG_elementGetBounds["image"] = (e, b) => {
    const image = HMIG_state.drawable_assets[e.drawable_loc]
    const w = e.xywh[2] != -1 ? e.xywh[2] : image.width * e.xywh[3] / image.height
    const h = e.xywh[3] != -1 ? e.xywh[3] : image.height * e.xywh[2] / image.width
    b[0] = Math.min(e.xywh[0], b[0])
    b[1] = Math.min(e.xywh[1], b[1])
    b[2] = Math.max(e.xywh[0] + w, b[2])
    b[3] = Math.max(e.xywh[1] + h, b[3])
}

HMIG_elementDraw["image"] = (e, t, ctx, b) => {
    if (!e.func_doDraw(t)) return
    const image = HMIG_state.drawable_assets[e.drawable_loc]
    const w = e.xywh[2] != -1 ? e.xywh[2] : image.width * e.xywh[3] / image.height
    const h = e.xywh[3] != -1 ? e.xywh[3] : image.height * e.xywh[2] / image.width
    ctx.drawImage(image, e.xywh[0], e.xywh[1], w, h)
}

HMIG_elementParseFunctions["image"] = (filename, i, e) => {
    HMIG_parseDoDrawFunc(filename, i, e)
}