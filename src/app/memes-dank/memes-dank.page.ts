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
  flameOutline,
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
  selector: 'app-memes-dank',
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
  templateUrl: './memes-dank.page.html',
  styleUrls: ['./memes-dank.page.scss'],
})
export class MemesDankPage implements OnInit {
  posts: Post[] = [];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      flameOutline,
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
        userName: 'DankMaster',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        text: 'Memes bien salados y picantes 🔥',
        memeUrl: 'https://i.imgflip.com/7kqyen.jpg',
        likes: 456,
        liked: false,
        comments: 89,
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
