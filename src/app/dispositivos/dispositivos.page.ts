import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonGrid, IonRow, IonCol, IonSpinner, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, location, pulse, cloud, cloudDownload, arrowBack, images, stop } from 'ionicons/icons';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-dispositivos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
    IonBackButton,
    IonButtons
  ],
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss']
})
export class DispositivosPage implements OnInit, OnDestroy {
  
  capturedPhoto: string | null = null;
  locationData: any = null;
  motionData: any = null;
  memeData: any = null;
  isLoadingPhoto = false;
  isLoadingLocation = false;
  isLoadingMotion = false;
  isLoadingMemes = false;

  constructor(private deviceService: DeviceService) {
    addIcons({ camera, location, pulse, cloud, cloudDownload, arrowBack, images, stop });
  }

  ngOnInit(): void {
    // Suscribirse a los datos de la cámara
    this.deviceService.cameraPhoto$.subscribe(photo => {
      this.capturedPhoto = photo;
    });

    // Suscribirse a los datos de ubicación
    this.deviceService.location$.subscribe(loc => {
      this.locationData = loc;
    });

    // Suscribirse a los datos de movimiento
    this.deviceService.motionData$.subscribe(motion => {
      this.motionData = motion;
    });

    // Suscribirse a los datos de API
    this.deviceService.apiData$.subscribe(data => {
      this.memeData = data;
    });
  }

  ngOnDestroy(): void {
    this.deviceService.stopMotionMonitoring();
  }

  // =================== CÁMARA ===================
  async takePicture(): Promise<void> {
    this.isLoadingPhoto = true;
    await this.deviceService.takePicture();
    this.isLoadingPhoto = false;
  }

  async pickFromGallery(): Promise<void> {
    this.isLoadingPhoto = true;
    await this.deviceService.pickPicture();
    this.isLoadingPhoto = false;
  }

  // =================== UBICACIÓN ===================
  async getCurrentLocation(): Promise<void> {
    this.isLoadingLocation = true;
    await this.deviceService.getCurrentLocation();
    this.isLoadingLocation = false;
  }

  startWatchingLocation(): void {
    this.deviceService.watchLocation((location) => {
      console.log('Ubicación actualizada:', location);
    });
  }

  // =================== SENSORES ===================
  startMonitoringMotion(): void {
    this.isLoadingMotion = true;
    this.deviceService.startMotionMonitoring((data) => {
      console.log('Datos de movimiento:', data);
    });
  }

  stopMonitoringMotion(): void {
    this.deviceService.stopMotionMonitoring();
    this.isLoadingMotion = false;
    this.motionData = null;
  }

  // =================== APIs ===================
  async getMemes(): Promise<void> {
    this.isLoadingMemes = true;
    await this.deviceService.getMemeData();
    this.isLoadingMemes = false;
  }
}
