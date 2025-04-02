


function HMIG_layoutBarArrows(_useArrows, w, h, narrowMode, leftId, rightId) {
    const useArrows = _useArrows && narrowMode
    const barRightW = !useArrows ? 0 : Math.round(w * HMIG_state.layoutParameters.navigationBarArrowWR)
    const barLeftW = w - barRightW
    document.getElementById(leftId).style.display = "block"
    document.getElementById(rightId).style.display = narrowMode ? "flex" : "none"
    document.getElementById(leftId).style.width = barLeftW + "px"
    document.getElementById(rightId).style.width = barRightW + "px"
    document.getElementById(leftId).style.height = h + "px"
    document.getElementById(rightId).style.height = h + "px"

    const scrollable = document.getElementById(leftId).getElementsByClassName("bar_scrollable")[0]
    scrollable.style.width = barLeftW + "px"
    scrollable.style.height = h + "px"
    scrollable.style.display = "flex"
    scrollable.style.flexDirection = narrowMode ? "column" : "row"
    scrollable.style.overflowX = "hidden"
    scrollable.style.overflowY = useArrows ? "auto" : "hidden"
    const sliderW = 0

    const rightLeft = document.getElementById(rightId).getElementsByClassName("bar_right_left")[0]
    if (sliderW == 0) rightLeft.style.display = "none"
    rightLeft.style.height = h + "px"
    rightLeft.style.width = sliderW + "px"
    const slider = rightLeft.getElementsByClassName("bar_arrow_slider")[0]
    slider.style.height = sliderW + "px"
    slider.style.width = sliderW + "px"

    const arrowW = barRightW - sliderW
    const arrowH = Math.round(0.5 * h)

    const upArrow = document.getElementById(rightId).getElementsByClassName("bar_up_arrow")[0]
    upArrow.style.width = arrowW + "px"
    upArrow.style.height = arrowH + "px"
    upArrow.style.color = "black"
    upArrow.style.fontSize = Math.round(0.5 * arrowH) + "px"

    const downArrow = document.getElementById(rightId).getElementsByClassName("bar_down_arrow")[0]
    downArrow.style.width = arrowW + "px"
    downArrow.style.height = arrowH + "px"
    downArrow.style.color = "black"
    downArrow.style.fontSize = Math.round(0.5 * arrowH) + "px"

    return barLeftW
}