const router = require("express").Router();
const cartController = require("../controllers/cart");


router.post("/", cartController.addItemToCart);
router.patch("/", cartController.updateItem);
router.get("/", cartController.getCart);
router.delete("/", cartController.emptyCart);
module.exports = router;