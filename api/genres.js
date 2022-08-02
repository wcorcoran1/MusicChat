//IMPORTS FOR Genres API ROUTES
const express = require("express");
const genresRouter = express.Router();
const { createGenres, getAllGenres, getGenreById, updateGenres, deleteGenres } = require("../db");
const { loginAuth } = require("./utils");

genresRouter.get("/", loginAuth, async (req, res, next) => {
  try {
    const genres = await getAllGenres();
    res.send(genres);
  } catch (error) {
    throw error;
  }
});

genresRouter.get("/:genresId", loginAuth, async (req, res, next) => {
  try {
    const { genresId } = req.params;
    const genres = await getGenreById(genresId);
    res.send(genres);
  } catch (error) {
    throw error;
  }
});

genresRouter.post("/", loginAuth, async (req, res, next) => {
  const { name } = req.body;
  try {
    const genres = await createGenres({ name });
    res.send(genres);
  } catch (error) {
    throw error;
  }
});
genresRouter.patch("./:genresId", loginAuth, async (req, res, next) => {
  const { name } = req.body;
  const id = req.params.genresId;

  try {
    const genres = await updateGenres({
      id,
      name,
    });
    res.send(genres);
  } catch (error) {
    next(error);
  }
});

genresRouter.delete("./:genresId", loginAuth, async (req, res, next) => {
  const id = req.params.genresId;

  try {
    const genres = await deleteGenres({ id });
    res.send(genres);
  } catch (error) {
    next(error);
  }
});
module.exports = genresRouter;
