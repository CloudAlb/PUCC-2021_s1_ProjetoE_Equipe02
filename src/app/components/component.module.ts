import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { SocialCardComponent } from './social-card/social-card.component';

@NgModule({
  declarations: [MenuLateralComponent],
  imports: [IonicModule],
  exports: [MenuLateralComponent]
})
export class ComponentsModule {
}
