export interface NotifMessage {
  id: string;
  message: string;
  category?: { id: string; name: string };
}
