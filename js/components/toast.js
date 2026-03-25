import { animateToastIn, animateToastOut } from '../animations.js';

export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  animateToastIn(toast);

  setTimeout(() => {
    animateToastOut(toast);
  }, duration);
}
