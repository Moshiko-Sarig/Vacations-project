const express = require("express");
const vactionsLogic = require("../business-logic-layer/vacation-logic");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const config = require("../Configuration/config.json")
const fileUpload = require("express-fileupload");
const socketLogic = require("../business-logic-layer/socket-logic");

router.get("/vactions" , async (request, response) => { 
    try {
        const allVactions = await vactionsLogic.getAllVactionsAsync();
        response.send(allVactions);

    } catch (error) {
        response.status(500).send({ message: "Server error!" });
        console.log(error);
    }
});


router.get("/images/:imageName", (request, response) => {
    const imageName = request.params.imageName;
    let imageAddres = path.join(__dirname, "..", "images", imageName);
    if (!fs.existsSync(imageAddres)) {
        imageAddres = path.join(__dirname, "..", "images", config.ErrorMassage);

    }
    response.sendFile(imageAddres);
});

router.put("/add/follower/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const result = await vactionsLogic.addFollowerAsync(id);
        response.send("Follower added succesfully");

    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error !" });
    }
});


router.put("/subtract/follower/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const result = await vactionsLogic.subtractFollowerAsync(id);
        response.send("Follower subtracted succesfully");
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error !" });
    }
});

router.delete("/deleteVacation/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const deleteVacation = await vactionsLogic.deleteVacationAsync(id);
        socketLogic.allUsersVacationUpdate();
        response.send(deleteVacation);
    }
    catch (err) {
        response.status(404).send({ errorMessage: `Can not find the Vacation number ${id}.` });
        console.log(err);
    }
})


router.patch("/addFollower/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const  addFollow = await vactionsLogic.editFollowVacationAsync(id);
        socketLogic.allUsersVacationUpdate();

        response.status(200).send("Follower Added! ");
    }
    catch (error) {
        response.status(500).send({ message: "Server error!" });
        console.log(error);
    }
})




router.use([fileUpload()]);

router.put("/UpdateVacation/:id", async (request, response) => {
    try {
        const body = request.body;
        const id = request.params.id;
        const image = request.files.vacation_picture;
        if (!image) {
            response.status(400).send({ message: "Error please send a image with the vaction" });
        }
        body.vacation_picture = image.name;
        const absolutePath = path.join(__dirname, "..", "images", image.name);
        await image.mv(absolutePath);
        const updateVacation = await vactionsLogic.editVactionAsync(body, id);
        socketLogic.allUsersVacationUpdate();

        response.send(updateVacation);
    }
    catch (err) {
        response.status(500).send({ message: "Server error!" });
        console.log(err);
    }

});


router.post("/addVaction", async (request, response) => {
    try {
        const body = request.body;
        body.vacation_followers = 0;
        const image = request.files.vacation_picture;
        if (!image) {
            response.status(400).send({ message: "Error please send a image with the vaction" });
        }
        body.vacation_picture = image.name;
        const absolutePath = path.join(__dirname, "..", "images", image.name);
        await image.mv(absolutePath);
        const result = await vactionsLogic.sendNewVactionAsync(body);
        response.send(result);
        console.log(body);
        socketLogic.allUsersVacationUpdate();
    }
    catch (err) {
        response.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }

});



module.exports = router;