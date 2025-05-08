var express = require('express')
const project_root = require("../project_root").project_root;
const project_constants = require(project_root + "/server_files/project_constants")
var router = express.Router()
const sql_server = require('../server_files/sql_server');

{
    const deleteOldEntriesQry = `
        DELETE FROM ${project_constants.commandTableName}
        WHERE time_server_received < DATEADD(SECOND, -60, GETDATE());
    `;
    setInterval(async function() {
        sql_server.executeSqlQuery(deleteOldEntriesQry)
    }, 60 * 1000)
}

const idChars = "abcdefghijklmnopqrstuvwxyz0123456789"
const ackStart = `
UPDATE ${project_constants.commandTableName}
SET status = 1
WHERE uid IN (`;
const finishAckedStart = `
UPDATE ${project_constants.commandTableName}
SET status = 2
WHERE uid IN (`
const expiredAckedStart = `
UPDATE ${project_constants.commandTableName}
SET status = 3
WHERE uid IN (`

router.post('/sim/sim_update', async function(req, res) {
    try {
        if (!req.body || !req.body.id) return res.send("[]")
        console.log(req.body)
        if (req.body.sensor_info) {
            const sensorInfo = req.body.sensor_info
            for (const sensor_name in sensorInfo) {
                const data = sensorInfo[sensor_name]
                console.log(sensor_name, data)
            }
        }
        let safeId = true;
        for (let i = 0; i < req.body.id.length; i++) {
            safeId = safeId && -1 != idChars.indexOf(req.body.id[i])
        }
        if (!safeId) return res.send("[]")
        
        for (let h = 0; h < 2; h++) {
            const idKey = h == 0 ? "resolved_ids" : "expired_ids"
            const _ackStart = h == 0 ? finishAckedStart : expiredAckedStart
            if (!(idKey in req.body)) continue;
            if (!Array.isArray(req.body[idKey])) continue;
            if (req.body[idKey].length == 0) continue;
            let allNums = true;
            for (let i = 0; i < req.body[idKey].length; i++) {
                allNums = allNums && !isNaN(req.body[idKey][i])
            }
            if (!allNums) continue;
            let qry = _ackStart + req.body[idKey].join(",") + ")"
            qry += " AND id = '" + req.body.id + "';"
            await sql_server.executeSqlQueryNoReturnData(qry)
        }
        const rtn = []
        if (safeId) {
            const qry = `
                SELECT * FROM ${project_constants.commandTableName}
                WHERE id = '${req.body.id}'
                AND time_server_received >= DATEADD(SECOND, -10, GETDATE())
                AND status != 2
                ORDER BY time_server_received DESC;
            `;
            const res = await sql_server.executeSqlQuery(qry);
            const sqlTimeRes = await sql_server.executeSqlQuery("SELECT GETDATE() as sql_time;")
            const sqlTime = new Date(sqlTimeRes[0].sql_time).getTime()
            if (res.length > 0) {
                const toAck = []
                for (let i = 0; i < res.length; i++) {
                    toAck.push(res[i].uid)
                }
                const ackScript = ackStart + (toAck.join(",")) + ");"
                const ackResult = await sql_server.executeSqlQueryNoReturnData(ackScript) 
                if (ackResult) {
                    for (let i = 0; i < res.length; i++) {
                        const time_server_received = new Date(res[i].time_server_received).getTime()
                        const info = {
                            uid: parseInt(res[i].uid),
                            sub_id: res[i].sub_id,
                            time_server_received: time_server_received,
                            elapsed_time: sqlTime - time_server_received,
                            command_type: res[i].command_type,
                            args: [res[i].arg1, res[i].arg2, res[i].arg3, res[i].arg4],
                        }
                        rtn.push(info)
                    }
                }
            }
        }
    
        res.send(JSON.stringify(rtn))
    } catch (e) {
        res.send("[]")
    }

})

router.post('/sim/submit_command', async function(req, res) {
    const body = req.body;

    if (!body || !body.name || !Array.isArray(body.args)) {
        return res.status(400).send('Invalid command structure');
    }

    const command = {
        id: body.id,         // You may want to derive this from session
        sub_id: body.sub_id,                // Adjust or generate dynamically
        time_user_created: body.time_user_created,
        name: body.name,
        args: body.args
    };
    const result = await sql_server.insertCommand(command);
    res.send(result);
})


module.exports = router;
