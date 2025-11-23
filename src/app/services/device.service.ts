import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Motion } from '@capacitor/motion';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  
  // Subjects para compartir datos
  private cameraPhotoSubject = new BehaviorSubject<string | null>(null);
  private locationSubject = new BehaviorSubject<any>(null);
  private motionDataSubject = new BehaviorSubject<any>(null);
  private apiDataSubject = new BehaviorSubject<any>(null);

  // Observables públicos
  cameraPhoto$ = this.cameraPhotoSubject.asObservable();
  location$ = this.locationSubject.asObservable();
  motionData$ = this.motionDataSubject.asObservable();
  apiData$ = this.apiDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  // =================== CÁMARA ===================
  /**
   * Captura una foto usando la cámara del dispositivo
   */
  async takePicture(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      
      const photoData = image.dataUrl;
      this.cameraPhotoSubject.next(photoData || null);
      return photoData || null;
    } catch (error) {
      console.error('Error capturando foto:', error);
      return null;
    }
  }

  /**
   * Selecciona una foto de la galería
   */
  async pickPicture(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      
      const photoData = image.dataUrl;
      this.cameraPhotoSubject.next(photoData || null);
      return photoData || null;
    } catch (error) {
      console.error('Error seleccionando foto:', error);
      return null;
    }
  }

  // =================== GPS / UBICACIÓN ===================
  /**
   * Obtiene la ubicación actual del dispositivo
   */
  async getCurrentLocation(): Promise<any> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const locationData = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy,
        altitude: coordinates.coords.altitude,
        timestamp: new Date().toISOString()
      };
      
      this.locationSubject.next(locationData);
      return locationData;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      return null;
    }
  }

  /**
   * Monitorea cambios de ubicación en tiempo real
   */
  watchLocation(callback: (location: any) => void): void {
    Geolocation.watchPosition(
      {},
      (position: any) => {
        if (position) {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
          };
          
          this.locationSubject.next(locationData);
          callback(locationData);
        }
      }
    );
  }

  // =================== SENSORES / MOVIMIENTO ===================
  /**
   * Monitorea el acelerómetro del dispositivo
   */
  startMotionMonitoring(callback: (data: any) => void): void {
    Motion.addListener('accel', (event) => {
      const motionData = {
        x: event.acceleration.x,
        y: event.acceleration.y,
        z: event.acceleration.z,
        timestamp: new Date().toISOString()
      };
      
      this.motionDataSubject.next(motionData);
      callback(motionData);
    });
  }

  /**
   * Detiene el monitoreo de acelerómetro
   */
  stopMotionMonitoring(): void {
    Motion.removeAllListeners();
  }

  // =================== INTEGRACIÓN CON APIs ===================
  /**
   * Obtiene datos de una API externa (ej: JSONPlaceholder)
   */
  getExternalApiData(endpoint: string): Observable<any> {
    return this.http.get(endpoint);
  }

  /**
   * Obtiene memes de una API pública
   */
  async getMemeData(): Promise<any> {
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      this.apiDataSubject.next(data);
      return data;
    } catch (error) {
      console.error('Error obteniendo memes:', error);
      return null;
    }
  }

  /**
   * Envía datos a un servicio web
   */
  sendDataToApi(endpoint: string, data: any): Observable<any> {
    return this.http.post(endpoint, data);
  }

  /**
   * Obtiene datos con tratamiento de errores robusto
   */
  fetchDataWithErrorHandling(url: string): Promise<any> {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error en la llamada a API:', error);
        return null;
      });
  }

  // =================== UTILIDADES ===================
  /**
   * Obtiene la foto capturada actualmente
   */
  getCurrentPhoto(): string | null {
    return this.cameraPhotoSubject.getValue();
  }

  /**
   * Obtiene la ubicación actual almacenada
   */
  getStoredLocation(): any {
    return this.locationSubject.getValue();
  }

  /**
   * Limpia los datos de foto
   */
  clearPhoto(): void {
    this.cameraPhotoSubject.next(null);
  }
}
