const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/resumes
// @desc    Get all resumes for current user
// @access  Private
router.get('/', async (req, res) => {
    try {
        const { status, sort = '-createdAt', limit = 10, page = 1 } = req.query;

        const query = { user: req.user._id };
        if (status) {
            query.status = status;
        }

        const resumes = await Resume.find(query)
            .sort(sort)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Resume.countDocuments(query);

        res.json({
            status: 'success',
            data: {
                resumes,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Get resumes error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching resumes'
        });
    }
});

// @route   GET /api/resumes/:id
// @desc    Get single resume
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                status: 'error',
                message: 'Resume not found'
            });
        }

        res.json({
            status: 'success',
            data: {
                resume
            }
        });
    } catch (error) {
        console.error('Get resume error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching resume'
        });
    }
});

// @route   POST /api/resumes
// @desc    Create new resume
// @access  Private
router.post('/', [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('personalInfo.fullName').trim().notEmpty().withMessage('Full name is required'),
    body('personalInfo.email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        // Create resume
        const resume = await Resume.create({
            ...req.body,
            user: req.user._id
        });

        // Update user's resume count
        req.user.resumeCount += 1;
        await req.user.save();

        res.status(201).json({
            status: 'success',
            message: 'Resume created successfully',
            data: {
                resume
            }
        });
    } catch (error) {
        console.error('Create resume error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating resume'
        });
    }
});

// @route   PUT /api/resumes/:id
// @desc    Update resume
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        let resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                status: 'error',
                message: 'Resume not found'
            });
        }

        // Update resume
        resume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.json({
            status: 'success',
            message: 'Resume updated successfully',
            data: {
                resume
            }
        });
    } catch (error) {
        console.error('Update resume error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating resume'
        });
    }
});

// @route   DELETE /api/resumes/:id
// @desc    Delete resume
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                status: 'error',
                message: 'Resume not found'
            });
        }

        await resume.deleteOne();

        // Update user's resume count
        if (req.user.resumeCount > 0) {
            req.user.resumeCount -= 1;
            await req.user.save();
        }

        res.json({
            status: 'success',
            message: 'Resume deleted successfully'
        });
    } catch (error) {
        console.error('Delete resume error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error deleting resume'
        });
    }
});

module.exports = router;
