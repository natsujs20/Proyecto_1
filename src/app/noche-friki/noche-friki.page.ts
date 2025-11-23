import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-noche-friki',
  templateUrl: './noche-friki.page.html',
  styleUrls: ['./noche-friki.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class NocheFrikiPage implements OnInit {

  posts = [
    {
      id: 1,
      userName: 'GamerFreak',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      text: 'Cuando tu mamá te dice que ya es hora de dormir pero tienes una raid importante 🎮😴',
      memeUrl: 'https://i.imgflip.com/7n9q8k.jpg',
      likes: 156,
      comments: 23,
      createdAt: new Date('2024-01-15T22:30:00'),
      liked: false
    },
    {
      id: 2,
      userName: 'NerdPower',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      text: 'Yo a las 3 AM debugeando código que funcionaba perfectamente ayer 💻🔥',
      memeUrl: 'https://i.imgflip.com/7n9q8l.jpg',
      likes: 234,
      comments: 45,
      createdAt: new Date('2024-01-15T21:45:00'),
      liked: true
    },
    {
      id: 3,
      userName: 'AnimeKing',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      text: 'Cuando tu anime favorito tiene filler episodes 😭📺',
      memeUrl: 'https://i.imgflip.com/7n9q8m.jpg',
      likes: 89,
      comments: 12,
      createdAt: new Date('2024-01-15T20:15:00'),
      liked: false
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
