import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonIcon,
  IonToggle,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personCircle,
  notifications,
  moon,
  trash,
  chevronForward
} from 'ionicons/icons';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface Stats {
  totalTasks: number;
  completedTasks: number;
  favoriteMemes: number;
}

interface Settings {
  notifications: boolean;
  darkMode: boolean;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonIcon,
    IonToggle
  ],
})
export class Tab3Page implements OnInit {
  userProfile: UserProfile = {
    name: 'Usuario Anónimo',
    email: 'usuario@ejemplo.com',
    avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
  };

  stats: Stats = {
    totalTasks: 0,
    completedTasks: 0,
    favoriteMemes: 0
  };

  settings: Settings = {
    notifications: true,
    darkMode: false
  };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ 
      personCircle,
      notifications,
      moon,
      trash,
      chevronForward
    });
  }

  ngOnInit() {
    this.loadUserData();
    this.calculateStats();
    this.loadSettings();
  }

  ionViewWillEnter() {
    // Actualizar estadísticas cada vez que se entra a la página
    this.calculateStats();
  }

  private loadUserData() {
    const savedProfile = localStorage.getItem('user-profile');
    if (savedProfile) {
      this.userProfile = JSON.parse(savedProfile);
    }
  }

  private loadSettings() {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
    
    // Aplicar tema oscuro si está habilitado
    if (this.settings.darkMode) {
      document.body.classList.add('dark');
    }
  }

  private calculateStats() {
    // Obtener estadísticas de tareas
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      this.stats.totalTasks = tasks.length;
      this.stats.completedTasks = tasks.filter((task: any) => task.completed).length;
    }

    // Obtener estadísticas de memes favoritos
    const savedFavorites = localStorage.getItem('favorite-memes');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      this.stats.favoriteMemes = favorites.length;
    }
  }

  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: this.userProfile.name
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.userProfile.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.name && data.email) {
              this.userProfile.name = data.name;
              this.userProfile.email = data.email;
              localStorage.setItem('user-profile', JSON.stringify(this.userProfile));
              this.showToast('Perfil actualizado correctamente');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  toggleDarkMode() {
    if (this.settings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    this.saveSettings();
    this.showToast(`Modo ${this.settings.darkMode ? 'oscuro' : 'claro'} activado`);
  }

  async clearData() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            localStorage.removeItem('todo-tasks');
            localStorage.removeItem('favorite-memes');
            localStorage.removeItem('user-profile');
            this.calculateStats();
            this.showToast('Todos los datos han sido eliminados');
          }
        }
      ]
    });

    await alert.present();
  }

  private saveSettings() {
    localStorage.setItem('app-settings', JSON.stringify(this.settings));
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
