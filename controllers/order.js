const orderWorker = require('../database/order')
exports.createOrder = async (req, res) => {
    try {

        const { amount, delivery_address, delivery_date, status, payment_mode, orderItem } = req.body;

        if (!amount || !delivery_address || !delivery_date || !payment_mode || !orderItem) {
            return res.status(422).json({
                status: false,
                error: 'required field is missing',
            });
        }

        let payload = {
            amount,
            delivery_address,
            delivery_date,
            status,
            payment_mode,
            orderItem
        }

        let order = await orderWorker.createOrder({
            ...payload
        });
        res.status(201).json({
            status: true,
            data: order,
        });
    } catch (err) {
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getOrder = async (req, res) => {
    try {
        let orders = await orderWorker.orders();
        res.status(200).json({
            status: true,
            data: orders,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.removeOrder = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(422).json({
                status: false,
                error: 'id required',
            });
        }
        let order = await orderWorker.removeOrder(id)
        res.status(200).json({
            status: true,
            data: order,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(422).json({
                status: false,
                error: 'id required',
            })
        }
        let orderDetails = await orderWorker.orderById(id);
        res.status(200).json({
            status: true,
            data: orderDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}