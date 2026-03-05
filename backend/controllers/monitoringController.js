const os = require('os');

// @desc    Get real-time server monitoring stats
// @route   GET /api/admin/monitoring
const getMonitoringStats = async (req, res) => {
    try {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;

        const cpus = os.cpus();

        // Simple CPU usage calculation (just a snapshot)
        const cpuUsage = cpus.map(core => {
            const total = Object.values(core.times).reduce((acc, tv) => acc + tv, 0);
            const usage = 100 - (100 * core.times.idle / total);
            return usage;
        });
        const avgCpuUsage = cpuUsage.reduce((a, b) => a + b, 0) / cpuUsage.length;

        const uptime = os.uptime();

        const stats = {
            cpuUsage: avgCpuUsage.toFixed(1),
            memory: {
                total: (totalMem / 1024 / 1024 / 1024).toFixed(2), // GB
                used: (usedMem / 1024 / 1024 / 1024).toFixed(2),
                percentage: ((usedMem / totalMem) * 100).toFixed(1)
            },
            uptime: {
                seconds: uptime,
                formatted: `${Math.floor(uptime / 86400)}d ${Math.floor((uptime % 86400) / 3600)}h`
            },
            platform: os.platform(),
            nodeVersion: process.version
        };

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMonitoringStats };
