import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';

// TODO, necessário?
// import { SocialCardComponent } from './social-card/social-card.component';

@NgModule({
  declarations: [MenuLateralComponent],
  imports: [IonicModule, CommonModule, RouterModule],
  exports: [MenuLateralComponent]
})
export class ComponentsModule {
}
