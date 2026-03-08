require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');

const connectDB = require('./config/db');

// Connect Database
connectDB();

const generateData = async () => {
    try {
        console.log('Clearing existing mock data (keeping admins)...');
        await User.deleteMany({ role: { $ne: 'admin' } });
        await Job.deleteMany({});
        await Application.deleteMany({});

        console.log('Generating users...');
        const users = [];
        const passwordHash = await bcrypt.hash('password123', 10);

        // Ensure at least 5 recruiters
        for (let i = 0; i < 5; i++) {
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: passwordHash,
                role: 'recruiter',
                company: faker.company.name(),
                isVerified: true,
                createdAt: faker.date.recent({ days: 30 })
            });
        }

        // Generate 30 seekers
        for (let i = 0; i < 30; i++) {
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: passwordHash,
                role: 'seeker',
                isVerified: true,
                createdAt: faker.date.recent({ days: 30 })
            });
        }

        const createdUsers = await User.insertMany(users);
        const recruiters = createdUsers.filter(u => u.role === 'recruiter');
        const seekers = createdUsers.filter(u => u.role === 'seeker');

        console.log('Generating jobs...');
        const jobs = [];
        const categories = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];

        for (let i = 0; i < 20; i++) {
            const recruiter = recruiters[faker.number.int({ min: 0, max: recruiters.length - 1 })];
            jobs.push({
                title: faker.person.jobTitle(),
                company: recruiter.company,
                location: faker.location.city() + ', ' + faker.location.state({ abbreviated: true }),
                category: categories[faker.number.int({ min: 0, max: categories.length - 1 })],
                type: faker.helpers.arrayElement(['Full-time', 'Part-time', 'Contract', 'Remote']),
                description: faker.lorem.paragraphs(3),
                requirements: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
                responsibilities: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
                salary: `$${faker.number.int({ min: 50, max: 150 })},000 - $${faker.number.int({ min: 160, max: 250 })},000`,
                experienceLevel: faker.helpers.arrayElement(['Entry Length', 'Mid Level', 'Senior Level', 'Lead']),
                status: 'Active',
                recruiterId: recruiter._id,
                createdAt: faker.date.recent({ days: 15 })
            });
        }

        const createdJobs = await Job.insertMany(jobs);

        console.log('Generating applications...');
        const applications = [];
        const statuses = ['Applied', 'Shortlisted', 'Rejected', 'Selected'];

        for (let i = 0; i < 40; i++) {
            const candidate = seekers[faker.number.int({ min: 0, max: seekers.length - 1 })];
            const job = createdJobs[faker.number.int({ min: 0, max: createdJobs.length - 1 })];

            // Prevent duplicate applications
            if (applications.some(a => a.candidateId === candidate._id && a.jobId === job._id)) continue;

            applications.push({
                jobId: job._id,
                candidateId: candidate._id,
                status: faker.helpers.arrayElement(statuses),
                createdAt: faker.date.recent({ days: 10 }),
                resume: 'example-resume-url.pdf',
                aiScore: faker.number.int({ min: 40, max: 99 }),
                matchedSkills: [faker.person.jobArea(), faker.person.jobArea()],
                missingSkills: [faker.person.jobArea()]
            });
        }

        await Application.insertMany(applications);

        console.log(`Successfully generated ${users.length} users, ${jobs.length} jobs, and ${applications.length} applications!`);
        process.exit(0);

    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

generateData();
