
const HMIG_commandState = {
    nextSubId: 0,
    mailbox: {},
}

async function HMIG_sendCommand(name) {
    if (HMIG_state.demo_id == null) return
    if (!(name in HMIG_state.commands)) {
        console.warn(name + " not a commands")
        return
    }
    const commandInfo = HMIG_state.commands[name]
    if (1 + commandInfo.nValuesExpected > arguments.length) {
        console.warn("expected " + commandInfo.nValuesExpected + " values")
        return
    }
    const command = {
        id: HMIG_state.demo_id,
        sub_id: HMIG_commandState.nextSubId++,
        time_user_created: Date.now(),
        name: name,
        args: [],
    }
    for (let i = 1; i < 1 + commandInfo.nValuesExpected; i++) {
        command.args.push("" + arguments[i])
    }
    const res = await HMIG_post("/sim/submit_command", JSON.stringify(command))
    console.log(res)
}