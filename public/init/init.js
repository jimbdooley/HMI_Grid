
function HMIG_loadDidFail(msg) {
    if (msg == "") return false
    document.getElementById("loading_text").textContent = msg
    return true
}

const getdemo_id = (() => {
    const demo_idLocalStorageKey = "demo_idLocalStorageKey"
    const demo_idChars = "abcdefghijklmnopqrstuvwxyz0123456789"
    return function() {
        const demo_id_idx = window.location.href.indexOf("demo_id=")
        if (-1 != demo_id_idx) {
            const idChars = []
            for (let i = 8 + demo_id_idx; i < window.location.href.length; i++) {
                if (-1 == demo_idChars.indexOf(window.location.href[i])) break;
                idChars.push(window.location.href[i])
            }
            const idString = idChars.join("")
            localStorage.setItem(demo_idLocalStorageKey, idString);
            return idString
        } else if (localStorage.getItem(demo_idLocalStorageKey) !== null) {
            return localStorage.getItem(demo_idLocalStorageKey)
        } else {
            return null
        }
    }
})();


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
    HMIG_state.demo_id = getdemo_id()
    if (HMIG_state.demo_id == null) console.warn("unknown demo_id")
    if (HMIG_loadDidFail(HMIG_verifyLayoutParameters(HMIG_state.projectParameters))) return false
    if (HMIG_loadDidFail(HMIG_initTags())) return false
    if (HMIG_loadDidFail(HMIG_initScreens())) return false
    if (HMIG_loadDidFail(HMIG_initCommands())) return false
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
