

const {Schema, model} = require('mongoose');

const cryptoSchema = new Schema(
    {

        //ask if this name is a good way to reference the coins
        id: this.name,
        quantity: Number
       

    },
    {
        timestamps: true,
    }
) 


const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;