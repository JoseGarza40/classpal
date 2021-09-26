const {Router} =require("express");
const router=Router();
const user= require("../controllers/userController")

router.route("/signup")
.post(user.register)

// router.route("/login")
// .post(user)
router.route("/roster/major")
// .post(user.classmatesMajor)
.get(user.classmatesMajor)
// router.route("/roster/major/class")

module.exports=router;