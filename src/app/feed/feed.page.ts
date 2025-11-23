import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonInput,
  IonCheckbox,
  IonSpinner,
  IonFab,
  IonFabButton,
  IonChip,
  IonLabel,
  ModalController,
  ToastController,
  ActionSheetController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  notificationsOutline,
  searchOutline,
  add,
  happy,
  checkbox,
  camera,
  timeOutline,
  ellipsisHorizontal,
  heart,
  heartOutline,
  chatbubbleOutline,
  shareOutline,
  send,
  newspaperOutline,
  appsOutline,
  moonOutline,
  skullOutline,
  starOutline,
  codeOutline,
  gameControllerOutline,
  shuffleOutline,
  flameOutline,
  eyeOutline,
  close
} from 'ionicons/icons';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Story {
  id: string;
  userName: string;
  userAvatar: string;
  viewed: boolean;
  timestamp: Date;
}

interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: Date;
  likes: number;
}

interface Post {
  id: string;
  type: 'text' | 'meme' | 'task' | 'photo';
  userName: string;
  userAvatar: string;
  text?: string;
  category?: string; // Nueva propiedad para categorías
  memeUrl?: string;
  photoUrl?: string;
  taskTitle?: string;
  taskDescription?: string;
  taskCompleted?: boolean;
  likes: number;
  liked: boolean;
  comments: number;
  recentComments?: Comment[];
  createdAt: Date;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonCardContent,
    IonAvatar,
    IonInput,
    IonCheckbox,
    IonSpinner,
    IonFab,
    IonFabButton,
    IonChip,
    IonLabel
  ]
})
export class FeedPage implements OnInit {
  currentUser: User = {
    id: '1',
    name: 'Usuario',
    avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
  };

  unreadNotifications = 3;
  loading = false;
  newComment = '';
  selectedCategory = 'all';
  
  // Categorías de memes con rutas
  categories = [
    { id: 'all', name: 'TodosLosMemes', icon: 'apps-outline', color: '#6366f1', route: null },
    { id: 'friki', name: 'NocheFriki', icon: 'moon-outline', color: '#8b5cf6', route: '/noche-friki' },
    { id: 'humor-negro', name: 'HumorNegro', icon: 'skull-outline', color: '#374151', route: '/humor-negro' },
    { id: 'clasicos', name: 'MemesClasicos', icon: 'star-outline', color: '#f59e0b', route: '/memes-clasicos' },
    { id: 'programacion', name: 'CodigoMemes', icon: 'code-outline', color: '#10b981', route: '/codigo-memes' },
    { id: 'gaming', name: 'GamersUnite', icon: 'game-controller-outline', color: '#ef4444', route: '/gamers-unite' },
    { id: 'random', name: 'RandomShit', icon: 'shuffle-outline', color: '#ec4899', route: '/random-shit' },
    { id: 'dank', name: 'DankMemes', icon: 'flame-outline', color: '#ff6b35', route: '/dank-memes' },
    { id: 'cursed', name: 'CurseadosWTF', icon: 'eye-outline', color: '#9333ea', route: '/cursed-wtf' }
  ];
  
  stories: Story[] = [
    {
      id: '1',
      userName: 'Ana García',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b378?w=150',
      viewed: false,
      timestamp: new Date()
    },
    {
      id: '2',
      userName: 'Carlos Ruiz',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      viewed: true,
      timestamp: new Date()
    },
    {
      id: '3',
      userName: 'María López',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      viewed: false,
      timestamp: new Date()
    }
  ];

