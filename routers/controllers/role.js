const roleModel = require("./../../db/models/role");

const db = require("./../../db/db");
const createNewRole = (req, res) => {
  const { role } = req.body;
  const query = `INSERT INTO roles (role) VALUES (?)`;
  const arr = [role];
  db.query(query, arr, (err, result) => {
    if (err) throw err;
    const qu = `SELECT * FROM roles`;
    db.query(qu, (err, result2) => {
      if (err) throw err;
      console.log("result", result2);
      res.json(result2);
    });
  });
};

module.exports = {
  createNewRole,
};
