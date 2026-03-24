// Push notification utility for exam deadline reminders
// Uses the browser Notification API (no server needed)

const NOTIF_PERMISSION_KEY = 'vzk_notif_asked';
const NOTIF_SCHEDULE_KEY = 'vzk_notif_schedule';

export interface ScheduledNotification {
  id: string;
  title: string;
  body: string;
  triggerDate: string; // ISO date string
  sent: boolean;
}

/** Check if push notifications are supported */
export const isNotificationSupported = (): boolean => {
  return 'Notification' in window;
};

/** Request permission (call once, on user action) */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!isNotificationSupported()) return false;

  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  const result = await Notification.requestPermission();
  localStorage.setItem(NOTIF_PERMISSION_KEY, 'true');
  return result === 'granted';
};

/** Show a notification immediately */
export const showNotification = (title: string, body: string, url?: string): void => {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;

  const notif = new Notification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'vzk-exam-reminder',
    requireInteraction: true,
  });

  if (url) {
    notif.onclick = () => {
      window.focus();
      window.location.href = url;
      notif.close();
    };
  }
};

/** Schedule a notification for a future date (saves to localStorage) */
export const scheduleNotification = (notif: Omit<ScheduledNotification, 'sent'>): void => {
  const existing = getScheduledNotifications();
  const updated = [...existing.filter(n => n.id !== notif.id), { ...notif, sent: false }];
  localStorage.setItem(NOTIF_SCHEDULE_KEY, JSON.stringify(updated));
};

/** Get all scheduled notifications */
export const getScheduledNotifications = (): ScheduledNotification[] => {
  try {
    const raw = localStorage.getItem(NOTIF_SCHEDULE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/** Check and fire any due notifications (call this periodically) */
export const checkScheduledNotifications = (): void => {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;

  const now = new Date();
  const notifications = getScheduledNotifications();
  let updated = false;

  for (const notif of notifications) {
    if (!notif.sent && new Date(notif.triggerDate) <= now) {
      showNotification(notif.title, notif.body, '/edu-cutoff');
      notif.sent = true;
      updated = true;
    }
  }

  if (updated) {
    localStorage.setItem(NOTIF_SCHEDULE_KEY, JSON.stringify(notifications));
  }
};

/** Schedule default exam deadline reminders for 2026 */
export const scheduleExamReminders = (): void => {
  const reminders = [
    { id: 'tnea-reg-2026', title: '⚠️ TNEA Registration Closing Soon!', body: 'TNEA 2026 registration deadline is approaching. Register now at tneaonline.org', triggerDate: '2026-05-25T09:00:00+05:30' },
    { id: 'tnea-cert-2026', title: '📋 TNEA Certificate Upload Deadline', body: 'Upload your 12th marksheet, community cert & documents before the deadline.', triggerDate: '2026-06-10T09:00:00+05:30' },
    { id: 'tnea-choice-2026', title: '🎯 TNEA Choice Filling Opens!', body: 'Fill 50-100+ college choices now. More choices = better chance. Don\'t forget to LOCK!', triggerDate: '2026-07-01T09:00:00+05:30' },
    { id: 'neet-reg-2026', title: '🏥 NEET TN Counselling Registration', body: 'Register for TN Medical counselling at tnmedicalselection.net', triggerDate: '2026-07-05T09:00:00+05:30' },
    { id: 'josaa-reg-2026', title: '🎯 JoSAA Registration Open!', body: 'Register for IIT/NIT/IIIT admission at josaa.nic.in. Don\'t miss the deadline!', triggerDate: '2026-06-15T09:00:00+05:30' },
    { id: 'tnau-reg-2026', title: '🌾 TNAU Application Opens', body: 'Apply for TNAU Agriculture courses at tnau.ac.in', triggerDate: '2026-06-20T09:00:00+05:30' },
  ];

  for (const r of reminders) {
    scheduleNotification(r);
  }
};

/** Start the notification checker (runs every 30 minutes) */
let checkerInterval: ReturnType<typeof setInterval> | null = null;

export const startNotificationChecker = (): void => {
  if (checkerInterval) return;

  // Check immediately
  checkScheduledNotifications();

  // Then check every 30 minutes
  checkerInterval = setInterval(checkScheduledNotifications, 30 * 60 * 1000);
};

export const stopNotificationChecker = (): void => {
  if (checkerInterval) {
    clearInterval(checkerInterval);
    checkerInterval = null;
  }
};
