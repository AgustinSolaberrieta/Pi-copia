
const  {getdriver} = require('../controller/getdrivers')
const {getdriverdById} = require("../controller/getById");
const { getDriversByName } = require('../controller/getDriversByName');
const {getTeams} = require("../controller/getTeams")
const {postDrivers} = require("../controller/postDivers")

const { Router } = require("express");
const router = Router();

router.get('/drivers/search', getDriversByName );
router.get("/drivers/:id", getdriverdById);

router.get('/drivers' , getdriver);
router.get('/teams', getTeams);
router.post("/drivers", postDrivers)



module.exports = router;
