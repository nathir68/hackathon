const router = require('express').Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

async function askGemini(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

// POST /api/ai/resume-score
router.post('/resume-score', auth, async (req, res) => {
    try {
        const { resumeText, jobDescription } = req.body;
        const prompt = `You are an expert HR AI. Score this resume against the job description on a scale of 0-100. Provide a JSON response with: score (number), strengths (array of strings), weaknesses (array of strings), suggestions (array of strings), summary (string).

Resume: ${resumeText}

Job Description: ${jobDescription}

Respond ONLY with valid JSON.`;
        const response = await askGemini(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        res.json(JSON.parse(cleaned));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/ai/ats-check
router.post('/ats-check', auth, async (req, res) => {
    try {
        const { resumeText } = req.body;
        const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze this resume for ATS compatibility. Return JSON with: score (0-100), issues (array of {issue, severity, fix}), keywords_found (array), missing_sections (array), formatting_score (0-100), overall_verdict (string).

Resume: ${resumeText}

Respond ONLY with valid JSON.`;
        const response = await askGemini(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        res.json(JSON.parse(cleaned));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/ai/mock-interview
router.post('/mock-interview', auth, async (req, res) => {
    try {
        const { jobTitle, skills, difficulty, answer, question } = req.body;
        let prompt;
        if (answer && question) {
            prompt = `You are an interview coach. The candidate was asked: "${question}" and answered: "${answer}". Rate the answer (0-10) and provide feedback. Return JSON with: rating (number), feedback (string), better_answer (string), tips (array of strings). Respond ONLY with valid JSON.`;
        } else {
            prompt = `You are an expert interviewer. Generate 5 ${difficulty || 'medium'} difficulty interview questions for a "${jobTitle}" position requiring skills: ${skills || 'general'}. Return JSON with: questions (array of {question, type, tip}). Types: behavioral, technical, situational. Respond ONLY with valid JSON.`;
        }
        const response = await askGemini(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        res.json(JSON.parse(cleaned));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/ai/interview-questions
router.post('/interview-questions', auth, async (req, res) => {
    try {
        const { role, skills, count = 10 } = req.body;
        const prompt = `Generate ${count} interview questions for "${role}" with skills: ${skills}. Mix behavioral, technical, and situational. Return JSON: { questions: [{question, type, difficulty, sample_answer}] }. Respond ONLY with valid JSON.`;
        const response = await askGemini(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        res.json(JSON.parse(cleaned));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/ai/chat
router.post('/chat', auth, async (req, res) => {
    try {
        const { message, context } = req.body;
        const prompt = `You are HIRE AI Assistant, helping job seekers and recruiters. Be helpful, concise, professional. Context: ${context || 'general career advice'}. User: ${message}`;
        const response = await askGemini(prompt);
        res.json({ reply: response });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/ai/job-description
router.post('/job-description', auth, async (req, res) => {
    try {
        const { title, department, skills, experience, type } = req.body;
        const prompt = `Generate a professional job description for: Title: ${title}, Department: ${department}, Skills: ${skills}, Experience: ${experience}, Type: ${type}. Return JSON: {title, overview, responsibilities (array), requirements (array), nice_to_have (array), benefits (array)}. Respond ONLY with valid JSON.`;
        const response = await askGemini(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        res.json(JSON.parse(cleaned));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/ai/career-predictor
router.post('/career-predictor', auth, async (req, res) => {
    try {
        const { skills, experience, currentRole, interests } = req.body;
        const prompt = `As a career advisor AI, predict career paths. Current role: ${currentRole}, Skills: ${skills}, Experience: ${experience}, Interests: ${interests}. Return JSON: {paths: [{role, probability, timeline, skills_needed, salary_range, description}], advice (string)}. Respond ONLY with valid JSON.`;
        const response = await askGemini(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        res.json(JSON.parse(cleaned));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/ai/shortlist
router.post('/shortlist', auth, async (req, res) => {
    try {
        const { candidates, jobRequirements } = req.body;
        const prompt = `As an AI recruiter, rank these candidates for the job. Job: ${jobRequirements}. Candidates: ${JSON.stringify(candidates)}. Return JSON: {rankings: [{name, score, strengths, concerns}], summary (string)}. Respond ONLY with valid JSON.`;
        const response = await askGemini(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        res.json(JSON.parse(cleaned));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/ai/resume-builder
router.post('/resume-builder', auth, async (req, res) => {
    try {
        const { name, skills, experience, education, targetRole } = req.body;
        const prompt = `Create a professional resume for: Name: ${name}, Target: ${targetRole}, Skills: ${skills}, Experience: ${experience}, Education: ${education}. Return JSON: {summary, sections: [{title, content}], tips (array)}. Respond ONLY with valid JSON.`;
        const response = await askGemini(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        res.json(JSON.parse(cleaned));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
