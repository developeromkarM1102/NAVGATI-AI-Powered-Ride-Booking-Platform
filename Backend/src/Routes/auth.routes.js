const { Router } = require("express")

const authRoute = Router()

/* all the Routes for an User */
const authUserController = require("../Controllers/user.controller")
const authUserMiddleware = require("../Middlewares/userMiddleware")

/*All User Endpoints */
authRoute.post("/registerUser",authUserController.registerUser)
authRoute.post("/loginUser",authUserController.loginUser)
authRoute.get("/logoutUser",authUserMiddleware,authUserController.logoutUser)
authRoute.get("/getmeUser",authUserMiddleware,authUserController.getMeUser)

/* all the Routes for an Driver */
const authDriverController = require("../Controllers/driver.controller")
const authDriverMiddleware = require("../Middlewares/driverMiddleware")

/*All Driver Endpoints */
authRoute.post("/registerDriver",authDriverController.registerDriver)
authRoute.post("/loginDriver",authDriverController.loginDriver)
authRoute.get("/logoutDriver",authDriverMiddleware,authDriverController.logoutDriver)
authRoute.get("/getmeDriver",authDriverMiddleware,authDriverController.getMeDriver)

module.exports = authRoute