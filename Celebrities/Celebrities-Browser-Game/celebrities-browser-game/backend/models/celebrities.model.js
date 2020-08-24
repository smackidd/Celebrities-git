const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const celebritySchema = new Schema({
    celebrity: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    expertise: {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    era: {
        type: String,
        require: false,
        unique: false,
        trim: true,
        minLength: 7
    },
    bio: {
        type: String,
        require: false,
        unique: false,
        trim: true
    }
}, {
    timestamps: true,
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;