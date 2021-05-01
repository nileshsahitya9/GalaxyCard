const mongoose = require("mongoose"), Schema = mongoose.Schema;

var orderPayloadSchema = new Schema({
    itemName: String,
    itemId: String,
    quantity: Number
});


const orderSchema = new Schema(
    {
        amount: Number,
        delivery_address: {
            address: { type: String },
            city: { type: String },
            pincode: { type: String },
            state: { type: String },
        },
        delivery_date: { type: Date, default: null },
        status: {
            type: String,
            enum: [
                "PENDING",
                "PURCHASED",
                "OUT FOR DELIEVERY",
                "DELIVERED",
                "CANCELLED",
            ],
            default: "PENDING"
        },
        payment_mode: {
            type: String,
            enum: [
                "CASH_ON_DELIVERY",
                "DEBIT_CARD",
                "CREDIT_CARD",
                "NET BANKING",
                "BITCOIN",
            ],
            default: "CASH_ON_DELIVERY"
        },
        orderItem: [orderPayloadSchema],
    },
    {
        timestamps: true,
    }
);




module.exports = mongoose.model("Order", orderSchema);