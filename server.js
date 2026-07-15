// ============================================
// PERSONAL DIGITAL VAULT - EXPRESS SERVER
// ============================================

const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes (for future expansion)
app.get('/api/vault/status', (req, res) => {
    res.json({
        status: 'active',
        message: 'Vault is ready',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/vault/backup', (req, res) => {
    res.json({
        success: true,
        message: 'Backup created successfully',
        backupId: Date.now(),
        timestamp: new Date().toISOString()
    });
});

app.post('/api/vault/sync', (req, res) => {
    res.json({
        success: true,
        message: 'Sync completed',
        lastSync: new Date().toISOString()
    });
});

app.get('/api/vault/stats', (req, res) => {
    res.json({
        totalItems: 207,
        securityScore: 95,
        storageUsed: '2.4 GB',
        storageLimit: '100 GB',
        lastBackup: new Date().toISOString()
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start Server
app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║  Personal Digital Vault Server        ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║  Server running on: http://localhost:${PORT}`.padEnd(41) + '║');
    console.log('║  Press Ctrl+C to stop the server      ║');
    console.log('╚════════════════════════════════════════╝');
});

process.on('SIGINT', () => {
    console.log('\n\n✓ Server stopped gracefully');
    process.exit(0);
});
