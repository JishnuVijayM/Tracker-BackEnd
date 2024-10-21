const express = require("express");
const router = express.Router();

// Import controllers
const authcontrollers = require("../controller/auth-controller");

//authentication validator
const validate = require("../middlewares/validate-middleware");
const signupSchema = require("../validators/auth-validator");

//without controller
// router.get("/", (req, res) => {
//   res.send("normal route");
// });

//using controller to apply logic 
router.route("/home").get(authcontrollers.home);

router
    .route("/register")
    // apply validation middleware here before registration (apply zod validation into fn)
    .post(validate(signupSchema), authcontrollers.register);

router.route("/login").post(authcontrollers.login);



module.exports = router;
