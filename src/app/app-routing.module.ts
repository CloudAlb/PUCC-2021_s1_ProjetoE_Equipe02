import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
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
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastros/cadastro-usuario.module').then(m => m.CadastroUsuarioPageModule)
  },
  {
    path: 'criar-torneio',
    loadChildren: () => import('./pages/criar-torneio/criar-torneio.module').then( m => m.CriarTorneioPageModule)
  },
  {
    path: 'loja',
    loadChildren: () => import('./pages/loja/loja.module').then( m => m.LojaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
