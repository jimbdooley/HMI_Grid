
HMIG_elementGetBounds["image"] = (e, b) => {
    const image = HMIG_state.drawable_assets[e.drawable_loc]
    const w = e.bxywh[2] != -1 ? e.bxywh[2] : image.width * e.bxywh[3] / image.height
    const h = e.bxywh[3] != -1 ? e.bxywh[3] : image.height * e.bxywh[2] / image.width
    b[0] = Math.min(e.bxywh[0], b[0])
    b[1] = Math.min(e.bxywh[1], b[1])
    b[2] = Math.max(e.bxywh[0] + w, b[2])
    b[3] = Math.max(e.bxywh[1] + h, b[3])
}
HMIG_elementGetBounds["html_image"] = HMIG_elementGetBounds["image"]

HMIG_elementParseFunctions["image"] = (filename, i, e) => {
    HMIG_parseDoDrawFunc(filename, i, e)
}
HMIG_elementParseFunctions["html_image"] = HMIG_elementParseFunctions["image"]



HMIG_elementDraw["image"] = (e, t, ctx, b) => {
    if (!e.func_doDraw(t)) return
    const image = HMIG_state.drawable_assets[e.drawable_loc]
    const w = e.bxywh[2] != -1 ? e.bxywh[2] : image.width * e.bxywh[3] / image.height
    const h = e.bxywh[3] != -1 ? e.bxywh[3] : image.height * e.bxywh[2] / image.width
    ctx.drawImage(image, e.bxywh[0], e.bxywh[1], w, h)
}

HMIG_elementDraw["html_image"] = (e, t, ctx, b) => {
    const id = HMIG_state.projectParameters.screens[HMIG_state.currScreenI]
    const div = document.getElementById(id)
    const qryId = HMIG_getCanvasElementIdSelector(HMIG_state.currScreenI, e.elementI)
    let img = div.querySelector(qryId)
    if (img == null) {
        img = document.createElement("img")
        img.id = qryId.slice(1)
        img.src = "/drawable/" + e.drawable_loc
        img.style.zIndex = e.zOrder
        img.alt = "";
        img.style.position = "absolute"
        img.style.left = e.bxywh[0] + "px"
        img.style.top = e.bxywh[1] + "px"
        div.appendChild(img)
    }
    if (!e.func_doDraw(t)) {
        img.style.display = "none"
    } else {
        img.style.display = "block"
        HMIG_positionAndScaleElement(e, img)
    }
}


