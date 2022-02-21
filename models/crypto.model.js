

const {Schema, model} = require('mongoose');

const cryptoSchema = new Schema(
    {
        id: String,
        name: String,
       // current_price: Number,

    },
    {
        timestamps: true,
    }
) 


const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;