const { readFileSync } = require("fs");

function checkUndefinedParam(req, res, next) {
  const db = JSON.parse(readFileSync("./db.json"));

  const { name, userId } = req.body;

  if (name === undefined && req.method === "POST") {
    return res.status(400).json("Nome é requerido!");
  }
  if (userId === undefined && req.method === "POST") {
    return res.status(400).json("userId é requerido!");
  }

  next();
}

module.exports = checkUndefinedParam;
