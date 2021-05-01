const productWorker = require('../database/product');
const categoryWorker = require('../database/category')
exports.createProduct = async (req, res) => {
    try {

        const { name, price, category_id } = req.body;
        if (!name || !price || !category_id) {
            return res.status(422).json({
                status: false,
                error: 'Required Field Missing',
            })
        }

        let categoryDetails = await categoryWorker.categoryById(category_id);
        if (!categoryDetails) {
            return res.status(500).json({
                status: false,
                error: "Category not Found"
            })
        }
        let payload = {
            name: name,
            price: price,
            images: req.file.path,
            category_id: category_id
        }
        let product = await productWorker.createProduct({
            ...payload
        });
        res.status(201).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProducts = async (req, res) => {
    try {
        let products = await productWorker.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

exports.uploadImage = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(422).json({
                status: false,
                error: 'id and url required',
            });
        }
        const { path } = req.file;
        console.log("ll", path);
        let product = await productWorker.uploadImage(id, path);
        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProducts = async (req, res) => {
    try {
        let products = await productWorker.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProductByCategoryId = async (req, res) => {
    try {
        let id = req.params.id

        if (!id) {
            return res.status(422).json({
                status: false,
                error: 'id required',
            })
        }
        let productDetails = await productWorker.productByCategoryId(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        if (!id) {
            return res.status(422).json({
                status: false,
                error: 'id required',
            })
        }
        let productDetails = await productWorker.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}