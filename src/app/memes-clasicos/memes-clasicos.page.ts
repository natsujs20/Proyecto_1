import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-memes-clasicos',
  templateUrl: './memes-clasicos.page.html',
  styleUrls: ['./memes-clasicos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MemesClasicosPage implements OnInit {

  posts = [
    {
      id: 1,
      userName: 'RetroMemer',
      userAvatar: 'https://i.pravatar.cc/150?img=7',
      text: 'Forever alone... pero con WiFi 📡😭',
      memeUrl: 'https://i.imgflip.com/1bij.jpg',
      likes: 1234,
      comments: 89,
      createdAt: new Date('2024-01-15T15:30:00'),
      liked: true
    },
    {
      id: 2,
      userName: 'MemeLord2010',
      userAvatar: 'https://i.pravatar.cc/150?img=8',
      text: 'Trollface nunca pasará de moda 😈',
      memeUrl: 'https://i.imgflip.com/2/1otk96.jpg',
      likes: 2567,
      comments: 156,
      createdAt: new Date('2024-01-15T14:20:00'),
      liked: false
    }
  ];

  constructor() { }
  ngOnInit() { }
  toggleLike(post: any) { post.liked = !post.liked; post.liked ? post.likes++ : post.likes--; }
  goBack() { window.history.back(); }
}
