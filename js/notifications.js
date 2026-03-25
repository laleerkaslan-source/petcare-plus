import { supabase } from './supabase.js';
import { getState } from './store.js';
import { updateProfile } from './auth.js';

export async function initNotifications() {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return;

  // Register service worker
  try {
    const base = import.meta.env.BASE_URL || '/';
    const registration = await navigator.serviceWorker.register(`${base}sw.js`);
    console.log('SW registered:', registration.scope);
  } catch (err) {
    console.warn('SW registration failed:', err);
  }
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;

  // Get push subscription
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibility: true,
      applicationServerKey: null,
    });

    // Store token in profile
    const { profile } = getState();
    if (profile) {
      await updateProfile({
        id: profile.id,
        push_token: JSON.stringify(subscription),
      });
    }
    return true;
  } catch {
    return false;
  }
}

export function sendLocalNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: `${import.meta.env.BASE_URL || '/'}assets/logo.svg`,
    });
  }
}
