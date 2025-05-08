const sql = require('mssql');
const project_root = require("../project_root").project_root;
const project_constants = require(project_root + "/server_files/project_constants");

const config = {
    user: 'mySQLServerLogin2',
    password: 'myStrongPassword',
    server: 'localhost',
    database: 'test0',
    port: 53354,
    options: {
        database: 'test0',
        encrypt: true,
        trustServerCertificate: true
    }
};

let pool = null;

async function getPool() {
    if (pool) return pool;
    try {
        pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.error("Failed to create SQL connection pool:", err);
        throw err;
    }
}

async function executeSqlQueryNoReturnData(queryString, params = {}) {
    try {
        const pool = await getPool();
        const request = pool.request();
        for (const [key, value] of Object.entries(params)) {
            request.input(key, value);
        }
        await request.query(queryString);
        return true;
    } catch (err) {
        console.error('SQL execution error (no return):', err);
        return false;
    }
}

async function executeSqlQuery(queryString, params = {}) {
    try {
        const pool = await getPool();
        const request = pool.request();
        for (const [key, value] of Object.entries(params)) {
            request.input(key, value);
        }
        const result = await request.query(queryString);
        return result.recordset;
    } catch (err) {
        console.error('SQL execution error:', err);
        throw err;
    }
}

async function insertCommand(command) {
    try {
        const pool = await getPool();
        const q = `
            INSERT INTO ${project_constants.commandTableName} (
                id, sub_id,
                time_user_created, time_controller_ack,
                command_type, arg1, arg2, arg3, arg4, arg5,
                status
            )
            VALUES (
                @id, @sub_id,
                @time_user_created, 0,
                @name,
                @arg1, @arg2, @arg3, @arg4, @arg5,
                0
            )
        `;
        const request = pool.request()
            .input('id', command.id)
            .input('sub_id', command.sub_id)
            .input('time_user_created', command.time_user_created)
            .input('name', command.name)
            .input('arg1', command.args[0] || "")
            .input('arg2', command.args[1] || "")
            .input('arg3', command.args[2] || "")
            .input('arg4', command.args[3] || "")
            .input('arg5', command.args[4] || "");

        const result = await request.query(q);
        return { success: true, inserted: result.rowsAffected[0] };
    } catch (err) {
        console.error('Insert failed:', err);
        return { success: false, error: err.message };
    }
}

// Optional: Graceful shutdown (e.g., on SIGINT or app exit)
process.on('exit', () => {
    if (pool) pool.close();
});
process.on('SIGINT', () => {
    if (pool) pool.close().then(() => process.exit(0));
});

module.exports = {
    executeSqlQuery,
    executeSqlQueryNoReturnData,
    insertCommand,
};
