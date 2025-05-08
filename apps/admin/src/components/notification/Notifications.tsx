import { useNotificationStore } from '@/utils/notifications';

export function Notifications() {
  const { notifications, removeNotification } = useNotificationStore();
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          onClick={() => removeNotification(id)}
          className={`
            p-3 rounded shadow-lg cursor-pointer
            ${type === 'error' ? 'bg-red-100 text-red-800' : ''}
            ${type === 'success' ? 'bg-green-100 text-green-800' : ''}
            ${type === 'info' ? 'bg-blue-100 text-blue-800' : ''}
            ${type === 'warning' ? 'bg-yellow-100 text-yellow-800' : ''}
          `}
        >
          {message}
        </div>
      ))}
    </div>
  );
}
