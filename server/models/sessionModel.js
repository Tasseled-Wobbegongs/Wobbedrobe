
const db = require('./db.js');

async function isValidSession(sessionToken) {
    
    try {
        const result = db.query('SELECT * FROM sessions WHERE sessions = $1 AND expires_at > NOW() [created_at]');
        
        return result.rows.length > 0;  
    } catch {
        console.error('Error:', error); 
    }


};
