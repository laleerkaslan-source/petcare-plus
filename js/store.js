const state = {
  user: null,
  profile: null,
  pets: [],
  language: localStorage.getItem('lang') || 'tr',
  loading: false,
};

const listeners = {};

export function getState() {
  return state;
}

export function setState(key, value) {
  state[key] = value;
  if (key === 'language') {
    localStorage.setItem('lang', value);
  }
  emit(key, value);
}

export function on(event, callback) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
  return () => {
    listeners[event] = listeners[event].filter(cb => cb !== callback);
  };
}

function emit(event, data) {
  if (listeners[event]) {
    listeners[event].forEach(cb => cb(data));
  }
}
