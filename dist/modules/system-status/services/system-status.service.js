"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemStatusService = void 0;
const tslib_1 = require("tslib");
const os = tslib_1.__importStar(require("os"));
class SystemStatusService {
    getSystemInfo() {
        try {
            const response = {
                cpus: os.cpus(),
                network: os.networkInterfaces(),
                os: {
                    platform: process.platform,
                    version: os.release(),
                    totalMemory: os.totalmem(),
                    uptime: os.uptime(),
                },
                currentUser: os.userInfo(),
            };
            return response;
        }
        catch (err) {
        }
    }
    getServerTime() {
        try {
            const now = new Date();
            const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
            const time = {
                utc,
                date: now,
            };
            return time;
        }
        catch (error) {
        }
    }
    getResourceUsage() {
        try {
            const totalMem = os.totalmem();
            const memProc = process.memoryUsage();
            const freeMem = os.freemem();
            const response = {
                processMemory: memProc,
                systemMemory: {
                    free: freeMem,
                    total: totalMem,
                    percentFree: Math.round((freeMem / totalMem) * 100),
                },
                processCpu: process.cpuUsage(),
                systemCpu: os.cpus(),
            };
            return response;
        }
        catch (err) {
        }
    }
    getProcessInfo() {
        try {
            const response = {
                procCpu: process.cpuUsage(),
                memUsage: process.memoryUsage(),
                env: process.env,
                pid: process.pid,
                uptime: process.uptime(),
                applicationVersion: process.version,
                nodeDependencyVersions: process.versions,
            };
            return response;
        }
        catch (err) {
        }
    }
}
exports.SystemStatusService = SystemStatusService;
//# sourceMappingURL=system-status.service.js.map