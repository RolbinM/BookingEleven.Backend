
const { getSoccerFields } = require('../services/FieldsService');

const SoccersFieldsInformation = (req, res) => {
    const soccerFields = getSoccerFields(); 
    res.json({ soccerFields });
  };
  
  module.exports = { SoccersFieldsInformation };