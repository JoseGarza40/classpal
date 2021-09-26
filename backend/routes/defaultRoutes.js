const {Router} =require("express");
const router=Router();
const initial= require("../controllers/defaultController");

router.route("/")
.get(initial.welcome);

router.route("/signup")
.post(initial.register);

router.route("/login")
.post(initial.login)

router.route("/delete/:id")
.delete(initial.delete);


module.exports=router;