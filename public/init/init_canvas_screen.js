
function HMIG_initCanvasScreen(screenI) {
    const screenInfo = HMIG_state.screen_info[screenI]
    const screenDiv = document.getElementById(HMIG_state.projectParameters.screens[screenI])
    HMIG_state.screen_info[screenI]["canvas"] = document.createElement("canvas")
    HMIG_state.screen_info[screenI]["ctx"] = HMIG_state.screen_info[screenI]["canvas"].getContext("2d")
    HMIG_state.screen_info[screenI]["ctx"].imageSmoothingEnabled = true
    //HMIG_state.screen_info[screenI]["canvas"].style.backgroundColor = "white"
    screenDiv.appendChild(HMIG_state.screen_info[screenI]["canvas"])
    screenInfo.bounds = [99999, 99999, 0, 0]
    for (let i = 0; i < screenInfo.elements.length; i++) {
        const element = screenInfo.elements[i]
        element.elementI = i
        element.lastPosScale = [-1, -1, -1, -1]
        if (!("zOrder" in element)) { element.zOrder = 0 }
        if (typeof element.zOrder == "string") {
            element.zOrder = Number(element.zOrder)
            if (isNaN(element.zOrder)) element.zOrder = 0
        }
        if (typeof element.zOrder != "number") {
            element.zOrder = 0
        }
        HMIG_elementGetBounds[element.type](element, screenInfo.bounds)
        HMIG_elementParseFunctions[element.type](screenDiv, i, element)
        if (element.type == "image" || element.type == "html_image") {
            const img = HMIG_state.drawable_assets[element.drawable_loc]
            if (element.bxywh[2] == -1 && element.bxywh[3] == -1) {
                element.bxywh[2] = img.width
                element.bxywh[3] = img.height
            } else if (element.bxywh[2] == -1) {
                element.bxywh[2] = img.width * element.bxywh[3] / img.height
            } else if (element.bxywh[3] == -1) {
                element.bxywh[3] = img.height * element.bxywh[2] / img.width
            }
            element.bxy01 = [
                element.bxywh[0],
                element.bxywh[1],
                element.bxywh[0] + element.bxywh[2],
                element.bxywh[1] + element.bxywh[3]
            ]
        }
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