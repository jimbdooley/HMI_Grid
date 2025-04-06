
HMIG_elementGetBounds["user_draw_function"] = (e, b) => {
    b[0] = Math.min(e.bounds_x0_y0_x1_y1[0], b[0])
    b[1] = Math.min(e.bounds_x0_y0_x1_y1[1], b[1])
    b[2] = Math.max(e.bounds_x0_y0_x1_y1[2], b[2])
    b[3] = Math.max(e.bounds_x0_y0_x1_y1[3], b[3])
}

HMIG_elementDraw["user_draw_function"] = (e, t, ctx, b) => {
    if (!e.func_doDraw(t)) return
    e.draw_function(t, ctx, b)
}

HMIG_elementParseFunctions["user_draw_function"] = (filename, i, e) => {
    HMIG_parseDoDrawFunc(filename, i, e)
    if ("function_body" in e && typeof e.function_body == "string") {
        e.draw_function = new Function("t","ctx", "b", e.function_body)
        return
    }
    if ("function_body_filename" in e && typeof e.function_body_filename == "string") {
        const asset_path = "user_draw_functions/" + e.function_body_filename
        if (asset_path in HMIG_state.text_assets) {
            e.draw_function = new Function("t", "ctx", "b", HMIG_state.text_assets[asset_path])
            return
        }
    }
    HMIG_state.startUpLog.push([0, `Error parsing function in file ${filename}, element index ${i}, using default draw function.`])
    e.draw_function = HMIG_defaultUserFunc
}
