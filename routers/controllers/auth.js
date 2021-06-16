const usersModel = require("./../../db/models/users");
const db = require("./../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;
  const data = [email];
  db.query(query, data, async (err, result) => {
    console.log(result[0]);

    if (err) res.send("email not found");

    if (result[0]) {
      return await bcrypt.compare(
        password,
        result[0].password,
        (err, result2) => {
          if (err) throw err;
          if (result2 === true) {
            const SECRET = process.env.SECRET;
            const payload = {
              id: result[0].id,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              role: result[0].role_id,
            };

            const option = { expiresIn: "60m" };
            res.json(jwt.sign(payload, SECRET, option));
          } else {
            res.send("Your password is incorrect");
          }
        }
      );
    } else {
      res.send("Your email is incorrect");
    }
  });
};

module.exports = {
  login,
};
