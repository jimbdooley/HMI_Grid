
function HMIG_styleNavBarButtons() {
    const botBarLeft = document.getElementById("bot_bar_left")
    const botBarScrollable = botBarLeft.getElementsByClassName("bar_scrollable")[0]
    const buttons = botBarScrollable.getElementsByClassName("bot_bar_button")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.boxShadow = i == HMIG_state.currScreenI 
        ? "inset -3px 5px 6px rgba(0, 0, 0, 0.53)" 
        : "inset 1px -2px 4px rgba(0, 0, 0, 0.53)"
        buttons[i].style.backgroundColor = i != HMIG_state.currScreenI  ? "white" : "#adf"
        buttons[i].style.cursor = i == HMIG_state.currScreenI ? "default" : "pointer"
        buttons[i].style.textDecoration = i != HMIG_state.currScreenI ? "none" : "underline"
    }
    for (let i = 0; i < HMIG_state.layoutParameters.screens.length; i++) {
        const screen = document.getElementById(HMIG_state.layoutParameters.screens[i])
        screen.style.display = i == HMIG_state.currScreenI ? "block" : "none"
    }
}

function HMIG_navButtonPress(e, i) {
    if (i == HMIG_state.currScreenI) return
    HMIG_state.currScreenI = i
    HMIG_styleNavBarButtons()
}

const HMIG_navArrowState = {
    targetScrollIndex: 0,
    targetScrollRatio: 0,
}

function HMIG_navigationScrollDetected(e) {
    const botBarLeft = document.getElementById("bot_bar_left")
    const botBarScrollable = botBarLeft.getElementsByClassName("bar_scrollable")[0]
    const maxScroll = botBarScrollable.scrollHeight - botBarScrollable.clientHeight;
    if (maxScroll <= 10) return
    const scrollRatio = botBarScrollable.scrollTop / maxScroll;
    const index = Math.round(scrollRatio * (HMIG_state.layoutParameters.screens.length - 2))
    HMIG_navArrowState.targetScrollIndex = index
    HMIG_navArrowState.targetScrollRatio = index / (HMIG_state.layoutParameters.screens.length - 2)
}

function HMIG_navArrowPress(e, dir) {
    HMIG_navArrowState.targetScrollIndex -= dir
    const maxIdx = HMIG_state.layoutParameters.screens.length - 2
    HMIG_navArrowState.targetScrollIndex = Math.min(maxIdx, HMIG_navArrowState.targetScrollIndex)
    HMIG_navArrowState.targetScrollIndex = Math.max(0, HMIG_navArrowState.targetScrollIndex)
    HMIG_navArrowState.targetScrollRatio = HMIG_navArrowState.targetScrollIndex / maxIdx
    const scrollable = document.getElementById("bot_bar_scrollable")
    const maxScroll = scrollable.scrollHeight - scrollable.clientHeight;
    scrollable.scrollTo({
        top: maxScroll * HMIG_navArrowState.targetScrollRatio,
        behavior: "smooth"
    })
}

