const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['modern', 'professional', 'creative', 'minimal', 'executive'],
        default: 'modern'
    },
    thumbnail: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    atsOptimized: {
        type: Boolean,
        default: true
    },
    colorScheme: {
        primary: String,
        secondary: String,
        accent: String
    },
    fonts: {
        heading: String,
        body: String
    },
    layout: {
        type: String,
        enum: ['single-column', 'two-column', 'sidebar'],
        default: 'single-column'
    },
    popularity: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Template', templateSchema);
