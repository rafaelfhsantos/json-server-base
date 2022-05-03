const { readFileSync } = require("fs");

function checkRepeatedName(req, res, next) {
  const db = JSON.parse(readFileSync("./db.json"));

  const { name } = req.body;
  req.body.createdAt = new Date();
  if (db.tools.find((tool) => tool.name === name)) {
    return res.status(400).json("Já existe uma ferramenta com esse nome!");
  }
  if (db.professionals.find((professional) => professional.name === name)) {
    return res.status(400).json("Já existe uma profissão com esse nome!");
  }

  next();
}

module.exports = checkRepeatedName;
