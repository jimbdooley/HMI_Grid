
function HMIG_isNarrowWideNumber(ps, name) {
    if (!(name in ps)) {
        return "Parameter '" + name + "' is missing from user_project_parameters.json"
    }
    if (typeof ps[name] != "object") {
        return "Parameter '" + name + "' is not an object in user_project_parameters.json"
    }
    if (!("narrow" in ps[name])) {
        return "Parameter '" + name + "' is missing a 'narrow' property in user_project_parameters.json"
    }
    if (!("wide" in ps[name])) {
        return "Parameter '" + name + "' is missing a 'wide' property in user_project_parameters.json"
    }
    ps[name].narrow = HMIG_coerceToJSNumber(ps[name].narrow)
    if (ps[name].narrow == null) {
        return "Parameter '" + name + "' narrow property is not a number in user_project_parameters.json"
    }
    ps[name].wide = HMIG_coerceToJSNumber(ps[name].wide)
    if (ps[name].wide == null) {
        return "Parameter '" + name + "' wide property is not a number in user_project_parameters.json" 
    }
    return ""
}

function HMIG_verifyLayoutParameters() {
    if (!("user/user_project_parameters.json" in HMIG_state.text_assets)) {
        return "user/user_project_parameters.json is missing from text_assets"
    }
    HMIG_state.projectParameters = HMIG_state.text_assets["user/user_project_parameters.json"]
    const ps = HMIG_state.projectParameters

    if (!("screens" in ps)) { 
        return "Parameter 'screens' is missing from user_project_parameters.json"
    }

    if (!("readOnly" in ps)) {
        return "Parameter 'readOnly' is missing from user_project_parameters.json"
    }
    ps.readOnly = !!ps.readOnly

    if (!("edgeBuffer" in ps)) ps.edgeBuffer = 50
    ps.edgeBuffer = HMIG_coerceToJSNumber(ps.edgeBuffer)
    if (ps.edgeBuffer == null || ps.edgeBuffer < 0) ps.edgeBuffer = 50

    ps.screens = HMIG_coerceToStringArray(ps.screens)
    if (ps.screens == null) {
        return "Parameter 'screens' is not an array of strings in user_project_parameters.json"
    }
    if (-1 != ps.screens.indexOf("hmi_zero.json")) {
        return "Parameter 'screens' contains 'hmi_zero.json' which is reserved for internal use."
    }
    for (let i = 0; i < ps.screens.length - 1; i++) {
        for (let j = i + 1; j < ps.screens.length; j++) {
            if (ps.screens[i] == ps.screens[j]) {
                return "Parameter 'screens' contains duplicate screen names in user_project_parameters.json"
            }
        }
    }
    if (!ps.narrowModeThreshold) {
        return "Parameter 'narrowModeThreshold' is missing from user_project_parameters.json"
    }
    ps.narrowModeThreshold = HMIG_coerceToJSNumber(ps.narrowModeThreshold)
    if (ps.narrowModeThreshold == null) {
        return "Parameter 'narrowModeThreshold' is not a number in user_project_parameters.json"
    }
    if (ps.narrowModeThreshold < 0 || ps.narrowModeThreshold > 2) {
        return "Parameter 'narrowModeThreshold' is not a number between 0 and 2 in user_project_parameters.json"
    }
    
    if ("" != HMIG_isNarrowWideNumber(ps, "navigationBarH")) {
        return HMIG_isNarrowWideNumber(ps, "navigationBarH")
    }
    if ("" != HMIG_isNarrowWideNumber(ps, "topBarH")) {
        return HMIG_isNarrowWideNumber(ps, "topBarH")
    }
    return ""
}