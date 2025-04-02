
function HMIG_isNarrowWideNumber(ps, name) {
    if (!(name in ps)) {
        return "Parameter '" + name + "' is missing from system_layout_parameters.json"
    }
    if (typeof ps[name] != "object") {
        return "Parameter '" + name + "' is not an object in system_layout_parameters.json"
    }
    if (!("narrow" in ps[name])) {
        return "Parameter '" + name + "' is missing a 'narrow' property in system_layout_parameters.json"
    }
    if (!("wide" in ps[name])) {
        return "Parameter '" + name + "' is missing a 'wide' property in system_layout_parameters.json"
    }
    ps[name].narrow = HMIG_coerceToJSNumber(ps[name].narrow)
    if (ps[name].narrow == null) {
        return "Parameter '" + name + "' narrow property is not a number in system_layout_parameters.json"
    }
    ps[name].wide = HMIG_coerceToJSNumber(ps[name].wide)
    if (ps[name].wide == null) {
        return "Parameter '" + name + "' wide property is not a number in system_layout_parameters.json" 
    }
    return ""
}

function HMIG_verifyLayoutParameters() {
    if (!("system/system_layout_parameters.json" in HMIG_state.text_assets)) {
        return "system/system_layout_parameters.json is missing from text_assets"
    }
    HMIG_state.layoutParameters = HMIG_state.text_assets["system/system_layout_parameters.json"]
    const ps = HMIG_state.layoutParameters

    if (!("screens" in ps)) { 
        return "Parameter 'screens' is missing from system_layout_parameters.json"
    }

    if (!("edgeBuffer" in ps)) ps.edgeBuffer = 50
    ps.edgeBuffer = HMIG_coerceToJSNumber(ps.edgeBuffer)
    if (ps.edgeBuffer == null || ps.edgeBuffer < 0) ps.edgeBuffer = 50

    ps.screens = HMIG_coerceToStringArray(ps.screens)
    if (ps.screens == null) {
        return "Parameter 'screens' is not an array of strings in system_layout_parameters.json"
    }
    if (-1 != ps.screens.indexOf("HMI-Zero")) {
        return "Parameter 'screens' contains 'HMI-Zero' which is reserved for internal use."
    }
    for (let i = 0; i < ps.screens.length - 1; i++) {
        for (let j = i + 1; j < ps.screens.length; j++) {
            if (ps.screens[i] == ps.screens[j]) {
                return "Parameter 'screens' contains duplicate screen names in system_layout_parameters.json"
            }
        }
    }
    if (!ps.narrowModeThreshold) {
        return "Parameter 'narrowModeThreshold' is missing from system_layout_parameters.json"
    }
    ps.narrowModeThreshold = HMIG_coerceToJSNumber(ps.narrowModeThreshold)
    if (ps.narrowModeThreshold == null) {
        return "Parameter 'narrowModeThreshold' is not a number in system_layout_parameters.json"
    }
    if (ps.narrowModeThreshold < 0 || ps.narrowModeThreshold > 2) {
        return "Parameter 'narrowModeThreshold' is not a number between 0 and 2 in system_layout_parameters.json"
    }
    
    if ("" != HMIG_isNarrowWideNumber(ps, "navigationBarH")) {
        return HMIG_isNarrowWideNumber(ps, "navigationBarH")
    }
    if ("" != HMIG_isNarrowWideNumber(ps, "topBarH")) {
        return HMIG_isNarrowWideNumber(ps, "topBarH")
    }
    return ""
}