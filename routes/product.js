const router = require("express").Router();
const productController = require("../controllers/product");
const multerInstance = require('../utils/imageUplaod');
const resizeImage = require('../utils/resizeImage');


router.post("/", multerInstance.upload.single('image'), resizeImage.Resizer, productController.createProduct);
router.patch("/", multerInstance.upload.single('image'), resizeImage.Resizer, productController.uploadImage);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductByCategoryId);
router.delete("/:id", productController.removeProduct);
module.exports = router