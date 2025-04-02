
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
}
