
function HMIG_coerceToJSNumber(v) {
    if (typeof v == "number") {
        return v
    }
    if (typeof v == "string") {
        v = Number(v)
        if (isNaN(v)) {
            return null
        }
        return v
    }
    return null
}
