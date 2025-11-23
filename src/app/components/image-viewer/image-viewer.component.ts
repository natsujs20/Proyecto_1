import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonFab,
  IonFabButton,
  ModalController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  close,
  shareOutline,
  add,
  remove,
  refresh,
  information,
  informationOutline,
  downloadOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonFab,
    IonFabButton
  ]
})
export class ImageViewerComponent implements OnInit {
  @Input() imageUrl!: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() userName?: string;
  @Input() createdAt?: Date;

  @ViewChild('mainImage') mainImage!: ElementRef<HTMLImageElement>;
  @ViewChild('imageContainer') imageContainer!: ElementRef<HTMLDivElement>;

  zoomLevel = 1;
  showDetails = false;
  Math = Math;

  private maxZoom = 5;
  private minZoom = 0.5;
  private zoomStep = 0.25;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    addIcons({
      close,
      shareOutline,
      add,
      remove,
      refresh,
      information,
      informationOutline,
      downloadOutline
    });
  }

  ngOnInit() {
    this.setupGestures();
  }

  onImageLoad() {
    this.resetZoom();
  }

  zoomIn() {
    if (this.zoomLevel < this.maxZoom) {
      this.zoomLevel += this.zoomStep;
      this.applyZoom();
    }
  }

  zoomOut() {
    if (this.zoomLevel > this.minZoom) {
      this.zoomLevel -= this.zoomStep;
      this.applyZoom();
    }
  }

  resetZoom() {
    this.zoomLevel = 1;
    this.applyZoom();
  }

  private applyZoom() {
    if (this.mainImage) {
      const image = this.mainImage.nativeElement;
      image.style.transform = `scale(${this.zoomLevel})`;
    }
  }

  private setupGestures() {
    // Configurar gestos de pellizco para zoom (simulado)
    // En una app real, usarías Hammer.js o gestos nativos
    setTimeout(() => {
      if (this.mainImage && this.imageContainer) {
        const image = this.mainImage.nativeElement;
        const container = this.imageContainer.nativeElement;

        // Double tap para zoom
        let lastTap = 0;
        image.addEventListener('touchend', (e) => {
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;
          
          if (tapLength < 500 && tapLength > 0) {
            // Double tap detectado
            e.preventDefault();
            if (this.zoomLevel === 1) {
              this.zoomLevel = 2;
            } else {
              this.resetZoom();
            }
            this.applyZoom();
          }
          lastTap = currentTime;
        });

        // Hacer la imagen draggable cuando está zoomeada
        this.makeDraggable(image);
      }
    }, 100);
  }

  private makeDraggable(element: HTMLElement) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      if (this.zoomLevel <= 1) return;
      
      isDragging = true;
      
      if (e instanceof MouseEvent) {
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
      } else {
        const touch = e.touches[0];
        startX = touch.clientX - currentX;
        startY = touch.clientY - currentY;
      }

      document.addEventListener('mousemove', drag);
      document.addEventListener('touchmove', drag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchend', stopDrag);
    };

    const drag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || this.zoomLevel <= 1) return;

      e.preventDefault();

      if (e instanceof MouseEvent) {
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
      } else {
        const touch = e.touches[0];
        currentX = touch.clientX - startX;
        currentY = touch.clientY - startY;
      }

      element.style.transform = `scale(${this.zoomLevel}) translate(${currentX}px, ${currentY}px)`;
    };

    const stopDrag = () => {
      isDragging = false;
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchend', stopDrag);
    };

    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', startDrag);
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  async shareImage() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: this.title || 'Imagen compartida',
          text: this.description || 'Mira esta imagen',
          url: this.imageUrl
        });
      } catch (error) {
        this.copyToClipboard();
      }
    } else {
      this.copyToClipboard();
    }
  }

  async downloadImage() {
    try {
      const response = await fetch(this.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = this.title || 'imagen.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      this.showToast('Imagen descargada');
    } catch (error) {
      this.showToast('No se pudo descargar la imagen');
    }
  }

  private copyToClipboard() {
    navigator.clipboard.writeText(this.imageUrl).then(() => {
      this.showToast('URL de imagen copiada al portapapeles');
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

  async dismiss() {
    await this.modalController.dismiss();
  }
}
