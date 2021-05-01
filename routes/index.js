const router = require("express").Router();
const ProductRouter = require('./product');
const CategoryRouter = require('./category');
const CartRouter = require('./cart');
const OrderRouter = require('./order');


router.use("/product", ProductRouter);
router.use("/category", CategoryRouter);
router.use("/cart", CartRouter);
router.use("/order", OrderRouter);


module.exports = router;