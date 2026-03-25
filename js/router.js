import { getState } from './store.js';
import { animatePageIn, popNavIcon } from './animations.js';

const routes = {};
let currentCleanup = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return window.location.hash.slice(1) || '/login';
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

async function handleRoute() {
  const hash = getCurrentRoute();
  const { user } = getState();

  // Auth guard
  const publicRoutes = ['/login', '/register'];
  if (!user && !publicRoutes.includes(hash)) {
    navigate('/login');
    return;
  }
  if (user && publicRoutes.includes(hash)) {
    navigate('/dashboard');
    return;
  }

  // Find matching route
  let handler = routes[hash];

  // Try dynamic routes (e.g. /pet/:id)
  if (!handler) {
    for (const [pattern, h] of Object.entries(routes)) {
      const regex = patternToRegex(pattern);
      const match = hash.match(regex);
      if (match) {
        handler = () => h(match.groups);
        break;
      }
    }
  }

  if (!handler) {
    handler = routes['/dashboard'] || routes['/login'];
  }

  // Cleanup previous page
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  const content = document.getElementById('page-content');
  const navbar = document.getElementById('navbar');

  // Show/hide navbar
  if (publicRoutes.includes(hash)) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
    updateActiveNav(hash);
  }

  // Render page
  if (handler) {
    const result = await handler();
    if (typeof result === 'string') {
      content.innerHTML = result;
    }
    // If handler returns a cleanup function
    if (typeof result === 'object' && result.cleanup) {
      currentCleanup = result.cleanup;
    }
    // Animate page entrance
    animatePageIn(content);
  }
}

function patternToRegex(pattern) {
  const regexStr = pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)');
  return new RegExp(`^${regexStr}$`);
}

function updateActiveNav(hash) {
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.dataset.route;
    const wasActive = item.classList.contains('active');
    const isActive = hash === href || hash.startsWith(href + '/');
    item.classList.toggle('active', isActive);
    if (isActive && !wasActive) popNavIcon(item);
  });
}
