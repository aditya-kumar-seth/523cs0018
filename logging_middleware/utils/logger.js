const axios = require('axios');
const config = require('../config/config');

const Log = async (stack, level, packageName, message) => {
    try {
        // Expanded valid packages
        const validStacks = ['backend', 'frontend'];
        const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
        
        const validBackendPackages = [
            'cache', 'controller', 'cron_job', 'db', 'domain', 
            'handler', 'repository', 'route', 'service', 'middleware', 
            'app', 'config', 'utils'   
        ];

        if (!validStacks.includes(stack)) {
            console.error(`Invalid stack: ${stack}`);
            return;
        }
        if (!validLevels.includes(level)) {
            console.error(`Invalid level: ${level}`);
            return;
        }
        if (stack === 'backend' && !validBackendPackages.includes(packageName)) {
            console.warn(`⚠️ Unknown package: ${packageName} (still logging)`);
        }

        const logData = {
            stack,
            level,
            package: packageName,
            message: String(message)
        };

        if (config.ACCESS_TOKEN) {
            await axios.post(`${config.BASE_URL}/logs`, logData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.ACCESS_TOKEN}`
                }
            });
        }

        console.log(`[${level.toUpperCase()}] ${packageName} → ${message}`);
        
    } catch (error) {
        console.error('Log failed:', error.message);
    }
};

module.exports = Log;