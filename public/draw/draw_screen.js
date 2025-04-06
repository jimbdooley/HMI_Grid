
const HMIG_drawState = {
}

function HMIG_draw() {
    requestAnimationFrame(HMIG_draw)

    const screenInfo = HMIG_state.screen_info[HMIG_state.currScreenI]
    if (screenInfo.screenType == "canvas") {
        screenInfo.ctx.clearRect(0, 0, screenInfo.canvas.width, screenInfo.canvas.height)
        for (let i = 0; i < screenInfo.elements.length; i++) {
            const element = screenInfo.elements[i]
            HMIG_elementDraw[element.type](element, null, screenInfo.ctx, screenInfo.elements[i].bounds_x0_y0_x1_y1)
        }
    }
}

