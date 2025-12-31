const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for CDN resources
}));

// Compression middleware
app.use(compression());

// Static files middleware
app.use(express.static(path.join(__dirname), {
    maxAge: '1d',
    etag: true,
    lastModified: true
}));

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
    console.log('\n===========================================');
    console.log('🚀 Server is running!');
    console.log('===========================================');
    console.log(`📍 Local:            http://localhost:${PORT}`);
    console.log(`📍 Network:          http://${getLocalIP()}:${PORT}`);
    console.log('===========================================');
    console.log('Press Ctrl+C to stop the server\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n👋 SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n👋 SIGINT signal received: closing HTTP server');
    process.exit(0);
});

// Helper function to get local IP
function getLocalIP() {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal addresses
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }

    return 'localhost';
}
