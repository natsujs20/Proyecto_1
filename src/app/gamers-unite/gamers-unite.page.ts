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
  gameControllerOutline,
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
  selector: 'app-gamers-unite',
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
  templateUrl: './gamers-unite.page.html',
  styleUrls: ['./gamers-unite.page.scss'],
})
export class GamersUnitePage implements OnInit {
  posts: Post[] = [];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      gameControllerOutline,
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
        userName: 'GamerPro',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        text: 'Cuando tu team pierde porque alguien se desconectó 😤',
        memeUrl: 'https://i.imgflip.com/1bij.jpg',
        likes: 189,
        liked: false,
        comments: 45,
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
