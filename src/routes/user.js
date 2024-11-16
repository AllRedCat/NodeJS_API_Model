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

router.get('/user/:id', async (req, res, next) => {
    try {
        await controller.getUserById(req, res);
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

router.put('/user/:id', async (req, res, next) => {
    try {
        await controller.putUser(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete('/user/:id', async (req, res, next) => {
   try {
       await controller.deleteUser(req, res);
   } catch (error) {
       next(error);
   }
});

module.exports = router;