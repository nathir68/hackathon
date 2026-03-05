const fs = require('fs');
const path = require('path');

async function testApply() {
    try {
        const dummyPdfPath = path.join(__dirname, 'dummy_test.pdf');
        const pdfContent = Buffer.from(
            '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n194\n%%EOF\n'
        );
        fs.writeFileSync(dummyPdfPath, pdfContent);

        // 1. Auth Seeker
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'gokulspt40@gmail.com', password: 'gokul111' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;

        // 2. Auth Recruiter
        const recLoginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'nandhiniraja2408@gmail.com', password: 'nandhu123' })
        });
        const recLoginData = await recLoginRes.json();
        const recToken = recLoginData.token;

        // 3. Create Job
        const jobRes = await fetch('http://localhost:5000/api/jobs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${recToken}`
            },
            body: JSON.stringify({
                title: 'Test Web Engineer',
                description: 'We need react devs',
                location: 'Remote',
                salary: '$100k',
                type: 'Full-time',
                skills: ['React', 'JavaScript']
            })
        });
        const jobData = await jobRes.json();
        const testJobId = jobData._id;

        // 4. Apply
        const formData = new FormData();
        formData.append('jobId', testJobId);

        // Use a blob since fetch's FormData doesn't support streams directly like form-data package does
        const fileContent = fs.readFileSync(dummyPdfPath);
        const fileBlob = new Blob([fileContent], { type: 'application/pdf' });
        formData.append('resume', fileBlob, 'dummy_test.pdf');

        console.log('Applying for job...', testJobId);
        const applyRes = await fetch('http://localhost:5000/api/applications/apply', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const applyData = await applyRes.json();
        if (applyRes.ok) {
            console.log('Success!', applyData);
        } else {
            console.error('Apply Failed:', applyData);
        }

    } catch (e) {
        console.error('Error in script:', e.message);
    }
}

testApply();
