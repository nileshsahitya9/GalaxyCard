const cartWorker = require('../database/cart')
const productWorker = require('../database/product');
exports.addItemToCart = async (req, res) => {
    let { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(422).json({
            success: false,
            error: 'Missing Required Fields'
        })
    }
    quantity = Number.parseInt(quantity);
    try {
        let cart = await cartWorker.cart();
        let productDetails = await productWorker.productById(productId);
        if (!productDetails) {
            return res.status(500).json({
                status: false,
                error: 'product not found'
            })
        }

        if (cart) {

            const indexFound = cart.items.findIndex(item => item.productId.id == productId);

            if (indexFound !== -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price
                cart.subTotal += (quantity * productDetails.price);

            }

            else if (quantity > 0) {
                cart.items.push({
                    productId: productId,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                })
                cart.subTotal += (productDetails.price * quantity);
            }
            else {
                return res.status(400).json({
                    status: false,
                    error: 'Something went wrong'
                })
            }
            let data = await cart.save();
            res.status(201).json({
                success: true,
                data: data
            })
        }

        else {
            const cartData = {
                items: [{
                    productId: productId,
                    quantity: quantity,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price
                }],
                subTotal: parseInt(productDetails.price * quantity)
            }
            cart = await cartWorker.addItem(cartData)
            res.json(cart);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            err: err
        })
    }
}

exports.updateItem = async (req, res) => {
    let { productId, quantity } = req.body;
    if (!productId) {
        return res.status(422).json({
            success: false,
            error: 'Missing Required Fields'
        })
    }
    quantity = Number.parseInt(quantity);
    try {
        let cart = await cartWorker.cart();
        let productDetails = await productWorker.productById(productId);
        if (cart) {

            const indexFound = cart.items.findIndex(item => item.productId.id == productId);

            if (indexFound === -1) {
                return res.status(422).json({
                    success: true,
                    data: 'product not found'
                })
            }
            if (cart.items[indexFound].quantity < 0) {
                return res.status(422).json({
                    success: false,
                    data: 'Invalid Request'
                })
            }
            if (indexFound !== -1 && quantity <= 0) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }
            else {
                cart.items[indexFound].quantity = quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * cart.items[indexFound].price;
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            let data = await cart.save();
            res.status(200).json({
                success: true,
                data: data
            })
        }
        else {
            res.status(400).json({
                success: false,
                data: 'cart is empty'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err: err
        })
    }
}
exports.getCart = async (req, res) => {
    try {
        let cart = await cartWorker.cart()
        if (!cart) {
            return res.status(400).json({
                success: true,
                data: "Cart not found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            err: err
        })
    }
}
exports.emptyCart = async (req, res) => {
    try {
        let cart = await cartWorker.cart();
        cart.items = [];
        cart.subTotal = 0
        await cart.save();
        res.status(200).json({
            success: true,
            data: "Cart Item removed",
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            err: err
        })
    }
}