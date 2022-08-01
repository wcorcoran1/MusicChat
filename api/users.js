// This is the Users API that we will use to make routes from backend to frontend
const express = require("express");
const userRouter = express.Router();
const { createUser, getUserByUsername, getAllUsers } = require("../db");
const { loginAuth } = require("./utils");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

userRouter.use((req, res, next) => {
  // console.log("A request is being made to /user");
  // console.log("-----------");
  next();
});
/* This is an API call to set up a route for the frontend to make a new user
by using the getUserName and createUser functions from the database*/
userRouter.post("/register", async (req, res, next) => {
  // console.log("Register Connected!!!");
  const { name, email, username, password } = req.body;
  try {
    // console.log("Name for req.body",name)
  //  variable that waits for getUserName function to run
    const newUser = await getUserByUsername(username);
    // if statement that states if no username create a user else send message
    if (!newUser) {
      
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await createUser({
        name,
        email,
        username,
        password: hashedPassword,
      });
      delete user.password;
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        user,
        message: "you're signed up!",
        token,
      });
    } else {
      console.log("else block");
      res.status(401),
        next({
          name: "USerExistsError",
          message: "A user by that username already exists",
        });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res) => {
  // console.log("HELLO FROM USERS API");
  const users = await getAllUsers();
  res.send({
    users,
  });
});
/* This is an API call to set up a route for the frontend to check if that user already exists
by using the getUserName function from the database*/
userRouter.post("/login", async (req, res, next) => {
  // console.log("Login Connected");
  const { username, password } = req.body;
  // if statement that checks if both a username or password are correct
  if (!username || !password) {
    res.status(401),
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
  }

  try {
    const user = await getUserByUsername(username);
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (user && validPassword) {
      // create token & return to user
      
      const token = jwt.sign({ id: user.id, username: username }, JWT_SECRET);
      delete user.password
      res.send({ message: "you're logged in!", token: token, user: user });
    } else {
      return (
        res.status(401),
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        })
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.get("/me", loginAuth, async (req, res, next) => {
  console.log(req, "/me route")
  try {
    res.send(req.user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = userRouter;