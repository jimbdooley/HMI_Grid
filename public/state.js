
const HMIG_state = {
    screen_info: null,
    projectParameters: null,
    currScreenI: 0,
    layoutMode: "narrow",
    drawable_assets: {},
    text_assets: {},
    assetsRdy: false,
    startUpLog: [],
    runtimeLog: [],
    hmi_tags: {},
}

function HMIG_state_getTagValByNameAndType(name, type) {
    if (!(name in HMIG_state.hmi_tags)) {
        if (type == "string") return `Tag ${name} not found.`
        if (type == "bool") return false
        return 0
    }
    const tag = HMIG_state.hmi_tags[name]
    if (type == "string" && tag.type == "string") return tag.value
    if (type == "string" && tag.type != "string") return "" + tag.value
    if (type == "bool" && tag.type == "bool") return tag.value
    if (type == "bool" && tag.type == "string") return tag.value == ""
    if (type == "bool") return tag.value != 0
    if (type == tag.type) return tag.value
    return 0
}

const HMIG_state_setTagValByNameAndType = (() => {
    const rangeSizes = {
        sint: 256,
        int: 65536,
        dint: 4294967296, 
        usint: 256,
        uint: 65536,
        udint: 4294967296,
    }
    const negRanges = {
        sint: [-128, 127],
        int: [-32768, 32767],
        dint: [-2147483648, 2147483647],
    }
    const posRanges = {
        uint: [0, 65535],
        usint: [0, 255],
        udint: [0, 4294967295],
    }
    
    return function(name, type, val) {
        if (!(name in HMIG_state.hmi_tags)) return
        const tag = HMIG_state.hmi_tags[name]
        if (tag.type == type) {
            tag.value = val
        } else if (tag.type == "string") {
            tag.value = val
        } else if (tag.type == "bool" && type == "string") {
            tag.value = val != ""
        } else if (tag.type == "bool") {
            tag.value = val != 0
        } else if (type == "bool") {
            tag.value = val ? 1 : 0
        }
    
        if (tag.type == "bool") tag.value = !!tag.value
        if (tag.type == "string" && typeof tag.value != "string") {
            tag.value = "" + tag.value
            if (typeof tag.value != "string") {
                tag.value = "Failed to convert tag value to string."
            }
        }
        if (tag.type == "time") {
            if (typeof tag.value != "number") { tag.value = 0 }
            tag.value = Math.max(0, Math.min(tag.value, 4294967295))
            tag.value = Math.floor(tag.value)
        }
        if (tag.type == "real") {
            if (typeof tag.value != "number") { tag.value = 0 }
        }
        if (tag.type in posRanges) {
            if (typeof tag.value != "number") { tag.value = 0 }
            tag.value = tag.value % rangeSizes[tag.type]
            tag.value += rangeSizes[tag.type]
            tag.value = tag.value % rangeSizes[tag.type]
            tag.value = Math.floor(tag.value)
        }
        if (tag.type in negRanges) {
            if (typeof tag.value != "number") { tag.value = 0 }
            tag.value -= negRanges[tag.type][0]
            tag.value = tag.value % rangeSizes[tag.type]
            tag.value += rangeSizes[tag.type]
            tag.value = tag.value % rangeSizes[tag.type]
            tag.value += negRanges[tag.type][0]
            tag.value = Math.floor(tag.value)
        }
        
    }
})();
