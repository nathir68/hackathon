const pdf = require('pdf-parse');
console.log('pdf type:', typeof pdf);
console.log('pdf structure:', Object.keys(pdf));
if (typeof pdf === 'object') {
    console.log('default:', typeof pdf.default);
}
