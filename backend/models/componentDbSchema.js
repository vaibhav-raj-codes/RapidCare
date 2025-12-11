const mongoose = require('mongoose');

const componentDbSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    steps: {
        type: Map,
        of: new mongoose.Schema({
            title: { type: String, required: true },
            gifUrl: { type: String, required: true }
        }, { _id: false })
    }
});

const Database = mongoose.model('Database', componentDbSchema);

module.exports = Database;
