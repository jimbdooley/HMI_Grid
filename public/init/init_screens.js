
// returns emptry string if success
// error message otherwies

function HMIG_initScreens() {
    HMIG_state.screen_info = HMIG_state.projectParameters.screens.map(_ => null)
    HMIG_state.screen_scale_dx_dy = HMIG_state.projectParameters.screens.map(_ => [1, 0, 0])
    if (HMIG_state.projectParameters.includeHMI_ZeroScreen) {
        HMIG_state.projectParameters.screens.push("hmi_zero.json")
        HMIG_state.screen_info.push({
            name: HMIG_state.projectParameters.HMI_ZeroScreenName, 
            screenType: "HMI-Zero"
        })
    }
    for (let i = 0; i < HMIG_state.projectParameters.screens.length; i++) {
        if ("hmi_zero.json" != HMIG_state.projectParameters.screens[i]) {
            for (const filename in HMIG_state.text_assets) {
                if (0 != filename.indexOf("user_screens/")) continue
                if (filename != "user_screens/" + HMIG_state.projectParameters.screens[i]) continue
                HMIG_state.screen_info[i] = HMIG_state.text_assets[filename]
                break
            }
            if (HMIG_state.screen_info[i] == null) {
                return HMIG_loadDidFail("Failed to find user_screen for " + HMIG_state.projectParameters.screens[i])
            }
        }
        const screen = document.createElement("div")
        screen.id = HMIG_state.projectParameters.screens[i]
        screen.classList.add("main_screen")
        screen.style.position = "relative"
        screen.style.display = i == HMIG_state.currScreenI ? "block" : "none"
        document.getElementById("main_body").appendChild(screen)
        if (!("screenType" in HMIG_state.screen_info[i]) 
            || typeof HMIG_state.screen_info[i].screenType != "string") {
            return HMIG_loadDidFail("screenType is missing or not a string for " + screen.id)
        }
        if (HMIG_state.screen_info[i].screenType == "canvas") {
            HMIG_initCanvasScreen(i)
            continue
        }
        if (HMIG_state.screen_info[i].screenType == "HMI-Zero") {
            HMIG_initHMIZeroScreen(i)
            continue
        }
        return HMIG_loadDidFail("Unknown screen type for " + screen.id)
    }
    return ""
}

