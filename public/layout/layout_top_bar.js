

function HMIG_layoutTopBar(w, narrowMode) {
    const h = HMIG_layoutParams.topBarH[HMIG_state.layoutMode]
    document.getElementById("top_bar").style.maxHeight = h + "px"
    document.getElementById("top_bar").style.minHeight = h + "px"
    document.getElementById("top_bar").style.minWidth = w + "px"
    document.getElementById("top_bar").style.maxWidth = w + "px"

    document.getElementById("top_bar").style.display = "flex"
    document.getElementById("top_bar").style.flexDirection = "row"
    document.getElementById("top_bar_left").style.display = "flex"
    HMIG_layoutBarArrows(w, h, narrowMode, "top_bar_left", "top_bar_right")
}
