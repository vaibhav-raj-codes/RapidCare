const express = require('express');
const router = express.Router();
const Database = require('../models/componentDbSchema');
const { cloudinary } = require('../cloudConfig');

const sampleData = [
    {
        title: "Choking",
        slug: "choking",
        steps: {
            step1: {
                title: "Assess Severity",
                gifUrl: "https://media.giphy.com/media/3o7TKSjRrfPHOUdZmn/giphy.gif" // Placeholder
            },
            step2: {
                title: "Back Blows",
                gifUrl: "https://media.giphy.com/media/l41lFj8AFGTeKj8E8/giphy.gif" // Placeholder
            },
            step3: {
                title: "Heimlich Maneuver",
                gifUrl: "https://media.giphy.com/media/l0HlPtbGpcnqa0fja/giphy.gif" // Placeholder
            }
        }
    },
    {
        title: "Heart Attack",
        slug: "heart-attack",
        steps: {
            step1: {
                title: "Call Emergency",
                gifUrl: "https://media.giphy.com/media/26xBI73gWquCBBCWQ/giphy.gif"
            },
            step2: {
                title: "CPR",
                gifUrl: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
            },
            step3: {
                title: "AED Usage",
                gifUrl: "https://media.giphy.com/media/3o7TKTDn9WA436mNuk/giphy.gif"
            }
        }
    },
    {
        title: "Stroke",
        slug: "stroke",
        steps: {
            step1: {
                title: "Face Drooping",
                gifUrl: "https://media.giphy.com/media/3o7TENVglptj1n9XGg/giphy.gif"
            },
            step2: {
                title: "Arm Weakness",
                gifUrl: "https://media.giphy.com/media/3o6Zt6ML6JTr5iH7cA/giphy.gif"
            },
            step3: {
                title: "Speech Difficulty",
                gifUrl: "https://media.giphy.com/media/l0HlJDa07IVt2Xc3u/giphy.gif"
            }
        }
    }
];

router.post('/seed', async (req, res) => {
    try {
        await Database.deleteMany({}); // Clear existing data

        for (let emergency of sampleData) {
            // Process steps mapping
            for (let key in emergency.steps) {
                if (emergency.steps.hasOwnProperty(key)) {
                    const step = emergency.steps[key];
                    // Upload to Cloudinary
                    const result = await cloudinary.uploader.upload(step.gifUrl, {
                        folder: 'rapidcare_DEV',
                        resource_type: "auto"
                    });
                    // Update URL to Cloudinary URL
                    emergency.steps[key].gifUrl = result.secure_url;
                }
            }

            const newEmergency = new Database(emergency);
            await newEmergency.save();
        }

        res.status(200).json({ message: "Database seeded successfully with Cloudinary URLs!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// GET route to retrieve data
router.get('/', async (req, res) => {
    try {
        const emergencies = await Database.find({});
        res.json(emergencies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
