import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-humor-negro',
  templateUrl: './humor-negro.page.html',
  styleUrls: ['./humor-negro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HumorNegroPage implements OnInit {

  posts = [
    {
      id: 1,
      userName: 'DarkHumorist',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      text: 'Mi vida amorosa es como mi batería del teléfono... siempre en rojo 🔋💔',
      memeUrl: 'https://i.imgflip.com/7n9q8n.jpg',
      likes: 89,
      comments: 15,
      createdAt: new Date('2024-01-15T19:30:00'),
      liked: false
    },
    {
      id: 2,
      userName: 'SarcasmoLetal',
      userAvatar: 'https://i.pravatar.cc/150?img=6',
      text: 'Cuando dicen "todo pasa por algo" y yo sigo esperando a que pase algo bueno 😐⏰',
      memeUrl: 'https://i.imgflip.com/7n9q8o.jpg',
      likes: 156,
      comments: 28,
      createdAt: new Date('2024-01-15T18:15:00'),
      liked: true
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleLike(post: any) {
    post.liked = !post.liked;
    if (post.liked) {
      post.likes++;
    } else {
      post.likes--;
    }
  }

  goBack() {
    window.history.back();
  }

}
