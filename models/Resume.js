const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    responsibilities: [{
        type: String,
        trim: true
    }],
    achievements: [{
        type: String,
        trim: true
    }]
});

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true,
        trim: true
    },
    institution: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    gpa: {
        type: String,
        trim: true
    },
    honors: [{
        type: String,
        trim: true
    }]
});

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a resume title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    template: {
        type: String,
        default: 'modern'
    },
    personalInfo: {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            trim: true
        },
        linkedin: {
            type: String,
            trim: true
        },
        website: {
            type: String,
            trim: true
        },
        github: {
            type: String,
            trim: true
        }
    },
    summary: {
        type: String,
        trim: true,
        maxlength: [1000, 'Summary cannot be more than 1000 characters']
    },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: {
        technical: [{
            type: String,
            trim: true
        }],
        soft: [{
            type: String,
            trim: true
        }],
        languages: [{
            language: String,
            proficiency: {
                type: String,
                enum: ['beginner', 'intermediate', 'advanced', 'native']
            }
        }]
    },
    certifications: [{
        name: {
            type: String,
            trim: true
        },
        issuer: {
            type: String,
            trim: true
        },
        date: Date,
        credentialId: {
            type: String,
            trim: true
        }
    }],
    projects: [{
        name: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        technologies: [{
            type: String,
            trim: true
        }],
        link: {
            type: String,
            trim: true
        }
    }],
    atsScore: {
        overall: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        formatting: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        keywords: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        lastChecked: Date
    },
    aiEnhanced: {
        type: Boolean,
        default: false
    },
    targetJob: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['draft', 'completed', 'archived'],
        default: 'draft'
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update lastModified on save
resumeSchema.pre('save', function (next) {
    this.lastModified = Date.now();
    next();
});

// Index for faster queries
resumeSchema.index({ user: 1, createdAt: -1 });
resumeSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Resume', resumeSchema);
