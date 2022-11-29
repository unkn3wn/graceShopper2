const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");
const prisma = require("../prisma/prisma");

//Getting order_products \
//GET/ api/ order_products/:order_id/:product_id

router.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    console.log("hello");
    const orderProd = await prisma.order_Products.findMany();
    res.send(orderProd);
  })
);
//POST /api/order_products/:order_id/:product_id
// adding a product to an order
router.post(
  "/:order_id/:product_id",
  asyncErrorHandler(async (req, res, next) => {
    const { order_id, product_id } = req.params;
    const oP = await prisma.order_Products.create({
      data: {
        order_id: +order_id,
        product_id: +product_id,
      },
    });
    res.send(oP);
  })
);

//DELETE /api/order_products/:order_id/:product_id
// Remove a product from order

router.delete(
  "/:order_id/:product_id",
  asyncErrorHandler(async (req, res, next) => {
    const { order_id, product_id } = req.params;
    const oP = await prisma.order_Products.delete({
      where: { order_id: +order_id },
      where: { product_id: +product_id },
    });
  })
);

module.exports = router;