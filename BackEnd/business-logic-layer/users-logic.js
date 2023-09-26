const dal = require('../data-access-layer/dal');
const jwt = require("jsonwebtoken");
const config = require("../Configuration/config.json")


function getAllUsersAsync() {
    return dal.executeQueryAsync("SELECT user_id ,is_admin, user_name , first_name, last_name,password from user ORDER BY user_id");
}

function sendNewUserAsync(user) {
    return dal.executeQueryAsync(`
    INSERT INTO user
        (is_admin, user_name, first_name, last_name, password) 
         VALUES 
        ("${user.is_admin = 0}","${user.user_name}", "${user.first_name}", "${user.last_name}", "${user.password}")
    `);
}

async function loginAsync(credentials) {
    const user = await dal.executeQueryAsync(
        `
            select * from user
            where user_name='${credentials.user_name}'
            and password='${credentials.password}'
        `
    );
    if (!user || user.length < 1) return null;
    delete user[0].password;

    user[0].token = jwt.sign({ user }, config.tokenKey, { expiresIn: "1h" });
    return user[0];
}

function updateUserFollowAsync(id, vacationList) {
    return dal.executeQueryAsync(`
            UPDATE user
            SET 
            vacations_followed = "${vacationList}"
            WHERE user_id = "${id}"
    `);
}

module.exports = {
    getAllUsersAsync, sendNewUserAsync, loginAsync, updateUserFollowAsync
}