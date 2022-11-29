const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");
const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authRequired } = require("./utils");
const SALT_ROUNDS = 10;
//GET /api/users
router.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const users = await prisma.users.findMany();
    res.send(users);
  })
);

//POST /api/users/register
router.post(
  "/register",
  asyncErrorHandler(async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.users.create({
      data: { email, password: hashedPassword, firstName, lastName },
    });
    console.log("This is the user in register route:", user);
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send(user);
  })
);

//POST /api/users/login
router.post(
  "/login",
  asyncErrorHandler(async (req, res, next) => {
    console.log("Made it to login");
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { email: email },
    });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign(user, process.env.JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      delete user.password;

      res.send(user);
    } else {
      next({ message: "Wrong username or password. Please try again" });
    }
  })
);

//GET /api/users/me
router.get(
  "/me",
  authRequired,
  asyncErrorHandler(async (req, res, next) => {
    res.send(req.user);
    console.log("This is the req.user in the GET Me", req.user);
  })
);

//GET /api/users/:userId
router.get(
  "/:userId",
  asyncErrorHandler(async (req, res, next) => {
    const user = await prisma.users.findUnique({
      where: {
        id: +req.params.userId,
      },
    });
    res.send(user);
  })
);

//PATCH /api/users/me

// do not change password it removes the bcrypt and you cant log in after that
router.patch(
  "/me",
  authRequired,
  asyncErrorHandler(async (req, res, next) => {
    console.log("This is the req.body in the PATCH me route:", req.body);
    const updateUser = await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: req.body,
    });
    res.send(updateUser);
  })
);
//GET /api/users/me/order
// it cant identify products yet I believe because I do dont have any products added with my new email - Wilson
router.get(
  "/me/order",
  authRequired,
  asyncErrorHandler(async (req, res, next) => {
    const order = await prisma.orders.findMany({
      where: { id: req.user.id },
      include: {
        order_products: {
          include: { products },
        },
      },
    });
    res.send(order);
  })
);

module.exports = router;