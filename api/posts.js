const express = require("express");
const postsRouter = express.Router();
const {
  createPosts,
  getAllPosts,
  getPostsById,
  updatePosts,
  deletePosts,
  getPostsById,
  getPostsByGenre,
  getPostsByAuthorId,
} = require("../db");
const { loginAuth } = require("./utils");

postsRouter.get("/", loginAuth, async (req, res, next) => {
  try {
    const post = await getAllPosts();
    res.send(post);
  } catch (error) {
    throw error;
  }
});

postsRouter.get("/:postsId", loginAuth, async(req,res, next)=>{
    try{
        const { postsId } = req.params;
    const posts = await getPostsById(postsId);
    res.send(posts)
    }catch(error){
        throw error
    }
})

postsRouter.get("/:genreId", loginAuth, async(req, res, next)=>{
    try{
const { genreId } = req.params
const posts = await getPostsByGenre(genreId)
res.send(posts)
    }catch(error){
        throw error
    }
})

postsRouter.post("/", loginAuth, async(req, res, next)=>{
    try{
        const { content } = req.body
        const { authorId } = req.user
        const { genreId } = req.genre
        const post = await createPosts({ authorId, genreId, content })
        res.send(post)
    }catch(error){
        throw error
    }
})

module.exports = postsRouter;
