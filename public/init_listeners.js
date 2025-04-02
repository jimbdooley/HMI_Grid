
function HMIG_initListeners() {
    const navBarUp = document.getElementById("bot_bar_up_arrow")
    const navBarDown = document.getElementById("bot_bar_down_arrow")
    navBarUp.addEventListener("click", (e) => HMIG_navArrowPress(e, 1))
    navBarDown.addEventListener("click", (e) => HMIG_navArrowPress(e, -1))


    const botBarLeft = document.getElementById("bot_bar_left")
    const botBarScrollable = botBarLeft.getElementsByClassName("bar_scrollable")[0]
    botBarScrollable.addEventListener("scroll", HMIG_navigationScrollDetected);
}
