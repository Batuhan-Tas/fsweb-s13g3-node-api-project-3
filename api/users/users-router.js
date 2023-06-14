const express = require("express");

const userModel = require("./users-model");
const postsModel = require("../posts/posts-model");
const middleWare = require("../middleware/middleware");
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get("/", async (req, res, next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    let getUsers = await userModel.get();
    res.json(getUsers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", middleWare.validateUserId, (req, res, next) => {
  try {
    res.json(req.currentUser);
  } catch (error) {
    next(error);
  }
});

router.post("/", middleWare.validateUser, async (req, res, next) => {
  try {
    const insertUser = await userModel.insert({ name: req.body.name });
    res.status(201).json(insertUser);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  middleWare.validateUserId,
  middleWare.validateUser,
  async (req, res, next) => {
    try {
      const updateUser = await userModel.update(req.params.id, {
        name: req.body.name,
      });
      res.json(updateUser);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", middleWare.validateUserId, async (req, res, next) => {
  try {
    await userModel.remove(req.params.id);
    res.json(req.currentUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", middleWare.validateUserId, async (req, res, next) => {
  try {
    const userPosts = await userModel.getUserPosts(req.params.id);
    res.json(userPosts);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  middleWare.validateUserId,
  middleWare.validatePost,
  async (req, res, next) => {
    try {
      let insertPost = await postsModel.insert({
        user_id: req.params.id,
        text: req.body.text,
      });
      res.status(201).json(insertPost);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

// routerı dışa aktarmayı unutmayın
