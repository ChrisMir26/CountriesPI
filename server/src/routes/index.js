const express = require("express");
const router = express.Router();
const countryRoutes = require("./countryRoutes");
const activityRoutes = require("./activityRoutes");

router.use('/countries', countryRoutes);
router.use('/activities', activityRoutes);

module.exports = router;
