
function HMIG_coerceToString(v) {
    if (typeof v == "string") {
        return v
    }
    try {
        v = String(v)
    } catch (e) {
        return null
    }
    return v
}

function HMIG_coerceToStringArray(v) {
    if (!Array.isArray(v)) {
        return null
    }
    for (let i = 0; i < v.length; i++) {
        v[i] = HMIG_coerceToString(v[i])
        if (v[i] == null) {
            return null
        }
    }
    return v
}

