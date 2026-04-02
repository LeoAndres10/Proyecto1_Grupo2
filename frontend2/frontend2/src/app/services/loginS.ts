import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { supabase } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class LoginS {

 

  constructor() {}

  // Login con Supabase
   login(userData: { email: string; password: string }): Observable<any> {
    const { email: email, password: password } = userData;

    return from(
      supabase.auth.signInWithPassword({ email, password })
        .then(({ data, error }) => {
          if (error) throw error;
          return data; // data contiene session y user
        })
    );
  }

  // Registro opcional
  register(email: string, password: string): Observable<any> {
    return from(
      supabase.auth.signUp({
        email,
        password
      })
    );
  }

  // Logout
  logout(): Observable<any> {
    return from(supabase.auth.signOut());
  }
}