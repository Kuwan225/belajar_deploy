const express = require("express");
const router = express.Router();
const controllerUser = require("../controller/user");
const middleware = require("../middleware/middleware");

router.get("/get", controllerUser.getUser);
router.get("/getOne/:id", controllerUser.getUserOne);
router.delete("/delete/:id", controllerUser.deleteUser);
router.put("/update_pw/:id", controllerUser.updatePw);
router.post("/register", controllerUser.register);
router.post("/login", controllerUser.login);
router.post("/change_pw/:id", controllerUser.changePw);
router.put("/update_data_user/:id", controllerUser.updateData);
router.put(
  "/update_profil/:id",
  middleware.single("image"),
  controllerUser.updateProfil
);

module.exports = router;
