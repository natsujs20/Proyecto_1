import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonList,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonCheckbox,
  IonButtons,
  IonFab,
  IonFabButton,
  IonProgressBar,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  add, 
  trash, 
  trashOutline,
  clipboardOutline, 
  addCircle,
  checkmark,
  checkmarkCircleOutline,
  timeOutline,
  createOutline
} from 'ionicons/icons';

interface Task {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonList,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonCheckbox,
    IonButtons,
    IonFab,
    IonFabButton,
    IonProgressBar
  ],
})
export class Tab1Page {
  tasks: Task[] = [];
  newTask: Partial<Task> = {
    title: '',
    description: ''
  }; 
  showAddForm = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ 
      add, 
      trash, 
      trashOutline,
      clipboardOutline, 
      addCircle,
      checkmark,
      checkmarkCircleOutline,
      timeOutline,
      createOutline
    });
    // Cargar tareas guardadas del localStorage
    this.loadTasks();
  }

  get completedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get progressPercentage(): number {
    if (this.tasks.length === 0) return 0;
    return this.completedTasksCount / this.tasks.length;
  }

  showAddTaskModal() {
    this.showAddForm = true;
  }

  cancelAdd() {
    this.showAddForm = false;
    this.newTask = {
      title: '',
      description: ''
    };
  }

  async addTask() {
    if (this.newTask.title?.trim()) {
      const task: Task = {
        title: this.newTask.title.trim(),
        description: this.newTask.description?.trim() || '',
        completed: false,
        createdAt: new Date()
      };
      
      this.tasks.unshift(task);
      this.saveTasks();
      
      // Limpiar formulario y ocultar
      this.newTask = {
        title: '',
        description: ''
      };
      this.showAddForm = false;
      
      this.showToast('Tarea agregada exitosamente');
    }
  }

  async deleteTaskWithConfirm(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteTask(index);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteTask(index: number) {
    const deletedTask = this.tasks[index];
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.showToast(`"${deletedTask.title}" eliminada`);
  }

  async toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
    
    if (this.tasks[index].completed) {
      this.showToast('¡Tarea completada!');
    }
  }

  async editTask(index: number) {
    const task = this.tasks[index];
    
    const alert = await this.alertController.create({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título',
          value: task.title
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descripción',
          value: task.description
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
            if (data.title.trim()) {
              this.tasks[index].title = data.title.trim();
              this.tasks[index].description = data.description?.trim() || '';
              this.saveTasks();
              this.showToast('Tarea actualizada');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private loadTasks() {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    }
  }

  private saveTasks() {
    localStorage.setItem('todo-tasks', JSON.stringify(this.tasks));
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
