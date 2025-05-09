const Log = require('../../../logging_middleware/utils/logger');
const { processAllDepots } = require('../services/schedulerService');

const scheduleMaintenance = async (req, res) => {
    try {
        Log('backend', 'info', 'controller', 'Vehicle maintenance scheduling request received');

        const results = await processAllDepots();

        Log('backend', 'info', 'controller', `Successfully processed ${results.length} depots`);

        res.status(200).json({
            success: true,
            message: "Vehicle maintenance scheduling completed successfully",
            totalDepotsProcessed: results.length,
            results: results
        });

    } catch (error) {
        Log('backend', 'error', 'controller', `Scheduling failed: ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: "Internal server error during scheduling",
            error: error.message
        });
    }
};

module.exports = { scheduleMaintenance };