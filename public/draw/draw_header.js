
const HMIG_elementParseFunctions = {}
const HMIG_elementGetBounds = {}
const HMIG_elementDraw = {}

function HMIG_defaultGetColor(t) {
    return "black"
}

function HMIG_defaultGetLineWidth(t) {
    return 3
}

function HMIG_defaultDoDraw(t) {
    return true
}

function HMIG_defaultUserFunc(t, ctx, b) {
    ctx.strokeStyle = "black"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.rect(b[0], b[1], b[2]-b[0], b[3]-b[1])
    ctx.stroke()
}

function HMIG_positionAndScaleElement(elementInfo, element) {
    const scale_dx_dy = HMIG_state.screen_scale_dx_dy[HMIG_state.currScreenI]
    const sx = (elementInfo.bxy01[2] - elementInfo.bxy01[0]) * scale_dx_dy[0]
    const sy = (elementInfo.bxy01[3] - elementInfo.bxy01[1]) * scale_dx_dy[0]
    const dx = scale_dx_dy[1]
    const dy = scale_dx_dy[2]
    if (sx == elementInfo.lastPosScale[0] 
        && sy == elementInfo.lastPosScale[1]
        && dx == elementInfo.lastPosScale[2]
        && dy == elementInfo.lastPosScale[3]
    ) {
        return 
    }
    elementInfo.lastPosScale[0] = sx
    elementInfo.lastPosScale[1] = sy
    elementInfo.lastPosScale[2] = dx
    elementInfo.lastPosScale[3] = dy
    element.style.width = sx + "px"
    element.style.height = sy + "px"
    element.style.left = dx + "px"
    element.style.top = dy + "px"
}

const HMIG_getCanvasElementIdSelector = (() => {
    const cache = []
    const allowedIdChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_"
    return function(screenI, elI) {
        for (let i = 0; i < cache.length; i++) {
            if (cache[i][0] != screenI) continue
            if (cache[i][1] != elI) continue
            return cache[i][2]
        }
        const _id = "canvas_element_" + screenI + "_" + elI
        const idChars = []
        for (let i = 0; i < _id.length; i++) {
            if (-1 == allowedIdChars.indexOf(_id[i])) continue;
            idChars.push(_id[i])
        }
        const id = idChars.join("")
        cache.push([screenI, elI, `#${id}`])
        return cache[cache.length - 1][2]
    }
})();
