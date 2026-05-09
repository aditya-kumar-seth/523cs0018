const axios = require('axios');
const config = require('../config/config');

const Log = async (stack, level, packageName, message) => {
    try {
        // Input Validation
        const validStacks = ['backend', 'frontend'];
        const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
        const validBackendPackages = ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'];

        if (!validStacks.includes(stack)) {
            console.error(`Invalid stack: ${stack}`);
            return;
        }
        if (!validLevels.includes(level)) {
            console.error(`Invalid level: ${level}`);
            return;
        }
        if (stack === 'backend' && !validBackendPackages.includes(packageName)) {
            console.error(`Invalid package for backend: ${packageName}`);
            return;
        }

        const logData = {
            stack,
            level,
            package: packageName,
            message: message
        };

        const response = await axios.post(
            `${config.BASE_URL}/logs`,
            logData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.ACCESS_TOKEN}`
                }
            }
        );

        console.log(`✅ Log sent: [${level.toUpperCase()}] ${packageName} - ${message}`);
        return response.data;

    } catch (error) {
        console.error('❌ Failed to send log:', error.response?.data || error.message);
    }
};

module.exports = Log;