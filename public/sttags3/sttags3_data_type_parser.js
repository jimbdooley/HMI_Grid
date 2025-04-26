

function STTags3_intParser(str, mn, mx) {
    if (str == undefined || str == null || !str || typeof str != "string") return null
    if (str.length == 0) return null
    if (mn < 0 && str[0] == "-") {
        const posRes = STTags3_intParser(str.slice(1), 0, -mn)
        return posRes == null ? null : -posRes
    }
    for (let i = 0; i < str.length; i++) {
        if (STTags3_digits.indexOf(str[i]) == -1) return null
    }
    const num = parseInt(str)
    if (num < mn || num > mx) return null
    return num
}


const STTags3_dataTypeParser = {
    int(str) { return STTags3_intParser(str, -32768, 32767) },
    sint(str) { return STTags3_intParser(str, -128, 127) },
    dint(str) { return STTags3_intParser(str, -2147483648, 2147483647) },
    uint(str) { return STTags3_intParser(str, 0, 65535) },
    usint(str) { return STTags3_intParser(str, 0, 255) },
    udint(str) { return STTags3_intParser(str, 0, 4294967295) },
    bool(str) {
        if (str == null || !str || typeof str != "string") return null
        const bStrI = STTags3_allowedBoolStrings.indexOf(str.toLowerCase())
        return bStrI == -1 ? null : (bStrI % 2 == 1)
    },
    time(str) {
        if (str == null || !str || typeof str != "string") return null
        const tryUdint = STTags3_intParser(str, 0, 4294967295)
        if (tryUdint != null) return tryUdint
        if (str.length <= 3) return null
        if (str[0] != "t" || str[1] != "#") return null
        let numStr = ""
        let unitStr = ""
        for (let i = 2; i < str.length; i++) {
            if (MYST_VALID_DIGITS.indexOf(str[i]) == -1) {
                unitStr = str.substring(i)
                break
            }
            numStr += str[i]
        }
        if (numStr.length == 0) return null
        const num = parseInt(numStr)
        if (isNaN(num)) return null
        if (!STTags3_timeUnits.hasOwnProperty(unitStr)) return null
        if (num > STTags3_timeUnitsNumMax[unitStr]) return null
        return Math.floor(num * STTags3_timeUnits[unitStr])
    },
    real(str) {
        if (str == null || !str || typeof str != "string") return null
        if (-1 == str.indexOf(".")) return null
        const num = parseFloat(str)
        if (isNaN(num)) return null
        return num
    }
}