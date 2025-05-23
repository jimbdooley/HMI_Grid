
function HMIG_parseColorFunc(filename, i, e) {
    if (!("color" in e) || typeof e.color !== "string") {
        HMIG_state.startUpLog.push([0, `path element ${i} in ${filename} has no string value for "color", using default.`])
        e.func_getColor = HMIG_defaultGetColor
    } else {
        try {
            const func = new Function("t", e.color)
            e.func_getColor = func
        } catch (err) {
            HMIG_state.startUpLog.push([10, `path element ${i} in ${filename} has an invalid color function: ${e.color}, using default.`])
            e.func_getColor = HMIG_defaultGetColor
        }
    }
}

function HMIG_parseWidthFunc(filename, i, e) {
    if (!("width" in e) || typeof e.width !== "string") {
        HMIG_state.startUpLog.push([0, `path element ${i} in ${filename} has no number value for "width", using default.`])
        e.func_getLineWidth = HMIG_defaultGetLineWidth
    } else {
        try {
            const func = new Function("t", e.width)
            e.func_getLineWidth = func
        } catch (err) {
            HMIG_state.startUpLog.push([10, `path element ${i} in ${filename} has an invalid width function: ${e.width}, using default.`])
            e.func_getLineWidth = HMIG_defaultGetLineWidth
        }
    }
}

function HMIG_parseDoDrawFunc(filename, i, e) {
    if (!("doDraw" in e) || typeof e.doDraw !== "string") {
        HMIG_state.startUpLog.push([0, `path element ${i} in ${filename} has no function value for "doDraw", using default.`])
        e.func_doDraw = HMIG_defaultDoDraw
    } else {
        try {
            const func = new Function("t", e.doDraw)
            e.func_doDraw = func
        } catch (err) {
            HMIG_state.startUpLog.push([10, `path element ${i} in ${filename} has an invalid doDraw function: ${e.doDraw}, using default.`])
            e.func_doDraw = HMIG_defaultDoDraw
        }
    }
}