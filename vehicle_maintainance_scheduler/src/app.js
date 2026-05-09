const express = require('express');
const path = require('path');

// Correct path from vehicle_maintainance_scheduler/src/ to logging_middleware/
const loggingMiddleware = require('../../logging_middleware/middleware/loggerMiddleware');
const schedulerRoutes = require('./routes/schedulerRoutes');
const config = require('./config/config');
const Log = require('../../logging_middleware/utils/logger');

const app = express();

// Middleware
app.use(loggingMiddleware);
app.use(express.json());

// Routes
app.use('/api', schedulerRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({ 
        status: "Server is running",
        message: "Visit /api/schedule"
    });
});

app.listen(config.PORT, async () => {
    console.log(`Server started successfully on http://localhost:${config.PORT}`);
    Log('backend', 'info', 'app', `Server started on port ${config.PORT}`);
});