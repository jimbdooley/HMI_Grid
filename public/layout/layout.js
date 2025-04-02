
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
}

window.addEventListener("resize", () => {
    HMIG_layout()
})