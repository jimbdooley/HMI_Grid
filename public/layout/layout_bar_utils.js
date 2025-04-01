

function HMIG_layoutBarArrows(w, h, narrowMode, leftId, rightId) {
    const barRightW = !narrowMode ? 0 : Math.round(w * HMIG_layoutParams.navigationBarArrowWR)
    const barLeftW = w - barRightW
    document.getElementById(leftId).style.display = "flex"
    document.getElementById(leftId).style.flexDirection = narrowMode ? "column" : "row"
    document.getElementById(rightId).style.display = narrowMode ? "flex" : "none"
    document.getElementById(leftId).style.width = barLeftW + "px"
    document.getElementById(rightId).style.width = barRightW + "px"
    document.getElementById(leftId).style.height = h + "px"
    document.getElementById(rightId).style.height = h + "px"

    const sliderW = 10

    const rightLeft = document.getElementById(rightId).getElementsByClassName("bar_right_left")[0]
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

}