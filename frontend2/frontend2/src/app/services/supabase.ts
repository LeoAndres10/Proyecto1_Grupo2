import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://qwlduwfxolmihptdhysv.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bGR1d2Z4b2xtaWhwdGRoeXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NDExNjUsImV4cCI6MjA3OTQxNzE2NX0.tYaxj_xZxJEZ0fzigmHWxORiem2hiVCdpdLuEQWXufo';

export const supabase = createClient(supabaseUrl, supabaseKey, {auth:{
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true
}
});

 


