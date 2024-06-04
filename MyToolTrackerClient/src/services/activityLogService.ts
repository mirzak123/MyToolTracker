import { ActivityLog } from "@/types/activityLog";
import api from "@/config/axios";

export interface IActivityLogService {
  getRecentActivities(): Promise<ActivityLog[]>;
}

export class ActivityLogService implements IActivityLogService {
  public async getRecentActivities(): Promise<ActivityLog[]> {
    const response = await api.get("/api/ActivityLogs/recent");
    return response.data;
  }
}
