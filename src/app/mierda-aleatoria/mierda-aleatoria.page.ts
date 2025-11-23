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
  shuffleOutline,
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
  selector: 'app-mierda-aleatoria',
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
  templateUrl: './mierda-aleatoria.page.html',
  styleUrls: ['./mierda-aleatoria.page.scss'],
})
export class MierdaAleatoriaPage implements OnInit {
  posts: Post[] = [];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      shuffleOutline,
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
        userName: 'RandomDude',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b378?w=150',
        text: 'Contenido aleatorio y absurdo 🤪',
        memeUrl: 'https://i.imgflip.com/2fm6x.jpg',
        likes: 234,
        liked: false,
        comments: 56,
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
