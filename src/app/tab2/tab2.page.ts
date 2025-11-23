import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSpinner,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  refresh, 
  heart, 
  heartOutline, 
  shareSocial, 
  sadOutline 
} from 'ionicons/icons';

interface Meme {
  id: string;
  title: string;
  url: string;
  author?: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonSpinner
  ]
})
export class Tab2Page implements OnInit {
  selectedCategory: string = 'random';
  memes: Meme[] = [];
  loading: boolean = false;
  favorites: Meme[] = [];

  // Memes de ejemplo (en una app real, estos vendrían de una API)
  private sampleMemes: Omit<Meme, 'isFavorite'>[] = [
    {
      id: '1',
      title: 'Cuando el código funciona a la primera',
      url: 'https://i.imgflip.com/2/1bij.jpg',
      author: 'Programador Anónimo'
    },
    {
      id: '2',
      title: 'Debugging a las 3 AM',
      url: 'https://i.imgflip.com/2/61kujv.jpg',
      author: 'Dev Life'
    },
    {
      id: '3',
      title: 'CSS en la vida real',
      url: 'https://i.imgflip.com/2/vkfr3.jpg',
      author: 'Frontend Master'
    },
    {
      id: '4',
      title: 'Cuando finalmente encuentras el bug',
      url: 'https://i.imgflip.com/2/3oevdk.jpg',
      author: 'Debug Hero'
    },
    {
      id: '5',
      title: 'Trabajo en equipo',
      url: 'https://i.imgflip.com/2/3oqpsn.jpg',
      author: 'Team Lead'
    }
  ];

  private programmingMemes: Omit<Meme, 'isFavorite'>[] = [
    {
      id: 'p1',
      title: 'Git commit messages be like',
      url: 'https://i.imgflip.com/2/3oqpsn.jpg',
      author: 'Git Master'
    },
    {
      id: 'p2',
      title: 'Stack Overflow saves the day',
      url: 'https://i.imgflip.com/2/1bij.jpg',
      author: 'Copy Paste Pro'
    },
    {
      id: 'p3',
      title: 'Code review feedback',
      url: 'https://i.imgflip.com/2/61kujv.jpg',
      author: 'Senior Dev'
    }
  ];

  constructor(private toastController: ToastController) {
    addIcons({ 
      refresh, 
      heart, 
      heartOutline, 
      shareSocial, 
      sadOutline 
    });
  }

  ngOnInit() {
    this.loadFavorites();
    this.loadRandomMeme();
  }

  onCategoryChange() {
    switch (this.selectedCategory) {
      case 'random':
        this.loadRandomMeme();
        break;
      case 'programming':
        this.loadProgrammingMemes();
        break;
      case 'favorites':
        this.loadFavorites();
        break;
    }
  }

  loadRandomMeme() {
    this.loading = true;
    // Simular carga de API
    setTimeout(() => {
      const randomMeme = this.sampleMemes[Math.floor(Math.random() * this.sampleMemes.length)];
      const memeWithFav = {
        ...randomMeme,
        isFavorite: this.favorites.some(fav => fav.id === randomMeme.id)
      };
      this.memes = [memeWithFav];
      this.loading = false;
    }, 1000);
  }

  loadProgrammingMemes() {
    this.loading = true;
    setTimeout(() => {
      this.memes = this.programmingMemes.map(meme => ({
        ...meme,
        isFavorite: this.favorites.some(fav => fav.id === meme.id)
      }));
      this.loading = false;
    }, 500);
  }

  loadFavorites() {
    const savedFavorites = localStorage.getItem('favorite-memes');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
    this.memes = [...this.favorites];
  }

  toggleFavorite(meme: Meme) {
    const index = this.favorites.findIndex(fav => fav.id === meme.id);
    
    if (index > -1) {
      // Remover de favoritos
      this.favorites.splice(index, 1);
      meme.isFavorite = false;
      this.showToast('Meme removido de favoritos');
    } else {
      // Agregar a favoritos
      this.favorites.push({ ...meme, isFavorite: true });
      meme.isFavorite = true;
      this.showToast('Meme agregado a favoritos');
    }
    
    localStorage.setItem('favorite-memes', JSON.stringify(this.favorites));
    
    // Si estamos viendo favoritos, actualizar la vista
    if (this.selectedCategory === 'favorites') {
      this.loadFavorites();
    }
  }

  async shareMeme(meme: Meme) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: meme.title,
          text: `Mira este meme: ${meme.title}`,
          url: meme.url,
        });
      } catch (error) {
        this.copyToClipboard(meme.url);
      }
    } else {
      this.copyToClipboard(meme.url);
    }
  }

  private copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('URL copiada al portapapeles');
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  onImageLoad() {
    // Se puede usar para hacer algo cuando la imagen se carga
  }
}
