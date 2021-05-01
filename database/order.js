const Order = require("../models/order");
exports.orders = async () => {
    const orders = await Order.find();
    return orders;
};

exports.createOrder = async payload => {
    const newOrder = await Order.create(payload);
    return newOrder;
}
exports.removeOrder = async id => {
    const order = await Order.findOneAndDelete(id);
    return order;
}

exports.orderById = async id => {

    const order = await Order.findById(id);
    return order;

}