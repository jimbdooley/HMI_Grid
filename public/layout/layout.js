
function HMIG_layout() {
    const windowWidth = document.body.clientWidth
    const windowHeight = document.body.clientHeight
    const narrowMode = windowWidth / windowHeight < HMIG_state.projectParameters.narrowModeThreshold
    HMIG_state.layoutMode = narrowMode ? "narrow" : "wide"

    HMIG_layoutNavigationBar(windowWidth, narrowMode)
    HMIG_layoutTopBar(windowWidth, narrowMode)


    let bodyH = windowHeight
    bodyH -= HMIG_state.projectParameters.topBarH[HMIG_state.layoutMode] 
    bodyH -= HMIG_state.projectParameters.navigationBarH[HMIG_state.layoutMode]
    document.getElementById("main_body").style.height = bodyH + "px"
    document.getElementById("main_body").style.width = windowWidth + "px"
    document.getElementById("main_body").style.display = "block"

    for (let i = 0; i < HMIG_state.screen_info.length; i++) {
        const parentDiv = document.getElementById(HMIG_state.projectParameters.screens[i])
        parentDiv.style.width = windowWidth + "px"
        parentDiv.style.height = bodyH + "px"
        if (HMIG_state.screen_info[i].screenType == "canvas") {
            parentDiv.style.overflowY = "hidden"
            parentDiv.style.overflowX = "hidden"
            const canvas = HMIG_state.screen_info[i].canvas
            if (canvas.width <= windowWidth && canvas.height <= bodyH) {
                const sx = Math.round(0.5 * (canvas.width + windowWidth)) / canvas.width
                const sy = Math.round(0.5 * (canvas.height + bodyH)) / canvas.height
                HMIG_state.screen_scale_dx_dy[i][0] = Math.min(sx, sy)
                const styleWidth = Math.round(canvas.width * HMIG_state.screen_scale_dx_dy[i][0])
                const styleHeight = Math.round(canvas.height * HMIG_state.screen_scale_dx_dy[i][0])
                canvas.style.width = styleWidth + "px"
                canvas.style.height = styleHeight + "px"
                HMIG_state.screen_scale_dx_dy[i][1] = Math.round(0.5 * (windowWidth - styleWidth))
                HMIG_state.screen_scale_dx_dy[i][2] = Math.round(0.5 * (bodyH - styleHeight))
                canvas.style.marginLeft = HMIG_state.screen_scale_dx_dy[i][1] + "px"
                canvas.style.marginTop = HMIG_state.screen_scale_dx_dy[i][2] + "px"
            } 
            else if (narrowMode && (canvas.width / canvas.height > 1.4 * windowWidth / bodyH)) {
                parentDiv.style.overflowX = "auto"
                HMIG_state.screen_scale_dx_dy[i][0]  = canvas.height > bodyH
                    ? 0.975 * bodyH / canvas.height
                    : Math.round(0.5 * (canvas.height + 0.975*bodyH)) / canvas.height
                const styleWidth = Math.round(canvas.width * HMIG_state.screen_scale_dx_dy[i][0])
                const styleHeight = Math.round(canvas.height * HMIG_state.screen_scale_dx_dy[i][0])
                canvas.style.width = styleWidth + "px"
                canvas.style.height = styleHeight + "px"
                HMIG_state.screen_scale_dx_dy[i][1] = 0
                HMIG_state.screen_scale_dx_dy[i][2] = canvas.height > 0.85*bodyH ? 0 : Math.round(0.5 * (bodyH - styleHeight))
                canvas.style.marginLeft = HMIG_state.screen_scale_dx_dy[i][1] + "px"
                canvas.style.marginTop = HMIG_state.screen_scale_dx_dy[i][2] + "px"
            }
            else { // either too wide or too tall
                const canvasWider = canvas.width / canvas.height > windowWidth / bodyH
                HMIG_state.screen_scale_dx_dy[i][1] = 0
                HMIG_state.screen_scale_dx_dy[i][2] = 0
                let styleWidth = canvas.width
                let styleHeight = canvas.height
                if (canvasWider) {
                    HMIG_state.screen_scale_dx_dy[i][0] = windowWidth / canvas.width
                    styleWidth = Math.round(canvas.width * HMIG_state.screen_scale_dx_dy[i][0])
                    styleHeight = Math.round(canvas.height * HMIG_state.screen_scale_dx_dy[i][0])
                    HMIG_state.screen_scale_dx_dy[i][2] = Math.round(0.5 * (bodyH - styleHeight))
                } else {
                    HMIG_state.screen_scale_dx_dy[i][0] = bodyH / canvas.height
                    styleWidth = Math.round(canvas.width * HMIG_state.screen_scale_dx_dy[i][0])
                    styleHeight = Math.round(canvas.height * HMIG_state.screen_scale_dx_dy[i][0])
                    HMIG_state.screen_scale_dx_dy[i][1] = Math.round(0.5 * (windowWidth - styleWidth)) 
                }
                canvas.style.width = styleWidth + "px"
                canvas.style.height = styleHeight + "px"
                canvas.style.marginLeft = HMIG_state.screen_scale_dx_dy[i][1] + "px"
                canvas.style.marginTop = HMIG_state.screen_scale_dx_dy[i][2] + "px"
            }
            if (i == 0) {
                console.log(canvas.width, canvas.height)
            }
        } else if (HMIG_state.screen_info[i].screenType == "HMI-Zero") {
            const body = parentDiv.getElementsByClassName("hmi_zero_screen_body")[0]
            const w = Math.min(600, 0.95 * windowWidth)
            const h = Math.round(0.96 * bodyH)
            const top = Math.round(0.5 * (bodyH - h))
            const left = Math.round(0.5 * (windowWidth - w))
            console.log(w, h, top, left)
            body.style.width = w + "px"
            body.style.height = h + "px"
            body.style.marginTop = top + "px"
            body.style.marginLeft = left + "px"
        }
    }
}

const HMIG_resizeState = {
    timeout: null,
}

function HMIG_resizeStateLayout() {
    HMIG_layout()
    HMIG_resizeState.timeout = null
}

window.addEventListener("resize", () => {
    if (HMIG_resizeState.timeout != null) {
        clearTimeout(HMIG_resizeState.timeout)
    }
    HMIG_resizeState.timeout = setTimeout(HMIG_resizeStateLayout, 200)
})
