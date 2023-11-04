import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeComponent } from './components/like/like.component';
import { FeelingService } from './services/feeling.service';


@NgModule({
  declarations: [
    LikeComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    FeelingService
  ],
  exports: [
    LikeComponent
  ]
})
export class FeelingModule {
  
}
