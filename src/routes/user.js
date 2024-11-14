const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController")();

router.get('/user', async (req, res, next) => {
    try {
        await controller.getUsers(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/user', async (req, res, next) => {
   try {
       await controller.postUser(req, res, next);
   } catch (error) {
       next(error);
   }
});

module.exports = router;