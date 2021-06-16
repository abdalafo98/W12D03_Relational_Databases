const usersModel = require("./../../db/models/users");
const db = require("./../../db/db");
const bcrypt = require("bcrypt");

const createNewAuthor = async (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const q = `SELECT * FROM users WHERE email = ${email}`;
  db.query(q, async (err, result) => {
    if (err) {
      const query = `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES (?,?,?,?,?,?,1);`;
      let pass = await bcrypt.hash(password, 10);
      const arr = [firstName, lastName, age, country, email, pass];
      db.query(query, arr, (err, result) => {
        if (err) {
          res.json(err);
          return;
        }
        console.log("result", result);
        // res.send("ok");
        res.json(result);
      });
    } else {
      res.send("email is exist");
    }
  });
};

module.exports = {
  createNewAuthor,
};
