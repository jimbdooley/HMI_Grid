
function HMIG_layout() {
    const windowWidth = document.body.clientWidth
    const windowHeight = document.body.clientHeight
    const narrowMode = windowWidth / windowHeight < HMIG_layoutParams.narrowModeThreshold
    HMIG_state.layoutMode = narrowMode ? "narrow" : "wide"

    HMIG_layoutNavigationBar(windowWidth, narrowMode)
    HMIG_layoutTopBar(windowWidth, narrowMode)

    let bodyH = windowHeight
    bodyH -= HMIG_layoutParams.topBarH[HMIG_state.layoutMode] 
    bodyH -= HMIG_layoutParams.navigationBarH[HMIG_state.layoutMode]
    document.getElementById("main_body").style.height = bodyH + "px"
    document.getElementById("main_body").style.width = windowWidth + "px"
    document.getElementById("main_body").style.display = "block"
}
