


function HMIG_layoutBarArrows(isTop, _useArrows, w, h, narrowMode, leftId, rightId) {
    const useArrows = _useArrows && narrowMode
    const barRightW = !useArrows ? 0 : Math.round(w * HMIG_state.projectParameters.navigationBarArrowWR)
    const barLeftW = w - barRightW
    document.getElementById(leftId).style.display = isTop ? "flex" : "block"
    document.getElementById(rightId).style.display = narrowMode ? "flex" : "none"
    document.getElementById(leftId).style.width = barLeftW + "px"
    document.getElementById(rightId).style.width = barRightW + "px"
    document.getElementById(leftId).style.height = h + "px"
    document.getElementById(rightId).style.height = h + "px"

    let logoW = 0
    if (isTop && !narrowMode) {
        const logo = document.getElementById("top_bar_logo")
        let logoH = Math.floor(0.7 * h)
        logoW = logoH * HMIG_state.drawable_assets["logo/logo.png"].width 
        logoW = Math.round(logoW / HMIG_state.drawable_assets["logo/logo.png"].height)
        let logoMarginTop = Math.floor((h - logoH) / 2)
        const originalLogoMarginTop = logoMarginTop
        if (logoW > 0.2 * w) {
            logoH *= 0.2 * w / logoW
            logoW = 0.2 * w
            logoMarginTop = Math.floor((h - logoH) / 2)
        }
        if (logoH < 0.5 * h) {
            logo.style.display = "none"
            logoW = 0
        } else {
            logo.style.display = "block"
            logo.style.width = logoW + "px"
            logo.style.height = logoH + "px"
            logo.style.marginTop = logoMarginTop + "px"
            logo.style.marginLeft = originalLogoMarginTop + "px"
            logo.style.marginRight = originalLogoMarginTop + "px"
            logoW += 2 * logoMarginTop
        }
    } else if (isTop && narrowMode) {
        document.getElementById("top_bar_logo").style.display = "none"
    }

    let readWriteInfoW = 0
    if (isTop) {
        readWriteInfoW = narrowMode ? 50 : 150
        const readOnly = HMIG_state.projectParameters.readOnly
        const readWriteInfo = document.getElementById("top_bar_read_write_info")
        readWriteInfo.style.backgroundColor = readOnly ? "rgb(86, 222, 123)" : "rgb(202, 149, 3)"
        readWriteInfo.style.width = readWriteInfoW + "px"
        readWriteInfo.style.height = h + "px"
        const rwInfoText = document.getElementById("top_bar_read_write_info_text")
        rwInfoText.textContent = readOnly 
            ? (narrowMode ? "R" : "Read Only") 
            : (narrowMode ? "R/W" : "Read/Write")
        const rwInfoTriangle = document.getElementById("top_bar_read_write_info_triangle")
        const subElH = (readOnly ? h : Math.floor(0.5 * h)) + "px"
        rwInfoTriangle.style.display = readOnly ? "none" : "inline-block"
        rwInfoTriangle.style.height = subElH
        rwInfoText.style.height = subElH
        rwInfoText.style.marginTop = !readOnly ? "0px" : Math.round(0.3*h) + "px"
        rwInfoText.style.fontSize = Math.round((narrowMode ? 0.247 : 0.32) * h) + "px"
        rwInfoTriangle.style.fontSize = Math.round((narrowMode ? 0.247 : 0.32) * h) + "px"
    }

    const scrollable = document.getElementById(leftId).getElementsByClassName("bar_scrollable")[0]
    scrollable.style.width = barLeftW - logoW - readWriteInfoW + "px"
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