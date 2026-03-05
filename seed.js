const mongoose = require('mongoose');
const Template = require('./models/Template');
require('dotenv').config();

// Sample templates data
const templates = [
    {
        name: 'modern-professional',
        displayName: 'Modern Professional',
        description: 'Clean and modern design perfect for tech professionals',
        category: 'modern',
        thumbnail: '/templates/modern-professional.png',
        isPremium: false,
        atsOptimized: true,
        colorScheme: {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#4facfe'
        },
        fonts: {
            heading: 'Space Grotesk',
            body: 'Inter'
        },
        layout: 'single-column',
        popularity: 0,
        isActive: true
    },
    {
        name: 'executive-elite',
        displayName: 'Executive Elite',
        description: 'Sophisticated design for senior executives and C-level positions',
        category: 'executive',
        thumbnail: '/templates/executive-elite.png',
        isPremium: true,
        atsOptimized: true,
        colorScheme: {
            primary: '#1a1a2e',
            secondary: '#16213e',
            accent: '#c4a24c'
        },
        fonts: {
            heading: 'Playfair Display',
            body: 'Lato'
        },
        layout: 'two-column',
        popularity: 0,
        isActive: true
    },
    {
        name: 'creative-spark',
        displayName: 'Creative Spark',
        description: 'Bold and creative design for designers and creative professionals',
        category: 'creative',
        thumbnail: '/templates/creative-spark.png',
        isPremium: false,
        atsOptimized: true,
        colorScheme: {
            primary: '#f093fb',
            secondary: '#f5576c',
            accent: '#4facfe'
        },
        fonts: {
            heading: 'Montserrat',
            body: 'Open Sans'
        },
        layout: 'sidebar',
        popularity: 0,
        isActive: true
    },
    {
        name: 'minimal-clean',
        displayName: 'Minimal Clean',
        description: 'Simple and elegant design that focuses on content',
        category: 'minimal',
        thumbnail: '/templates/minimal-clean.png',
        isPremium: false,
        atsOptimized: true,
        colorScheme: {
            primary: '#2c3e50',
            secondary: '#34495e',
            accent: '#3498db'
        },
        fonts: {
            heading: 'Roboto',
            body: 'Roboto'
        },
        layout: 'single-column',
        popularity: 0,
        isActive: true
    },
    {
        name: 'tech-innovator',
        displayName: 'Tech Innovator',
        description: 'Modern tech-focused design with clean lines',
        category: 'modern',
        thumbnail: '/templates/tech-innovator.png',
        isPremium: true,
        atsOptimized: true,
        colorScheme: {
            primary: '#00d4ff',
            secondary: '#090979',
            accent: '#00d4ff'
        },
        fonts: {
            heading: 'Poppins',
            body: 'Inter'
        },
        layout: 'two-column',
        popularity: 0,
        isActive: true
    }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected');

        // Clear existing templates
        await Template.deleteMany({});
        console.log('🗑️  Cleared existing templates');

        // Insert new templates
        await Template.insertMany(templates);
        console.log(`✅ Inserted ${templates.length} templates`);

        console.log('\n📊 Database seeded successfully!\n');

        // Display seeded templates
        const allTemplates = await Template.find({});
        console.log('Templates in database:');
        allTemplates.forEach(template => {
            console.log(`  - ${template.displayName} (${template.category}) ${template.isPremium ? '👑 Premium' : '🆓 Free'}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeder
seedDatabase();
