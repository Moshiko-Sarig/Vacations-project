
const dal = require('../data-access-layer/dal');

const io = require("socket.io");

let socketsManager;



function SoketInit(listener) {
    socketsManager = io(listener, { cors: { origin: "*" } });

    const allUsersVacationUpdate = async () => {
        if (socketsManager.engine.clientsCount > 0) {
            const vacations = await dal.executeQueryAsync(`SELECT * FROM vacation`);
            socketsManager.sockets.emit("VacationsUpdate", vacations);
        }
    };
    module.exports.allUsersVacationUpdate = allUsersVacationUpdate;

    socketsManager.sockets.on("connection", socket => {
        console.log("A client is connected ");

        socket.on("disconnect", (reason) => {
            console.log("A client is disconnected ");
        });

        (async () => {
            const result = await dal.executeQueryAsync("SELECT * FROM `vacation` ORDER BY vacation_id");
            socket.emit("VacationsUpdate", result);
        })();
    });

}

module.exports = {
    SoketInit
}