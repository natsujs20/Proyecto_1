import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkboxOutline, happyOutline, personOutline, homeOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  pendingTasksCount = 0;

  constructor() {
    addIcons({ checkboxOutline, happyOutline, personOutline, homeOutline, searchOutline });
  }

  ngOnInit() {
    this.updateTaskCount();
    // Actualizar el contador cada vez que se cambia la página
    setInterval(() => {
      this.updateTaskCount();
    }, 1000);
  }

  private updateTaskCount() {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      this.pendingTasksCount = tasks.filter((task: any) => !task.completed).length;
    } else {
      this.pendingTasksCount = 0;
    }
  }
}
