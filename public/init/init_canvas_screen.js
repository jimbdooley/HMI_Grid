
function HMIG_initCanvasScreen(screenI) {
    const screenInfo = HMIG_state.screen_info[screenI]
    const screenDiv = document.getElementById(HMIG_state.projectParameters.screens[screenI])
    HMIG_state.screen_info[screenI]["canvas"] = document.createElement("canvas")
    HMIG_state.screen_info[screenI]["ctx"] = HMIG_state.screen_info[screenI]["canvas"].getContext("2d")
    HMIG_state.screen_info[screenI]["canvas"].style.backgroundColor = "white"
    screenDiv.appendChild(HMIG_state.screen_info[screenI]["canvas"])
    screenInfo.bounds = [99999, 99999, 0, 0]
    for (let i = 0; i < screenInfo.elements.length; i++) {
        const element = screenInfo.elements[i]
        if (!("zOrder" in element)) { element.zOrder = 0 }
        if (typeof element.zOrder == "string") {
            element.zOrder = Number(element.zOrder)
            if (isNaN(element.zOrder)) element.zOrder = 0
        }
        if (typeof element.zOrder != "number") {
            element.zOrder = 0
        }
        HMIG_elementGetBounds[element.type](element, screenInfo.bounds)
        HMIG_elementParseFunctions[element.type](HMIG_state.projectParameters.screens[screenI], i, element)
        
    }
    for (let i = screenInfo.elements.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (screenInfo.elements[j].zOrder > screenInfo.elements[i].zOrder) {
                const temp = screenInfo.elements[j]
                screenInfo.elements[j] = screenInfo.elements[i]
                screenInfo.elements[i] = temp
            }
        }
    }
    const w = Math.max(10, screenInfo.bounds[2] + HMIG_state.projectParameters.edgeBuffer)
    const h = Math.max(10, screenInfo.bounds[3] + HMIG_state.projectParameters.edgeBuffer)
    HMIG_state.screen_info[screenI]["canvas"].width = w
    HMIG_state.screen_info[screenI]["canvas"].height = h
}