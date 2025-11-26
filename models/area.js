const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,   
        required: false,
    },
    catalog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog',
        required: true
    }
});

module.exports = mongoose.model("area", CatalogSchema);
