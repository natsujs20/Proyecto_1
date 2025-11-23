import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonTextarea,
  IonInput,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonChip,
  IonProgressBar,
  ModalController,
  ToastController,
  ActionSheetController,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  close,
  happy,
  camera,
  videocam,
  checkbox,
  images,
  cloudUpload,
  trash,
  send,
  globe,
  people,
  lockClosed
} from 'ionicons/icons';

interface PostData {
  type: string;
  description: string;
  taskTitle?: string;
  taskCompleted?: boolean;
  privacy: string;
  allowComments: boolean;
  allowSharing: boolean;
}

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonTextarea,
    IonInput,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonChip,
    IonProgressBar
  ]
})
export class UploadModalComponent implements OnInit {
  selectedType = 'meme';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isUploading = false;
  uploadProgress = 0;

  postData: PostData = {
    type: 'meme',
    description: '',
    privacy: 'public',
    allowComments: true,
    allowSharing: true
  };

  suggestedHashtags = [
    '#meme', '#funny', '#lol', '#programacion', '#trabajo',
    '#vida', '#mood', '#relatable', '#humor', '#coding'
  ];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) {
    addIcons({
      close,
      happy,
      camera,
      videocam,
      checkbox,
      images,
      cloudUpload,
      trash,
      send,
      globe,
      people,
      lockClosed
    });
  }

  ngOnInit() {
    // Inicialización
  }

  get isImage(): boolean {
    return this.selectedFile?.type.startsWith('image/') || false;
  }

  get isVideo(): boolean {
    return this.selectedFile?.type.startsWith('video/') || false;
  }

  onTypeChange() {
    this.postData.type = this.selectedType;
    // Cambiar hashtags sugeridos según el tipo
    if (this.selectedType === 'task') {
      this.suggestedHashtags = [
        '#productividad', '#logro', '#meta', '#completado', 
        '#exito', '#trabajo', '#motivacion', '#progreso'
      ];
    } else if (this.selectedType === 'meme') {
      this.suggestedHashtags = [
        '#meme', '#funny', '#lol', '#humor', '#divertido',
        '#risas', '#mood', '#relatable', '#viral'
      ];
    } else {
      this.suggestedHashtags = [
        '#foto', '#vida', '#momento', '#recuerdo', '#share',
        '#instagram', '#pic', '#selfie', '#story'
      ];
    }
  }

  async openGallery() {
    // Simular apertura de galería
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar de galería',
      buttons: [
        {
          text: 'Fotos recientes',
          icon: 'images',
          handler: () => {
            this.selectFile();
          }
        },
        {
          text: 'Todos los archivos',
          icon: 'folder',
          handler: () => {
            this.selectFile();
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

  async openCamera() {
    // Simular apertura de cámara
    const actionSheet = await this.actionSheetController.create({
      header: 'Usar cámara',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera',
          handler: () => {
            this.simulateCameraCapture('photo');
          }
        },
        {
          text: 'Grabar video',
          icon: 'videocam',
          handler: () => {
            this.simulateCameraCapture('video');
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

  selectFile() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.createPreview(file);
    }
  }

  private createPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  private simulateCameraCapture(type: 'photo' | 'video') {
    // Simular captura de cámara con imagen de ejemplo
    if (type === 'photo') {
      this.previewUrl = 'https://picsum.photos/400/400?random=' + Date.now();
      // Crear archivo simulado
      this.selectedFile = new File([''], 'camera-photo.jpg', { type: 'image/jpeg' });
    } else {
      this.previewUrl = 'https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4';
      this.selectedFile = new File([''], 'camera-video.mp4', { type: 'video/mp4' });
    }
    this.showToast('Contenido capturado desde la cámara');
  }

  removeFile() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  addHashtag(hashtag: string) {
    if (!this.postData.description.includes(hashtag)) {
      this.postData.description += ' ' + hashtag;
    }
  }

  getFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  canPublish(): boolean {
    const hasContent = this.postData.description.trim().length > 0;
    const hasFile = this.selectedFile !== null;
    const hasTaskTitle = this.selectedType !== 'task' || (this.postData.taskTitle?.trim() || '').length > 0;
    
    return (hasContent || hasFile) && hasTaskTitle && !this.isUploading;
  }

  async publishPost() {
    if (!this.canPublish()) return;

    this.isUploading = true;
    this.uploadProgress = 0;

    // Simular proceso de subida
    const loading = await this.loadingController.create({
      message: 'Publicando contenido...'
    });
    await loading.present();

    // Simular progreso de subida
    const progressInterval = setInterval(() => {
      this.uploadProgress += 0.1;
      if (this.uploadProgress >= 1) {
        clearInterval(progressInterval);
        this.finishUpload(loading);
      }
    }, 100);
  }

  private async finishUpload(loading: any) {
    await loading.dismiss();
    
    // Crear objeto de publicación
    const newPost = {
      id: Date.now().toString(),
      type: this.selectedType,
      description: this.postData.description,
      taskTitle: this.postData.taskTitle,
      taskCompleted: this.postData.taskCompleted,
      privacy: this.postData.privacy,
      allowComments: this.postData.allowComments,
      allowSharing: this.postData.allowSharing,
      mediaUrl: this.previewUrl,
      fileName: this.selectedFile?.name,
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      userName: 'Tú',
      userAvatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    };

    // Guardar en localStorage (simular base de datos)
    const savedPosts = localStorage.getItem('user-posts') || '[]';
    const posts = JSON.parse(savedPosts);
    posts.unshift(newPost);
    localStorage.setItem('user-posts', JSON.stringify(posts));

    this.showToast('¡Contenido publicado exitosamente!');
    this.dismiss(newPost);
  }

  async dismiss(data?: any) {
    await this.modalController.dismiss(data);
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
