const dal = require('../data-access-layer/dal');

function getAllVactionsAsync() {
    return dal.executeQueryAsync("SELECT * FROM `vacation` ORDER BY vacation_id");
}

function sendNewVactionAsync(vaction) {
    return dal.executeQueryAsync(`
    INSERT INTO vacation
        (vacation_description,
         description_destination, 
         vacation_picture, 
         vacation_start_date, 
         vacation_end_date,
         vacation_price,
         vacation_followers) 
         VALUES 
        ("${vaction.vacation_description}","
        ${vaction.vacation_description}", "
        ${vaction.vacation_picture}", "
        ${vaction.vacation_start_date}", "
        ${vaction.vacation_end_date}","
        ${vaction.vacation_price}","
        ${vaction.vacation_followers}")
    `);
}

function editVactionAsync(vacation, id) {
    return dal.executeQueryAsync(`
    UPDATE vacation	
    SET 
    vacation_description = "${vacation.vacation_description}",
    description_destination = "${vacation.description_destination}",
    vacation_picture = "${vacation.vacation_picture}",
    vacation_start_date= "${vacation.vacation_start_date}",
    vacation_end_date="${vacation.vacation_end_date}",
    vacation_price = "${vacation.vacation_price}"
    WHERE 
    vacation_id = "${id}"
    `)
}

function deleteVacationAsync(id) {
    return dal.executeQueryAsync(`
    DELETE FROM vacation WHERE 
    vacation_id = "${id}"
    `)
}



function addFollowerAsync(id) {
    return dal.executeQueryAsync(`
        UPDATE vacation
        SET 
        vacation_followers = vacation_followers + 1
        WHERE vacation_id = "${id}"
    `);
}

function subtractFollowerAsync(id) {
    return dal.executeQueryAsync(`
        UPDATE vacation
        SET 
        vacation_followers = vacation_followers - 1
        WHERE vacation_id = "${id}"
    `);
}

module.exports = {
    getAllVactionsAsync, sendNewVactionAsync, editVactionAsync, deleteVacationAsync, addFollowerAsync, subtractFollowerAsync
}