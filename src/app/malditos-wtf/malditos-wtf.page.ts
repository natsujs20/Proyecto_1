import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonAvatar,
  IonFab,
  IonFabButton,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  eyeOutline,
  add,
  heart,
  heartOutline,
  chatbubbleOutline,
  shareOutline,
} from 'ionicons/icons';

interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  memeUrl: string;
  likes: number;
  liked: boolean;
  comments: number;
  createdAt: Date;
}

@Component({
  selector: 'app-malditos-wtf',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonAvatar,
    IonFab,
    IonFabButton,
    IonChip,
    IonLabel,
  ],
  templateUrl: './malditos-wtf.page.html',
  styleUrls: ['./malditos-wtf.page.scss'],
})
export class MalditosWTFPage implements OnInit {
  posts: Post[] = [];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      eyeOutline,
      add,
      heart,
      heartOutline,
      chatbubbleOutline,
      shareOutline,
    });
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.posts = [
      {
        id: '1',
        userName: 'CursedVibes',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        text: 'Contenido maldito y perturbador 👁️',
        memeUrl: 'https://i.imgflip.com/26am.jpg',
        likes: 123,
        liked: false,
        comments: 34,
        createdAt: new Date(),
      },
    ];
  }

  goBack() {
    this.router.navigate(['/tabs/feed']);
  }

  toggleLike(post: Post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }
}
