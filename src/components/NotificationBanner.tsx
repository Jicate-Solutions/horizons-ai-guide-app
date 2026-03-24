import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { requestNotificationPermission, isNotificationSupported, scheduleExamReminders, startNotificationChecker } from '@/lib/notifications';

const NotificationBanner = () => {
  const [show, setShow] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    // Only show if: notifications supported, not yet asked, not already granted
    if (!isNotificationSupported()) return;
    if (Notification.permission === 'granted' || Notification.permission === 'denied') return;
    if (localStorage.getItem('vzk_notif_dismissed')) return;

    // Show after 5 seconds
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnable = async () => {
    const result = await requestNotificationPermission();
    if (result) {
      setGranted(true);
      scheduleExamReminders();
      startNotificationChecker();
      setTimeout(() => setShow(false), 2000);
    } else {
      setShow(false);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('vzk_notif_dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-[380px] z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-emerald-200 dark:border-emerald-800 p-4 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {granted ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">✅</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Notifications enabled!</p>
              <p className="text-xs text-gray-500 mt-0.5">We'll remind you before exam deadlines.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-3 mb-3 pr-6">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Don't miss exam deadlines!</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                  Get reminded before TNEA, NEET, JEE & other registration deadlines close.
                </p>
              </div>
            </div>
            <div className="flex gap-2 ml-[52px]">
              <button
                onClick={handleEnable}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                Enable Reminders
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold transition-colors hover:bg-gray-200"
              >
                Later
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationBanner;
