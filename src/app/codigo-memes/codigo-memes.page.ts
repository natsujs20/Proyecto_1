import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-codigo-memes',
  templateUrl: './codigo-memes.page.html',
  styleUrls: ['./codigo-memes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CodigoMemesPage implements OnInit {

  posts = [
    {
      id: 1,
      userName: 'DevMaster',
      userAvatar: 'https://i.pravatar.cc/150?img=9',
      text: 'Cuando funciona en mi máquina pero no en producción 💻🔥',
      memeUrl: 'https://i.imgflip.com/7n9q8p.jpg',
      likes: 567,
      comments: 78,
      createdAt: new Date(),
      liked: false
    }
  ];

  constructor() { }
  ngOnInit() { }
  toggleLike(post: any) { post.liked = !post.liked; post.liked ? post.likes++ : post.likes--; }
  goBack() { window.history.back(); }
}
