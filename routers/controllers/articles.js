const articlesModel = require("./../../db/models/articles");
const db = require("./../../db/db");

const getAllArticles = (req, res) => {
  const query = `SELECT *  FROM articles WHERE is_deleted = ?`;
  const data = [0];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log(result);

    res.json(result);
  });
};

const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;
  const q = `SELECT articles.* , users.lastName ,users.firstName 
  FROM articles LEFT JOIN users ON articles.author_id = users.id WHERE users.firstName = ?;`;

  const query = `SELECT * FROM articles WHERE author_id = ?`;
  const data = [author];
  db.query(q, data, (err, result) => {
    if (err) throw err;
    console.log("result", result);
    res.json(result);
  });
};

const getAnArticleById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT articles.*  , users.firstName FROM articles
  INNER JOIN users ON articles.author_id = users.id WHERE articles.is_deleted = 1 AND articles.id = ?;`;
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
};

const createNewArticle = (req, res) => {
  const author_id = req.token.id;
  const { title, description } = req.body;

  const query = `INSERT INTO articles (title,description,author_id) VALUES (?,?,?)`;

  const data = [title, description, author_id];

  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    const qu = `SELECT * FROM articles WHERE author_id = ? AND description= ? AND title=?`;
    const data = [author_id, description, title];
    db.query(qu, data, (err, result2) => {
      if (err) throw err;
      console.log("result", result2);
      res.json(result2);
    });
  });
};

const updateAnArticleById = (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  console.log(title);
  console.log(description);
  const query = `UPDATE articles SET title= ? , description= ? 
  WHERE id= ${id}`;
  const data = [title, description];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    const qu = `SELECT * FROM articles WHERE id= ${id}`;
    db.query(qu, (err, result2) => {
      if (err) throw err;
      console.log("result", result2);
      res.json(result2);
    });
  });
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE articles SET is_deleted=1 
  WHERE id=${id}`;
  db.query(query, (err, result) => {
    if (err) throw err;

    const qu = `SELECT * FROM articles WHERE id=?`;
    const data = [id];
    db.query(qu, data, (err, result2) => {
      if (err) throw err;
      console.log("result", result2);
      res.json(result2);
    });
  });
};

const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author_id;

  const query = `UPDATE articles SET is_deleted = 1
  where author_id = ${author} `;

  db.query(query, (err, result) => {
    if (err) throw err;
    const qu = `SELECT * FROM articles WHERE author_id = ?`;
    const data = [author];
    db.query(qu, data, (err, result2) => {
      if (err) throw err;
      console.log("result", result2);
      res.json(result2);
    });
  });
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
