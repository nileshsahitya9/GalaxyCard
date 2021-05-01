const Category = require("../models/category");
exports.categories = async () => {
    const catgeories = await Category.find();
    return catgeories;
};
exports.updateCategory = async (id, name) => {
    const category = await Category.findOneAndUpdate({ _id: id }, { name: name }, { new: true });
    return category;
}
exports.createCategory = async payload => {
    const newCategory = await Category.create(payload);
    return newCategory;
}
exports.removeCategory = async id => {
    const category = await Category.findByIdAndRemove(id);
    return category;
}

exports.categoryById = async id => {
    const category = await Category.findById(id);
    return category;
}