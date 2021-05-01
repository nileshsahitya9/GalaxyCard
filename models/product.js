const mongoose = require("mongoose"), Schema = mongoose.Schema;



const productSchema = new Schema(
    {
        name: String,
        price: Number,
        description: String,
        category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
        images: [{ type: String }],
        is_active: { type: Boolean, default: true }
    },
    {
        timestamps: true,
    }
);




module.exports = mongoose.model("Product", productSchema);