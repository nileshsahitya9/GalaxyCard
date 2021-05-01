const router = require("express").Router();
const cartController = require("../controllers/category");


router.post("/", cartController.addCategory);
router.get("/", cartController.getCategory);
router.patch("/", cartController.updateCategory);
router.delete("/", cartController.removeCategory);
module.exports = router;