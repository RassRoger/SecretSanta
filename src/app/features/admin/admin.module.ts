import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlacklistComponent } from './components/blacklist/blacklist.component';
import { AdminService } from './services/admin.service';

// Material

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';


const material = [
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutes,
    material
  ],
  declarations: [
    AdminComponent,
    BlacklistComponent
  ],
  providers: [AdminService]
})
export class AdminModule { }
