const router = require("express").Router();
const orderController = require("../controllers/order");


router.post("/", orderController.createOrder);
router.get("/", orderController.getOrder);
router.delete("/", orderController.removeOrder);
router.get("/:id", orderController.getOrderById);
module.exports = router;