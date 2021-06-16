const express = require("express");
const authentication = require("./../middlewares/authentication");

const {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("./../controllers/articles");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);
articlesRouter.get("/search_1", getArticlesByAuthor);
articlesRouter.get("/:id", getAnArticleById);
articlesRouter.post("/", authentication, createNewArticle);
articlesRouter.put("/:id", updateAnArticleById);
articlesRouter.put("/", deleteArticlesByAuthor);
articlesRouter.put("/id/:id", deleteArticleById);

module.exports = articlesRouter;
