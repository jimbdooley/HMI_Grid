
function HMIG_initTags() {
    const tags = HMIG_state.text_assets["user/user_tags.json"]
    const factory = STTags3_prototypes_factory()
    for (const tag_name in tags) {
        if (!("type" in tags[tag_name])) continue
        if (!(tags[tag_name].type in factory)) continue
        HMIG_state.hmi_tags[tag_name] = STTags3_copyProto(factory[tags[tag_name].type])
        if ("start_value" in tags[tag_name] && tags[tag_name].type == "string") {
            HMIG_state.hmi_tags[tag_name].value = tags[tag_name].start_value + ""
        }
        if ("start_value" in tags[tag_name] && tags[tag_name].type != "string") {
            const defaultValue = STTags3_dataTypeParser[tags[tag_name].type](tags[tag_name].start_value +"")
            HMIG_state.hmi_tags[tag_name].value = defaultValue != null 
                ? defaultValue 
                : (tags[tag_name].type == "bool" ? false : 0)
        }
    }
    return ""
}