const { Router } = require("express");
const { getAllActivities,postActivity,deleteActivity  } = require("../controllers/activityControllers")

const activityRoutes = Router();

activityRoutes.get("/", getAllActivities);
activityRoutes.post("/", postActivity );
activityRoutes.delete("/:id",deleteActivity )


module.exports = activityRoutes