  feedPosts: Post[] = [
    {
      id: '0',
      type: 'meme',
      userName: 'NightOwl',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      text: 'Yo a las 3 AM viendo teorías conspirativas sobre aliens 🛸👽',
      category: 'friki',
      memeUrl: 'https://i.imgflip.com/26am.jpg',
      likes: 342,
      liked: true,
      comments: 67,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      recentComments: []
    },
    {
      id: '0.5',
      type: 'meme',
      userName: 'GamerPro',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      text: 'Cuando tu team pierde porque alguien se desconectó 😤🎮',
      category: 'gaming',
      memeUrl: 'https://i.imgflip.com/1bij.jpg',
      likes: 189,
      liked: false,
      comments: 45,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      recentComments: []
    },
    {
      id: '1',
      type: 'meme',
      userName: 'MemeKing',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      text: '¡Cuando finalmente entiendes un concepto de programación! 😂',
      category: 'programacion',
      memeUrl: 'https://i.imgflip.com/7kqyen.jpg',
      likes: 152,
      liked: false,
      comments: 23,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      recentComments: [
        {
          id: '1',
          userName: 'CodeMaster',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b378?w=150',
          text: '¡Jajaja! Me pasa todo el tiempo 😅',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 8
        }
      ]
    },
    {
      id: '2',
      type: 'meme',
      userName: 'DevLife',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      text: 'Mood cuando tu código funciona a la primera vez 🚀',
      category: 'programacion',
      memeUrl: 'https://i.imgflip.com/2fm6x.jpg',
      likes: 89,
      liked: true,
      comments: 12,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      recentComments: [
        {
          id: '2',
          userName: 'TechGuru',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          text: '¡Imposible! Eso nunca pasa 😂',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
          likes: 15
        }
      ]
    },
    {
      id: '3',
      type: 'meme',
      userName: 'MemeQueen',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b378?w=150',
      text: 'Todos nosotros cuando vemos un error 404 😅',
      category: 'humor-negro',
      memeUrl: 'https://i.imgflip.com/1ur9b0.jpg',
      likes: 234,
      liked: false,
      comments: 45,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      recentComments: []
    },
    {
      id: '4',
      type: 'meme',
      userName: 'FunnyDev',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      text: 'Cuando tienes que explicar por qué el proyecto se retrasó 😬',
      category: 'programacion',
      memeUrl: 'https://i.imgflip.com/5c7lwm.jpg',
      likes: 178,
      liked: true,
      comments: 32,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      recentComments: [
        {
          id: '3',
          userName: 'ProjectManager',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          text: 'Me siento atacado personalmente 😂',
          createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
          likes: 22
        }
      ]
    },
    {
      id: '5',
      type: 'meme',
      userName: 'TechMemes',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      text: 'Viernes por la tarde vs Lunes por la mañana 😴',
      category: 'clasicos',
      memeUrl: 'https://i.imgflip.com/30b1gx.jpg',
      likes: 267,
      liked: false,
      comments: 56,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      recentComments: [
        {
          id: '4',
          userName: 'WeekendWarrior',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          text: '¡Exactamente mi vida! �',
          createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000),
          likes: 18
        }
      ]
    },
    {
      id: '6',
      type: 'meme',
      userName: 'CodeNinja',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      text: 'Cuando encuentras la solución en Stack Overflow 🙏',
      category: 'programacion',
      memeUrl: 'https://i.imgflip.com/4t0m5.jpg',
      likes: 145,
      liked: true,
      comments: 28,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      recentComments: []
    },
    {
      id: '6.5',
      type: 'meme',
      userName: 'DarkHumorist',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      text: 'Mi vida laboral resumida en una imagen 💀',
      category: 'humor-negro',
      memeUrl: 'https://i.imgflip.com/1g8my4.jpg',
      likes: 156,
      liked: false,
      comments: 23,
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      recentComments: []
    },
    {
      id: '6.7',
      type: 'meme',
      userName: 'NerdAlert',
      userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150',
      text: 'Cuando alguien dice que Star Wars no es ciencia ficción 🤓👽',
      category: 'friki',
      memeUrl: 'https://i.imgflip.com/261o3j.jpg',
      likes: 287,
      liked: true,
      comments: 89,
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
      recentComments: [
        {
          id: '5',
          userName: 'SciFiFan',
          userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          text: '¡Que la fuerza los acompañe! 🚀',
          createdAt: new Date(Date.now() - 19 * 60 * 60 * 1000),
          likes: 34
        }
      ]
    },
    {
      id: '7',
      type: 'task',
      userName: 'Productiva María',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      text: '¡Completé todas mis tareas de hoy! 🎉',
      category: 'random',
      taskTitle: 'Terminar presentación del proyecto',
      taskDescription: 'Preparar slides y ensayar para la reunión de mañana',
      taskCompleted: true,
      likes: 12,
      liked: true,
      comments: 4,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      recentComments: []
    },
    {
      id: '8',
      type: 'meme',
      userName: 'RandomMemer',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      text: 'Yo intentando ser adulto vs la realidad 🤡',
      category: 'random',
      memeUrl: 'https://i.imgflip.com/1o00in.jpg',
      likes: 198,
      liked: false,
      comments: 42,
      createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
      recentComments: []
    },
    {
      id: '8.5',
      type: 'meme',
      userName: 'DankLord',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      text: 'Cuando tu crush te deja en visto pero likes tu historia 💀',
      category: 'dank',
      memeUrl: 'https://i.imgflip.com/3oqpsn.jpg',
      likes: 420,
      liked: false,
      comments: 69,
      createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
      recentComments: []
    },
    {
      id: '9',
      type: 'meme',
      userName: 'CursedContent',
      userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150',
      text: 'POV: Encontraste el meme más maldito de Internet 👁️👄👁️',
      category: 'cursed',
      memeUrl: 'https://i.imgflip.com/4q2nm4.jpg',
      likes: 666,
      liked: true,
      comments: 132,
      createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
      recentComments: []
    }
  ];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) {
    addIcons({
      notificationsOutline,
      searchOutline,
      add,
      happy,
      checkbox,
      camera,
      timeOutline,
      ellipsisHorizontal,
      heart,
      heartOutline,
      chatbubbleOutline,
      shareOutline,
      send,
      newspaperOutline,
      appsOutline,
      moonOutline,
      skullOutline,
      starOutline,
      codeOutline,
      gameControllerOutline,
      shuffleOutline,
      flameOutline,
      eyeOutline,
      close
    });
  }

  ngOnInit() {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const savedProfile = localStorage.getItem('user-profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      this.currentUser = {
        id: '1',
        name: profile.name || 'Usuario',
        avatar: profile.avatar || 'https://ionicframework.com/docs/img/demos/avatar.svg'
      };
    }
  }

  async refreshFeed(event: any) {
    setTimeout(() => {
      // Simular carga de nuevos posts
      event.target.complete();
      this.showToast('Feed actualizado');
    }, 1000);
  }

  showNotifications() {
    this.showToast('Notificaciones próximamente');
  }

  showSearch() {
    this.showToast('Búsqueda próximamente');
  }

  createStory() {
    this.showToast('Crear historia próximamente');
  }

  async openCreatePost(type?: string) {
    const { UploadModalComponent } = await import('../components/upload-modal/upload-modal.component');
    
    const modal = await this.modalController.create({
      component: UploadModalComponent,
      cssClass: 'upload-modal',
      backdropDismiss: false
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Agregar el nuevo post al feed
        const newPost: Post = {
          id: result.data.id,
          type: result.data.type,
          userName: result.data.userName,
          userAvatar: result.data.userAvatar,
          text: result.data.description,
          memeUrl: result.data.type === 'meme' ? result.data.mediaUrl : undefined,
          photoUrl: result.data.type === 'photo' ? result.data.mediaUrl : undefined,
          taskTitle: result.data.taskTitle,
          taskDescription: result.data.description,
          taskCompleted: result.data.taskCompleted,
          likes: 0,
          liked: false,
          comments: 0,
          createdAt: new Date(),
          recentComments: []
        };

        this.feedPosts.unshift(newPost);
        this.showToast('¡Publicación creada exitosamente!');
      }
    });

    await modal.present();
  }

  async createPost(type: string) {
    // Por ahora, crear posts de ejemplo
    const newPost: Post = {
      id: Date.now().toString(),
      type: type as any,
      userName: this.currentUser.name,
      userAvatar: this.currentUser.avatar,
      text: `Nueva publicación de tipo ${type}`,
      likes: 0,
      liked: false,
      comments: 0,
      createdAt: new Date(),
      recentComments: []
    };

    if (type === 'meme') {
      newPost.memeUrl = 'https://i.imgflip.com/2/3oqpsn.jpg';
      newPost.text = '¡Nuevo meme compartido!';
    } else if (type === 'task') {
      newPost.taskTitle = 'Nueva tarea completada';
      newPost.taskDescription = 'Descripción de la tarea';
      newPost.taskCompleted = true;
      newPost.text = '¡Acabo de completar una tarea importante!';
    }

    this.feedPosts.unshift(newPost);
    this.showToast(`Publicación de ${type} creada`);
  }

  toggleLike(post: Post, index: number) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    
    const message = post.liked ? 'Te gusta esta publicación' : 'Ya no te gusta esta publicación';
    this.showToast(message);
  }

  toggleTaskInPost(post: Post, index: number) {
    if (post.type === 'task') {
      post.taskCompleted = !post.taskCompleted;
      const message = post.taskCompleted ? 'Tarea marcada como completada' : 'Tarea marcada como pendiente';
      this.showToast(message);
    }
  }

  showComments(post: Post, index: number) {
    this.showToast('Modal de comentarios próximamente');
  }

  async sharePost(post: Post) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Compartir publicación',
      buttons: [
        {
          text: 'Compartir en tu muro',
          icon: 'share',
          handler: () => {
            this.showToast('Publicación compartida en tu muro');
          }
        },
        {
          text: 'Enviar por mensaje',
          icon: 'chatbubble',
          handler: () => {
            this.showToast('Función de mensajes próximamente');
          }
        },
        {
          text: 'Copiar enlace',
          icon: 'link',
          handler: () => {
            this.showToast('Enlace copiado al portapapeles');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async addComment(post: Post, index: number) {
    if (this.newComment.trim()) {
      if (!post.recentComments) {
        post.recentComments = [];
      }

      const comment: Comment = {
        id: Date.now().toString(),
        userName: this.currentUser.name,
        userAvatar: this.currentUser.avatar,
        text: this.newComment.trim(),
        createdAt: new Date(),
        likes: 0
      };

      post.recentComments.push(comment);
      post.comments++;
      this.newComment = '';
      
      this.showToast('Comentario agregado');
    }
  }

  likeComment(comment: Comment) {
    this.showToast('Te gusta este comentario');
  }

  replyComment(comment: Comment) {
    this.showToast('Responder comentario próximamente');
  }

  async showPostOptions(post: Post, index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de publicación',
      buttons: [
        {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            this.showToast('Editar publicación próximamente');
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.feedPosts.splice(index, 1);
            this.showToast('Publicación eliminada');
          }
        },
        {
          text: 'Reportar',
          icon: 'flag',
          handler: () => {
            this.showToast('Publicación reportada');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async viewFullImage(imageUrl: string, title?: string, description?: string) {
    const { ImageViewerComponent } = await import('../components/image-viewer/image-viewer.component');
    
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imageUrl: imageUrl,
        title: title || 'Imagen',
        description: description,
        userName: 'Usuario',
        createdAt: new Date()
      },
      cssClass: 'image-viewer-modal'
    });

    await modal.present();
  }

  getPostTypeColor(type: string): string {
    switch (type) {
      case 'meme': return 'warning';
      case 'task': return 'success';
      case 'photo': return 'primary';
      default: return 'medium';
    }
  }

  getPostTypeLabel(type: string): string {
    switch (type) {
      case 'meme': return 'Meme';
      case 'task': return 'Tarea';
      case 'photo': return 'Foto';
      default: return 'Post';
    }
  }

  // Computed property para posts filtrados
  get filteredPosts(): Post[] {
    if (this.selectedCategory === 'all') {
      return this.feedPosts;
    }
    return this.feedPosts.filter(post => post.category === this.selectedCategory);
  }

  // Método para cambiar categoría/pestaña
  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.showToast(`Filtrando por: ${this.categories.find(c => c.id === categoryId)?.name}`);
  }

  // Método para navegar a páginas de categorías
  selectCategoryTab(categoryId: string) {
    const category = this.categories.find(c => c.id === categoryId);
    
    if (category?.route) {
      // Navegar a la página específica de la categoría
      this.router.navigate([category.route]);
    } else if (categoryId === 'all') {
      // Para "Todos los Memes", mostrar todos los posts
      this.selectedCategory = 'all';
      this.showToast('📱 Mostrando todos los memes');
    } else {
      // Fallback: filtro local
      this.selectedCategory = categoryId;
      this.showToast(`📱 Filtrando por #${category?.name}`);
    }
  }

  // Helper methods para categorías
  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#6366f1';
  }

  getCategoryIcon(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.icon || 'apps-outline';
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'General';
  }

  getCategoryPostCount(categoryId: string): number {
    return this.feedPosts.filter(post => post.category === categoryId).length;
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
