import * as os from 'os';
import { IProcessInfoResponse, IResourceUsageResponse, IServerTimeResponse, ISystemInfoResponse, ISystemStatusService } from './system-status.service.interface';

export class SystemStatusService implements ISystemStatusService {

	getSystemInfo(): ISystemInfoResponse {
		try {
			const response: ISystemInfoResponse = {
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
		} catch (err) {

		}
	}

	getServerTime(): IServerTimeResponse {
		try {
			const now: Date = new Date();
			const utc: Date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
			const time: IServerTimeResponse = {
				utc,
				date: now,
			};
			return time;
		} catch (error) {

		}
	}

	getResourceUsage(): IResourceUsageResponse {
		try {
			const totalMem: number = os.totalmem();
			const memProc: NodeJS.MemoryUsage = process.memoryUsage();
			const freeMem: number = os.freemem();

			const response: IResourceUsageResponse = {
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
		} catch (err) {

		}
	}

	getProcessInfo(): IProcessInfoResponse {
		try {
			const response: IProcessInfoResponse = {
				procCpu: process.cpuUsage(),
				memUsage: process.memoryUsage(),
				env: process.env,
				pid: process.pid,
				uptime: process.uptime(),
				applicationVersion: process.version,
				nodeDependencyVersions: process.versions,
			};
			return response;
		} catch (err) {

		}
	}
}

