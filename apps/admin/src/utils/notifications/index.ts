import { v4 as uuid } from 'uuid';
import axios, { AxiosError } from 'axios';
import { create } from 'zustand/react';

// what a rendered-notification looks like
export type Notification = {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
};

type NotificationState = {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: ({ message, type }) =>
    set((s) => ({
      notifications: [...s.notifications, { id: uuid(), message, type }],
    })),
  removeNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

// -- low-level: just push one or many onto the queue --
export const showNotification = (
  notifs: Omit<Notification, 'id'> | Omit<Notification, 'id'>[]
) => {
  const add = useNotificationStore.getState().addNotification;
  const list = Array.isArray(notifs) ? notifs : [notifs];
  list.forEach((n) => add(n));
};

// — high-level: take any thrown error and extract human messages —
export function handleMutationError(error: unknown) {
  const toShow: Omit<Notification, 'id'>[] = [];

  // 1) AxiosError with a response payload
  if (axios.isAxiosError(error)) {
    const data = (error as AxiosError).response?.data as any;

    // a) if it has an "errors" map of string arrays
    if (data?.errors && typeof data.errors === 'object') {
      Object.values(data.errors).forEach((errs: any) =>
        Array.isArray(errs)
          ? errs.forEach((msg) =>
              toShow.push({ message: String(msg), type: 'error' })
            )
          : toShow.push({ message: String(errs), type: 'error' })
      );
    }
    // b) if it has a single "description" or "message" field
    else if (data?.error || data?.message) {
      toShow.push({
        message: String(data.error ?? data.message),
        type: 'error',
      });
    }
    // c) fallback to the AxiosError’s message
    else {
      toShow.push({ message: error.message, type: 'error' });
    }
  }
  // 2) plain JS Error
  else if (error instanceof Error) {
    toShow.push({ message: error.message, type: 'error' });
  }
  // 3) anything else
  else {
    toShow.push({ message: String(error), type: 'error' });
  }

  showNotification(toShow);
}
