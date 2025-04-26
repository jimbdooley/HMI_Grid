
function STTags3_copyProto(proto) {
    const rtn = {}
    const isArr = proto.hasOwnProperty("isArray") && proto.isArray
    if (isArr) { 
        rtn.value = STTags3_copyNDArray(proto.value) 
        rtn.range =[[], []]
        for (let i = 0; i < proto.range[0].length; i++) {
            rtn.range[0].push(proto.range[0][i])
            rtn.range[1].push(proto.range[1][i])
        }
        if (proto.hasOwnProperty("defaultSTMT")) {
            rtn.defaultSTMT = [proto.defaultSTMT[0], proto.defaultSTMT[1]]
        }
    }
    const isStruct = proto.hasOwnProperty("isStruct") && proto.isStruct
    if (isStruct) {
        rtn.value = {}
        for (const key in proto.value) {
            rtn.value[key] = STTags3_copyProto(proto.value[key])
        }
    }
    for (const key in proto) {
        if (isArr && (key === "value" || key == "range" || key == "defaultSTMT")) continue
        if (isArr && (key === "value")) continue
        if (proto[key] === null) {
            rtn[key] = null
        } else if (typeof proto[key] === "object") {
            rtn[key] = STTags3_copyProto(proto[key])
        } else {
            rtn[key] = proto[key]
        }
    }
    return rtn
}

function STTags3_recopyProto(proto, rtn) {
    const isArr = proto.hasOwnProperty("isArray") && proto.isArray
    if (isArr) {
        STTags3_recopyNDArray(proto.value, rtn.value)
    }
    const isStruct = proto.hasOwnProperty("isStruct") && proto.isStruct
    if (isStruct) {
        for (const key in proto.value) {
            STTags3_recopyProto(proto.value[key], rtn.value[key])
        }
    }
    for (const key in proto) {
        if (!rtn.hasOwnProperty(key)) continue
        if (isArr && (key === "value" || key == "range" || key == "defaultSTMT")) continue
        if (proto[key] === null) {
            rtn[key] = null
        } else if (typeof proto[key] == "object") {
            STTags3_recopyProto(proto[key], rtn[key])
        } else {
            rtn[key] = proto[key]
        }
    }
}

function STTags3_destroyProto(proto) {
    if (proto.hasOwnProperty("isArray") && proto.isArray) {
        for (let i = 0; i < proto.value.length; i++) {
            if (Array.isArray(proto.value[i])) {
                STTags3_destroyNDArray(proto.value[i])
            } else {
                STTags3_destroyProto(proto.value[i])
            }
        }
    }
    if (proto.hasOwnProperty("isStruct") && proto.isStruct) {
        for (const key in proto.value) {
            STTags3_destroyProto(proto.value[key])
        }
    }
    for (const key in proto) {
        if (typeof proto[key] === "object") {
            STTags3_destroyProto(proto[key])
        }
        delete proto[key]
    }
}
