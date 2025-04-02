
function HMIG_loadDidFail(msg) {
    if (msg == "") return false
    document.getElementById("loading_text").textContent = msg
    return true
}

async function HMIG_init() {
    await HMIG_getAllAssets()
    for (const filename in HMIG_state.text_assets) {
        if (filename.length < 6 || filename.length - 5 != filename.indexOf(".json", filename.length - 5)) continue
        try {
            HMIG_state.text_assets[filename] = JSON.parse(HMIG_state.text_assets[filename])
        } catch (e) { 
            return HMIG_loadDidFail("Failed to parse " + filename + ": " + e.message) 
        }
    }
    if (HMIG_loadDidFail(HMIG_verifyLayoutParameters(HMIG_state.layoutParameters))) return
    
    HMIG_state.screen_draw_parameters = HMIG_state.layoutParameters.screens.map(_ => null)
    if (HMIG_state.layoutParameters.includeHMI_ZeroScreen) {
        HMIG_state.layoutParameters.screens.unshift("HMI-Zero")
        HMIG_state.screen_draw_parameters.unshift({name: "HMI-Zero", screenType: "HMI-Zero"})
    }
    for (let i = 0; i < HMIG_state.layoutParameters.screens.length; i++) {
        for (const filename in HMIG_state.text_assets) {
            if (0 != filename.indexOf("system_screens/")) continue
            if (!("name" in HMIG_state.text_assets[filename])) continue
            const screenI = HMIG_state.layoutParameters.screens.indexOf(HMIG_state.text_assets[filename].name)
            if (screenI != i) continue
            HMIG_state.screen_draw_parameters[screenI] = HMIG_state.text_assets[filename]
        }
        if (HMIG_state.screen_draw_parameters[i] == null) {
            return HMIG_loadDidFail("Failed to find system_screen for " + HMIG_state.layoutParameters.screens[i])
        }
    }
    
    const botBarScrollable = document.getElementById("bot_bar_left").getElementsByClassName("bar_scrollable")[0]
    for (let i = 0; i < HMIG_state.layoutParameters.screens.length; i++) {
        const btn = document.createElement("button")
        btn.textContent = HMIG_state.layoutParameters.screens[i]
        btn.classList.add("bot_bar_button")
        btn.addEventListener("click", (e) => HMIG_navButtonPress(e, i))
        botBarScrollable.appendChild(btn)
    }
    const mainBody = document.getElementById("main_body")
    for (let i = 0; i < HMIG_state.layoutParameters.screens.length; i++) {
        const screen = document.createElement("div")
        screen.id = HMIG_state.layoutParameters.screens[i]
        screen.textContent = HMIG_state.layoutParameters.screens[i]
        screen.classList.add("main_screen")
        screen.style.display = i == HMIG_state.currScreenI ? "block" : "none"
        mainBody.appendChild(screen)
    }
    HMIG_initListeners()
    document.getElementById("loading_text").style.display = "none"
    HMIG_layout()
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await HMIG_init()
    } catch (e) {
        HMIG_loadDidFail(e)
    }
})
