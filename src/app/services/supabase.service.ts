import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environments } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environments.supabaseUrl, environments.supabaseKey);
  }
  //authentication
  async signUp(username: string, password: string) {
    // Check if username already exists
    const { data: existingUser } = await this.supabase
      .from('users_table')
      .select('*')
      .eq('username', username)
      .single();

    if (existingUser) {
      throw new Error('Username already taken.');
    }

    // Insert new user
    const { error } = await this.supabase
      .from('users_table')
      .insert({ username, password });

    if (error) throw error;
    return { message: 'User registered successfully!' };
  }

  async signIn(username: string, password: string) {
    const { data: user, error } = await this.supabase
      .from('users_table')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !user) {
      throw new Error('Invalid username or password.');
    }
    return user;
  }

  //real time messaging
   // Send a message
   async sendMessage(content: string, sender: string) {
    const { error } = await this.supabase
      .from('messages')
      .insert({ content, sender });

    if (error) {
      console.error('Error sending message:', error.message);
    }
  }

  // Get all messages
  async getMessages() {
    return this.supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
  }

  // Listen for real-time messages
  onNewMessage(callback: (message: any) => void) {
    this.supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        callback(payload.new);
      })
      .subscribe();
  }
}
