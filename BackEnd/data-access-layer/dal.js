const db=require("mysql");

const pool=db.createPool({
    host: "localhost",
    // port: 3306,
    user: "root",
    database: "vaction_mood_db"
});

// Promisifying:
function executeQueryAsync(sqlCmd) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, (err, rows)=> {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                // console.log(rows);
                resolve(rows);
            }
        });
    });
}

module.exports = {
    executeQueryAsync
};
