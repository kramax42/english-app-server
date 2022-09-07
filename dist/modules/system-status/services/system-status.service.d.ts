import { IProcessInfoResponse, IResourceUsageResponse, IServerTimeResponse, ISystemInfoResponse, ISystemStatusService } from './system-status.service.interface';
export declare class SystemStatusService implements ISystemStatusService {
    getSystemInfo(): ISystemInfoResponse;
    getServerTime(): IServerTimeResponse;
    getResourceUsage(): IResourceUsageResponse;
    getProcessInfo(): IProcessInfoResponse;
}
