
function HMIG_layoutNavigationBar(w, narrowMode) {
    const h = HMIG_state.layoutParameters.navigationBarH[HMIG_state.layoutMode]
    document.getElementById("bot_bar").style.maxHeight = h + "px"
    document.getElementById("bot_bar").style.minHeight = h + "px"
    document.getElementById("bot_bar").style.minWidth = w + "px"
    document.getElementById("bot_bar").style.maxWidth = w + "px"

    document.getElementById("bot_bar").style.display = "flex"
    document.getElementById("bot_bar").style.flexDirection = "row"

    const useArrows = HMIG_state.layoutParameters.screens.length > 2
    const leftW = HMIG_layoutBarArrows(useArrows, w, h, narrowMode, "bot_bar_left", "bot_bar_right")

    const botBarLeft = document.getElementById("bot_bar_left")
    const botBarScrollable = botBarLeft.getElementsByClassName("bar_scrollable")[0]
    const buttons = botBarScrollable.getElementsByClassName("bot_bar_button")
    for (let i = 0; i < HMIG_state.layoutParameters.screens.length; i++) {
        const btn = buttons[i]
        btn.style.userSelect = "none"
        btn.style.width = narrowMode ? "100%" : leftW - 6 + "px"
        btn.style.height = narrowMode ? Math.floor(0.5 * h) - 4 + "px" : h - 8 + "px"
        btn.style.minHeight = narrowMode ? Math.floor(0.5 * h) - 4 + "px" : h - 8 + "px"
        btn.style.maxHeight = narrowMode ? Math.floor(0.5 * h) - 4 + "px" : h - 8 + "px"
        btn.style.display = "flex"
        btn.style.fontSize = narrowMode ? Math.round(0.25* h) + "px" : Math.round(0.315* h) + "px"
        btn.style.justifyContent = "center"
        btn.style.alignItems = "center"
        btn.style.paddingLeft = narrowMode ? "3%" : "0%"
        btn.style.paddingRight = narrowMode ? "3%" : "0%"
        btn.style.marginLeft = narrowMode ? "0%" : "2px"
        btn.style.marginRight = narrowMode ? "0%" : "2px"
        btn.style.marginTop = narrowMode ? "1px" : "4px" // narrowMode ? (i == 0 ? "4px" : "0px") : "2px"
        btn.style.marginBottom = narrowMode ? "3px" : "4px"
    }
    
    HMIG_styleNavBarButtons()
}
