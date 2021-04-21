import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuLateralComponent],
  imports: [IonicModule, CommonModule, RouterModule],
  exports: [MenuLateralComponent]
})
export class ComponentsModule {
}
