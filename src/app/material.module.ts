import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule
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
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  FormsModule,
  ReactiveFormsModule,
  MatTableModule
]

@NgModule({
  imports:[...modules],
  exports:[...modules]
})
export class MaterialModule {}