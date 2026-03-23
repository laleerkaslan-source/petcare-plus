import { supabase } from './supabase.js';
import { setState } from './store.js';
import { navigate } from './router.js';

export async function initAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    setState('user', session.user);
    await loadProfile(session.user.id);
  }

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      setState('user', session.user);
      await loadProfile(session.user.id);
    } else {
      setState('user', null);
      setState('profile', null);
      navigate('/login');
    }
  });
}

async function loadProfile(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (data) {
    setState('profile', data);
  }
}

export async function signUp(email, password, displayName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName }
    }
  });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  setState('user', null);
  setState('profile', null);
  navigate('/login');
}

export async function updateProfile(updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', updates.id)
    .select()
    .single();
  if (error) throw error;
  setState('profile', data);
  return data;
}
