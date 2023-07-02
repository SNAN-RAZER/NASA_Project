const {  getAllPlanetsData } = require("../../models/palnets.model");



const getAllPlanets =  async(req, res) =>{
    res.status(200).json(await getAllPlanetsData());
}

module.exports = {
    getAllPlanets
}