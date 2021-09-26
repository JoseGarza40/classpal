const {Router} =require("express");
const router=Router();
const user= require("../controllers/userController")

router.route("/")
.get(user.welcome)

router.route("/signup")
.post(user.register)


router.route("/roster/major")
// .post(user.classmatesMajor)
.get(user.classmatesMajor)
// router.route("/roster/major/class")

module.exports=router;