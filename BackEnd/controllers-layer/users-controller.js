const express = require("express");
const Credentials = require("../model/credentials");
const usersLogic = require("../business-logic-layer/users-logic");

const router = express.Router();

router.get("/users", async (request, response) => {
    try {
        const allusers = await usersLogic.getAllUsersAsync()
        response.send(allusers);
    } catch (error) {
        response.status(500).send({ message: "Server error!" });
        console.log(error);
    }
});

router.put("/updateUserFollow/:id/:vacationList", async (request, response) => {
    try {
        const vacationList = request.params.vacationList;
        const id = request.params.id;
        const result = await usersLogic.updateUserFollowAsync(id,vacationList);
        response.send("Vacation updated succesfully");
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error !" });
    }
});

router.post("/insertUser", async (request, response) => {
    try {
        const result = await usersLogic.sendNewUserAsync(request.body);
        response.send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }
});

router.post("/login", async (request, response) => {
    try {
        // Data: 
        const credentials = new Credentials(request.body);

        // Validation: 
        const errors = credentials.validate();
        if (errors) return response.status(400).send(errors);

        // Logic: 
        const loggedInUser = await usersLogic.loginAsync(credentials);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");

        // Success: 
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



module.exports = router;