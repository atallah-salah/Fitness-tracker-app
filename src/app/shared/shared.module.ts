import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const modules = [
  CommonModule,
  FormsModule,
  MaterialModule,
  FlexLayoutModule
]

@NgModule({
  imports:[...modules],
  exports:[...modules]
})
export class SharedModule {}