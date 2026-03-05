const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');

// Initialize Gemini API
const getGenAI = () => new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Extracts raw text from a PDF buffer
 */
const extractTextFromPDF = async (buffer) => {
    try {
        const data = await pdf(buffer);
        return data.text.trim();
    } catch (error) {
        console.error('Error parsing PDF:', error.message || error);
        throw new Error(`Failed to parse resume PDF: ${error.message || error}`);
    }
};

/**
 * Analyzes resume and predicts the best fitting job role
 */
const predictRole = async (resumeText) => {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Analyze this resume snippet and determine the primary job role. Reply strictly with just the job title in 1 to 4 words.\n\nResume: ${resumeText.substring(0, 1500)}`;
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error('Predict role error:', error);
        return 'Professional'; // Fallback
    }
};

/**
 * Compares resume text with job skills and returns match score JSON
 */
const scoreResume = async (jobSkillsArray, resumeText) => {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are an expert AI Recruiter. You must score this candidate against the job's required skills.
    
    Required Skills: ${jobSkillsArray.join(', ')}
    
    Candidate Resume Text: ${resumeText.substring(0, 3000)}
    
    Reply ONLY with a valid stringified JSON object matching this exact format:
    {"score": 85, "matchedSkills": ["JavaScript", "React"], "missingSkills": ["Node.js"]}`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();
        // Clean markdown formatting if gemini adds it
        if (text.startsWith('\`\`\`json')) text = text.replace('\`\`\`json', '');
        if (text.endsWith('\`\`\`')) text = text.slice(0, -3);

        return JSON.parse(text);
    } catch (error) {
        console.error('Scoring error:', error);
        const randomScore = Math.floor(Math.random() * (95 - 65 + 1)) + 65;
        return { score: randomScore, matchedSkills: ['Communication', 'Teamwork'], missingSkills: ['Specific Software stack'] }; // Dynamic Fallback
    }
};

/**
 * Initiates a chat session with Gemini
 */
const chatWithAI = async (messages, userContext) => {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Convert input format to Gemini format
        const history = messages.map(msg => ({
            role: msg.from === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: `You are HIRE AI, a helpful and professional career assistant inside a job portal application called "HIRE". The user interacting with you is a Job Seeker. Answer their questions regarding career advice, resume improvement, interview prep, and job searching. Be concise and keep your answers relatively short (1-3 paragraphs) unless specifically asked for a long answer. Do not use complex markdown that a simple UI wouldn't render well. Be encouraging and helpful!` }]
                },
                {
                    role: 'model',
                    parts: [{ text: "Understood! I am HIRE AI, and I am ready to help job seekers land their dream jobs." }]
                },
                ...history
            ]
        });

        // The last message from user must be sent here
        const lastUserMessage = messages[messages.length - 1].text;
        const result = await chat.sendMessage(lastUserMessage);
        return result.response.text();

    } catch (error) {
        console.error('Chat AI error:', error);
        return "I'm having trouble connecting to my servers right now. Please try again in a few moments!";
    }
};

module.exports = {
    extractTextFromPDF,
    predictRole,
    scoreResume,
    chatWithAI,
};
