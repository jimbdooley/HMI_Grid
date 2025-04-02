
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


