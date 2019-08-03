import { NgModule } from '@angular/core';

import { 
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule
} from "@angular/material";

const modules = [
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule
]

@NgModule({
  imports:[...modules],
  exports:[...modules]
})
export class MaterialModule {}