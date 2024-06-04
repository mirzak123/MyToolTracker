export interface ActivityLog {
  id: number;
  timestamp: string;
  userId: number;
  actionType: string;
  entityId: number;
  entityType: string;
  description: string;
}
