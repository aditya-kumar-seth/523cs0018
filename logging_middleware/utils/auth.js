const axios = require('axios');
const config = require('../config/config');
const Log = require('./logger');

let token = null;

const getAuthToken = async () => {
    if (token) return token;

    try {
        Log('backend', 'info', 'auth', 'Requesting new access token...');

        const response = await axios.post(`${config.BASE_URL}/auth`, {
            email: "523cs0018@iiitk.ac.in",        
            name: "Aditya Kumar Seth",
            rollNo: "523cs0018",                    
            accessCode: "uZySAT",
            clientID: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET
        });

        token = response.data.access_token;
        config.ACCESS_TOKEN = token;

        Log('backend', 'info', 'auth', 'Token obtained successfully');
        return token;
    } catch (error) {
        Log('backend', 'error', 'auth', `Token failed: ${error.message}`);
        throw error;
    }
};

module.exports = { getAuthToken };