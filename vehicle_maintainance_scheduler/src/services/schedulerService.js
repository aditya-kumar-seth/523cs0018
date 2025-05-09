const axios = require('axios');
const Log = require('../../../logging_middleware/utils/logger');
const { getAuthToken } = require('../../../logging_middleware/utils/auth');
const config = require('../config/config');

const scheduleTasks = (tasks, maxHours) => {
    let totalImpact = 0;
    let usedHours = 0;
    let selected = [];

    // Simple greedy: sort by Impact (highest first)
    const sortedTasks = [...tasks].sort((a, b) => 
        (b.Impact || b.impact) - (a.Impact || a.impact)
    );

    for (const task of sortedTasks) {
        const duration = parseInt(task.Duration || task.duration || 0);
        const impact = parseInt(task.Impact || task.impact || 0);

        if (duration > 0 && usedHours + duration <= maxHours) {
            usedHours += duration;
            totalImpact += impact;
            selected.push(task.TaskID || task.id);
        }
    }

    return { totalImpact, usedHours, selectedTasks: selected };
};

const processAllDepots = async () => {
    try {
        const token = await getAuthToken();
        Log('backend', 'info', 'service', 'Starting Scheduler');

        const [depotsRes, vehiclesRes] = await Promise.all([
            axios.get(`${config.BASE_URL}/depots`, { headers: { Authorization: `Bearer ${token}` }}),
            axios.get(`${config.BASE_URL}/vehicles`, { headers: { Authorization: `Bearer ${token}` }})
        ]);

        const depots = depotsRes.data.depots || depotsRes.data || [];
        const vehicles = vehiclesRes.data.vehicles || vehiclesRes.data || [];

        Log('backend', 'info', 'service', `Fetched ${depots.length} depots and ${vehicles.length} tasks`);

        const results = depots.map(depot => {
            const depotId = depot.ID || depot.id;
            const maxHours = parseInt(depot.MechanicHours || depot.mechanicHours || 0);

            // Since no depotId in vehicles, we assign ALL vehicles to every depot (as per current data)
            const schedule = scheduleTasks(vehicles, maxHours);

            Log('backend', 'info', 'service', 
                `Depot ${depotId} → Impact: ${schedule.totalImpact} | Hours: ${schedule.usedHours}/${maxHours}`);

            return {
                depotId,
                totalImpact: schedule.totalImpact,
                usedHours: schedule.usedHours,
                selectedTasks: schedule.selectedTasks.length
            };
        });

        return results;

    } catch (error) {
        Log('backend', 'error', 'service', error.message);
        throw error;
    }
};

module.exports = { processAllDepots };