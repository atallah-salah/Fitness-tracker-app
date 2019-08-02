import { NgModule } from '@angular/core';

import { 
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatNativeDateModule,
  MatCheckboxModule
} from "@angular/material";

const modules = [
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatNativeDateModule,
  MatCheckboxModule
]

@NgModule({
  imports:[...modules],
  exports:[...modules]
})
export class MaterialModule {}