const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// @route   GET /api/templates
// @desc    Get all templates
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, isPremium, limit = 20 } = req.query;

        const query = { isActive: true };
        if (category) query.category = category;
        if (isPremium !== undefined) query.isPremium = isPremium === 'true';

        const templates = await Template.find(query)
            .sort('-popularity')
            .limit(parseInt(limit));

        res.json({
            status: 'success',
            data: {
                templates,
                total: templates.length
            }
        });
    } catch (error) {
        console.error('Get templates error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching templates'
        });
    }
});

// @route   GET /api/templates/:id
// @desc    Get single template
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                status: 'error',
                message: 'Template not found'
            });
        }

        // Increment popularity
        template.popularity += 1;
        await template.save();

        res.json({
            status: 'success',
            data: {
                template
            }
        });
    } catch (error) {
        console.error('Get template error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching template'
        });
    }
});

module.exports = router;
