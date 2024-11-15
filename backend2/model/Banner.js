const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    bannerText: String,
    bannerImage: String,
});

module.exports = mongoose.model('Banner', bannerSchema);
