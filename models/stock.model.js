const { Schema, model} = require('mongoose');

const stockSchema = new Schema(
    {
        name: String,
        price: Number,

    },
    {
        timestamps: true,
    }
) 

const Stock = model('Stock', stockSchema);

module.exports = Stock;