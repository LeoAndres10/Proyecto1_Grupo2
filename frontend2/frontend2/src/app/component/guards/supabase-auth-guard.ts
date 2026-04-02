import { CanActivateFn, Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl,supabaseKey, supabase } from '../../services/supabase';
import { inject } from '@angular/core';

export const supabaseAuthGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const { data } = await supabase.auth.getSession();

  if (data?.session) return true;

  router.navigate(['/login']);
  return false;
};
