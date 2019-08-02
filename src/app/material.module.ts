import { NgModule } from '@angular/core';

import { MatFormFieldModule,MatButtonModule,MatInputModule } from "@angular/material";
// import {MatFormFieldModule} from '@angular/material/form-field'; 

const modules = [MatFormFieldModule,MatButtonModule,MatInputModule]

@NgModule({
    imports:[...modules],
    exports:[...modules]
})
export class MaterialModule {}