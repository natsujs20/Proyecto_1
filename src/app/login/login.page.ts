import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  happy, 
  logIn, 
  logoGoogle, 
  logoFacebook 
} from 'ionicons/icons';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon
  ]
})
export class LoginPage {
  loginData: LoginData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({ happy, logIn, logoGoogle, logoFacebook });
  }

  isFormValid(): boolean {
    return this.loginData.email.trim().length > 0 && 
           this.loginData.password.trim().length > 0;
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      duration: 1000
    });
    await loading.present();

    // Simular autenticación
    setTimeout(async () => {
      await loading.dismiss();
      
      // Guardar datos del usuario
      const userData = {
        email: this.loginData.email,
        name: this.loginData.email.split('@')[0],
        avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        isLoggedIn: true
      };
      
      localStorage.setItem('user-profile', JSON.stringify(userData));
      localStorage.setItem('user-session', JSON.stringify({ isLoggedIn: true }));
      
      this.showToast('¡Bienvenido de vuelta!');
      this.router.navigate(['/tabs/feed']);
    }, 1000);
  }

  async loginAsGuest() {
    const userData = {
      email: 'invitado@ejemplo.com',
      name: 'Invitado',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      isLoggedIn: false
    };
    
    localStorage.setItem('user-profile', JSON.stringify(userData));
    localStorage.setItem('user-session', JSON.stringify({ isLoggedIn: false }));
    
    this.showToast('Continuando como invitado');
    this.router.navigate(['/tabs/feed']);
  }

  async showRegister() {
    this.showToast('Función de registro próximamente');
  }

  async forgotPassword() {
    this.showToast('Función de recuperación próximamente');
  }

  async loginWithGoogle() {
    this.showToast('Login con Google próximamente');
  }

  async loginWithFacebook() {
    this.showToast('Login con Facebook próximamente');
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
