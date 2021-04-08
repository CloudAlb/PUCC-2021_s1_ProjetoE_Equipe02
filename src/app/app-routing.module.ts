import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'criar-torneio',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'seu-perfil',
    loadChildren: () => import('./pages/seu-perfil/seu-perfil.module').then(m => m.SeuPerfilPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then(m => m.EditarPerfilPageModule)
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./pages/cadastros/cadastro-usuario.module').then(m => m.CadastroUsuarioPageModule)
  },
  {
    path: 'criar-torneio',
    loadChildren: () => import('./pages/criar-torneio/criar-torneio.module').then( m => m.CriarTorneioPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
