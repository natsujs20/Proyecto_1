import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  // Category Pages - TODAS LAS CATEGORIAS
  {
    path: 'todos-los-memes',
    loadComponent: () => import('./todos-los-memes/todos-los-memes.page').then(m => m.TodosLosMemes)
  },
  {
    path: 'noche-friki',
    loadComponent: () => import('./noche-friki/noche-friki.page').then(m => m.NocheFrikiPage)
  },
  {
    path: 'humor-negro',
    loadComponent: () => import('./humor-negro/humor-negro.page').then(m => m.HumorNegroPage)
  },
  {
    path: 'memes-clasicos',
    loadComponent: () => import('./memes-clasicos/memes-clasicos.page').then(m => m.MemesClasicosPage)
  },
  {
    path: 'codigo-memes',
    loadComponent: () => import('./codigo-memes/codigo-memes.page').then(m => m.CodigoMemesPage)
  },
  {
    path: 'gamers-unite',
    loadComponent: () => import('./gamers-unite/gamers-unite.page').then(m => m.GamersUnitePage)
  },
  {
    path: 'mierda-aleatoria',
    loadComponent: () => import('./mierda-aleatoria/mierda-aleatoria.page').then(m => m.MierdaAleatoriaPage)
  },
  {
    path: 'memes-dank',
    loadComponent: () => import('./memes-dank/memes-dank.page').then(m => m.MemesDankPage)
  },
  {
    path: 'malditos-wtf',
    loadComponent: () => import('./malditos-wtf/malditos-wtf.page').then(m => m.MalditosWTFPage)
  },
  {
    path: 'dispositivos',
    loadComponent: () => import('./dispositivos/dispositivos.page').then(m => m.DispositivosPage)
  },
  {
    path: 'gamers-unite',
    redirectTo: 'noche-friki', // Temporal
    pathMatch: 'full'
  },
  {
    path: 'random-shit',
    redirectTo: 'humor-negro', // Temporal  
    pathMatch: 'full'
  },
  {
    path: 'dank-memes',
    redirectTo: 'memes-clasicos', // Temporal
    pathMatch: 'full'
  },
  {
    path: 'cursed-wtf',
    redirectTo: 'codigo-memes', // Temporal
    pathMatch: 'full'
  },
  {
    path: 'all',
    redirectTo: 'todos-los-memes', // Redirección para 'all'
    pathMatch: 'full'
  },
  {
    path: 'select-category-tab',
    loadComponent: () => import('./select-category-tab/select-category-tab.page').then(m => m.SelectCategoryTabPage)
  }
];
