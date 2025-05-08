

function HMIG_initCommands() {
    try {
        const commands = HMIG_state.text_assets["user/user_commands.json"]
        for (const command of commands.commands) {
            if (!("n" in command)) {
                console.warn("command.n is missing: " + JSON.stringify(command))
                continue
            }
            if (typeof command.n != "string") {
                return "command.n is not a string: " + JSON.stringify(command)
            }
            if (command.n in HMIG_state.commands) {
                return "command.n is already in use: " + command.n
            }
            if (!("nValuesExpected" in command)) {
                command["nValuesExpected"] = 0
            }
            if (typeof command["nValuesExpected"] == "string") {
                command["nValuesExpected"] = parseInt(command["nValuesExpected"])
            }
            if (typeof command["nValuesExpected"] != "number") {
                command["nValuesExpected"] = 0
            }
            HMIG_state.commands[command.n] = command
        }
        return ""
    } catch (e) {
        return "Error in HMIG_initCommands: " + e.message
    }
}

