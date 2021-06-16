const commentsModel = require("./../../db/models/comments");
const db = require("./../../db/db");
const createNewComment = (req, res) => {
  const articleId = req.params.id;
  const commenter = req.token.id;
  console.log(req.token);
  const { comment } = req.body;

  const query = `INSERT INTO comments (comment,article_id,commenter_id) VALUES (?,?,?)`;
  const data = [comment, articleId, commenter];
  db.query(query, data, (err, result) => {
    if (err) throw err;

    const qu = `SELECT * FROM comments WHERE commenter_id = ${commenter} AND article_id = ${articleId}`;
    db.query(qu, (err, result2) => {
      if (err) throw err;
      res.json(result2);
    });
  });
};

module.exports = {
  createNewComment,
};
