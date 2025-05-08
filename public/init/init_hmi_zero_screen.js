

function HMIG_initHMIZeroScreen(screenI) {
    const screenInfo = HMIG_state.screen_info[screenI]
    const screenDiv = document.getElementById(HMIG_state.projectParameters.screens[screenI])
    const body = document.createElement("div")
    body.classList.add("hmi_zero_screen_body")
    body.style.backgroundColor = "white"

    screenDiv.appendChild(body)
}
