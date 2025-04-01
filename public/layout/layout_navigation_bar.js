
function HMIG_layoutNavigationBar(w, narrowMode) {
    const h = HMIG_layoutParams.navigationBarH[HMIG_state.layoutMode]
    document.getElementById("bot_bar").style.maxHeight = h + "px"
    document.getElementById("bot_bar").style.minHeight = h + "px"
    document.getElementById("bot_bar").style.minWidth = w + "px"
    document.getElementById("bot_bar").style.maxWidth = w + "px"

    document.getElementById("bot_bar").style.display = "flex"
    document.getElementById("bot_bar").style.flexDirection = "row"

    HMIG_layoutBarArrows(w, h, narrowMode, "bot_bar_left", "bot_bar_right")
}
