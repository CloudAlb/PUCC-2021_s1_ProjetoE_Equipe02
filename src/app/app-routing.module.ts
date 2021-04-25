import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // TODO, voltar
    // redirectTo: 'login',
    redirectTo: 'tournament-home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'seu-perfil',
    loadChildren: () =>
      import('./pages/seu-perfil/seu-perfil.module').then(
        (m) => m.SeuPerfilPageModule
      ),
  },
  {
    path: 'editar-perfil',
    loadChildren: () =>
      import('./pages/editar-perfil/editar-perfil.module').then(
        (m) => m.EditarPerfilPageModule
      ),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./pages/cadastro-usuario/cadastro-usuario.module').then(
        (m) => m.CadastroUsuarioPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tournament',
    redirectTo: 'home',
  },
  {
    path: 'tournament/:id',
    loadChildren: () =>
      import('./pages/tournament/tournament.module').then(
        (m) => m.TournamentPageModule
      ),
  },
  {
    path: 'tournament-home',
    loadChildren: () =>
      import('./pages/tournament-home/tournament-home.module').then(
        (m) => m.TournamentHomePageModule
      ),
  },
  {
    path: 'tournaments-participando',
    loadChildren: () =>
      import(
        './pages/tournaments-participando/tournaments-participando.module'
      ).then((m) => m.TournamentsParticipandoPageModule),
  },
  {
    path: 'tournaments-seus',
    loadChildren: () =>
      import('./pages/tournaments-seus/tournaments-seus.module').then(
        (m) => m.TournamentsSeusPageModule
      ),
  },
  {
    path: 'tournaments-criar',
    loadChildren: () =>
      import('./pages/tournaments-criar/tournaments-criar.module').then(
        (m) => m.TournamentsCriarPageModule
      ),
  },
  // TODO, é um modal. Pode estar aqui?
  {
    path: 'invite-participants',
    loadChildren: () =>
      import('./modal/invite-participants/invite-participants.module').then(
        (m) => m.InviteParticipantsPageModule
      ),
  },
  {
    path: 'tournaments-convites',
    loadChildren: () =>
      import('./pages/tournaments-convites/tournaments-convites.module').then(
        (m) => m.TournamentsConvitesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
