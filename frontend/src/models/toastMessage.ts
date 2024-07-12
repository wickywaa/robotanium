export interface IToastMessage {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | null;
}