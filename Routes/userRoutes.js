const express = require("express");

const authController = require("./../Controllers/authController");

const userController = require("./../Controllers/userController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/user", authController.user);

router.get("/alluser", userController.getalluser);

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
