import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone:true,
  imports:[FormsModule,CommonModule]
})
export class AuthComponent {
  username = '';
  password = '';
  isSignUp = false;
  message = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async handleAuth() {
    try {
      if (this.isSignUp) {
        const result = await this.supabaseService.signUp(this.username, this.password);
        alert('Sign-up successful! Please log in.');
        this.isSignUp = false; // Switch to login mode
      } else {
        const user = await this.supabaseService.signIn(this.username, this.password);
        alert('Successfully logged in!');
        this.router.navigate(['/chat']);
      }
    } catch (error: any) {
      this.message = error.message;
    }
  }
}
