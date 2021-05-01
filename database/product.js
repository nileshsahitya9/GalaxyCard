const Product = require("../models/product");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
exports.products = async () => {
    const products = await Product.find().populate('category_id');
    return products;
};
exports.productByCategoryId = async id => {
    const product = await Product.aggregate(
        [
            {
                $match: {
                    category_id: ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: 'category_id',
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: "$categoryDetails" },
            {
                $group: {
                    _id: { name: "$categoryDetails.name" },
                    details: {
                        $push:
                        {
                            name: '$name',
                            price: '$price',
                            images: '$images',
                            createdAt: '$createdAt',
                            updatedAt: '$updatedAt',
                        }
                    }
                }
            },
        ])
    return product;
}
exports.createProduct = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct
}
exports.removeProduct = async id => {
    const product = await Product.findByIdAndRemove(id);
    return product
}

exports.uploadImage = async (id, image) => {
    const updatedProduct = await Product.findOneAndUpdate({ _id: id }, { $push: { images: image } }, { new: true });
    return updatedProduct;
}

exports.productById = async id => {
    const product = await Product.findById(id);
    return product;
}