import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage = '';
  username = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit() {
    // Prompt for username if not set
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    } else {
      this.username = prompt('Enter your username:') || 'Anonymous';
      localStorage.setItem('username', this.username);
    }

    // Fetch messages
    const { data, error } = await this.supabaseService.getMessages();
    if (data) {
      this.messages = data;
    }

    // Listen for real-time messages
    this.supabaseService.onNewMessage((message) => {
      this.messages.push(message);
    });
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      await this.supabaseService.sendMessage(this.newMessage, this.username);
      this.newMessage = '';
    }
  }

  logout() {
    localStorage.removeItem('username');
    alert('You have been logged out.');
    this.router.navigate(['/']);
  }
}
