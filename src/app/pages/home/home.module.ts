import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD:src/app/pages/home/home.module.ts
    HomePageRoutingModule
=======
    FolderPageRoutingModule,
    ReactiveFormsModule
>>>>>>> 3db37aeb68e8b962bc0aedc1e6bbea363da86490:src/app/folder/folder.module.ts
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
