import { initAuth } from './auth.js';
import { initI18n } from './i18n.js';
import { registerRoute, initRouter, navigate } from './router.js';
import { getState, on } from './store.js';
import { renderNavbar } from './components/navbar.js';
import { initNotifications } from './notifications.js';

// Page imports
import loginPage from './pages/login.js';
import registerPage from './pages/register.js';
import dashboardPage from './pages/dashboard.js';
import petProfilePage from './pages/pet-profile.js';
import petDetailPage from './pages/pet-detail.js';
import vaccineCalendarPage from './pages/vaccine-calendar.js';
import healthTipsPage from './pages/health-tips.js';
import activitiesPage from './pages/activities.js';
import settingsPage from './pages/settings.js';
import premiumPage from './pages/premium.js';

async function init() {
  // Init i18n
  await initI18n();

  // Register routes
  registerRoute('/login', loginPage);
  registerRoute('/register', registerPage);
  registerRoute('/dashboard', dashboardPage);
  registerRoute('/pet/new', petProfilePage);
  registerRoute('/pet/:id', (params) => petDetailPage(params));
  registerRoute('/pet/:id/edit', (params) => petProfilePage(params));
  registerRoute('/vaccines', vaccineCalendarPage);
  registerRoute('/tips', healthTipsPage);
  registerRoute('/activities', activitiesPage);
  registerRoute('/settings', settingsPage);
  registerRoute('/premium', premiumPage);

  // Init auth (sets user state)
  await initAuth();

  // Render navbar
  renderNavbar();

  // Re-render navbar on language change
  on('language', () => renderNavbar());

  // Init notifications & service worker
  initNotifications();

  // Init router (handles initial page render)
  initRouter();

  // Default route
  if (!window.location.hash) {
    const { user } = getState();
    navigate(user ? '/dashboard' : '/login');
  }
}

init();
