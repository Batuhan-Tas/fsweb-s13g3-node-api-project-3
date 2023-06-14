const userModel = require("../users/users-model");

function logger(req, res, next) {
  let timestamp = new Date().toLocaleString();
  let reqMethod = "";
  console.log(`${timestamp} - ${reqMethod}`);
}

async function validateUserId(req, res, next) {
  try {
    let findUser = await userModel.getById(req.params.id);
    if (!findUser) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.currentUser = findUser;
      next();
    }
  } catch (error) {}
}

function validateUser(req, res, next) {
  let { name } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "gerekli name alanı eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validatePost(req, res, next) {
  let text = req.body.text;
  try {
    if (!text) {
      res.status(400).json({ message: "gerekli text alanı eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = { validateUserId, validateUser, validatePost };
