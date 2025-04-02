
const HMIG_drawState = {
    lastDrawTime: 0,
}

function HMIG_draw() {
    requestAnimationFrame(HMIG_draw)
    const now = Date.now()
    if (175 > now - HMIG_drawState.lastDrawTime) return
    HMIG_drawState.lastDrawTime = now

    const screenInfo = HMIG_state.screen_info[HMIG_state.currScreenI]
    if (screenInfo.screenType == "canvas") {
        screenInfo.ctx.clearRect(0, 0, screenInfo.canvas.width, screenInfo.canvas.height)
        for (let i = 0; i < screenInfo.elements.length; i++) {
            const element = screenInfo.elements[i]
            screenInfo.ctx.fillRect(i*20, i*20, 20, 20)
            HMIG_elementDraw[element.type](element, now, screenInfo.ctx, screenInfo.bounds)
        }
    }
}

