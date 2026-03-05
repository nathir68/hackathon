const fs = require('fs');
const path = require('path');

const dynamicRecruiter = 'userName={(JSON.parse(localStorage.getItem("hire_user")||\'{"name":"Guest"}\').name)}';
const dynamicAdmin = 'userName={(JSON.parse(localStorage.getItem("hire_user")||\'{"name":"Admin"}\').name)}';

function fixDir(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixDir(fullPath);
        } else if (entry.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            if (content.includes('userName="Sarah Chen"')) {
                content = content.replace(/userName="Sarah Chen"/g, dynamicRecruiter);
                changed = true;
            }
            if (content.includes('userName="Admin"')) {
                content = content.replace(/userName="Admin"/g, dynamicAdmin);
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed:', fullPath);
            }
        }
    }
}

fixDir('d:/HIRE/HIRE/frontend/src/Pages');
console.log('Done!');
