
const { Router } = require("express");
const { getCountries, getCountryById } = require("../controllers/countryControllers.js");

const countryRoutes = Router();

countryRoutes.get("/", getCountries);
countryRoutes.get('/detail/:id', getCountryById);

module.exports = countryRoutes; 
