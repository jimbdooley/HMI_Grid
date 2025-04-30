
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
    if (HMIG_loadDidFail(HMIG_verifyLayoutParameters(HMIG_state.projectParameters))) return false
    if (HMIG_loadDidFail(HMIG_initTags())) return false
    if (HMIG_loadDidFail(HMIG_initScreens())) return false
    if ("user/user_startup_script.js" in HMIG_state.text_assets) {
        const startupScript = HMIG_state.text_assets["user/user_startup_script.js"]
        try {
            eval(startupScript)
        } catch (e) {
            HMIG_loadDidFail("Failed to run startup script: " + e.message)
            return false
        }
    }

    const botBarScrollable = document.getElementById("bot_bar_left").getElementsByClassName("bar_scrollable")[0]
    for (let i = 0; i < HMIG_state.projectParameters.screens.length; i++) {
        const btn = document.createElement("button")
        btn.textContent = HMIG_state.screen_info[i].name
        btn.classList.add("bot_bar_button")
        btn.addEventListener("click", (e) => HMIG_navButtonPress(e, i))
        botBarScrollable.appendChild(btn)
    }
    HMIG_initListeners()
    document.getElementById("loading_text").style.display = "none"
    HMIG_layout()
    return true
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await HMIG_init()
        if (res) requestAnimationFrame(HMIG_draw)
    } catch (e) {
        HMIG_loadDidFail(e)
        throw e
    }
})
