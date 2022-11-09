import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessComponent } from './access.component';
import { AccessRoutes } from './access.routing';
import { RegisterComponent } from './components/register/register.component';

//Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AccessService } from './services/access.service';


const material = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccessRoutes,
    material

  ],
  declarations: [
    AccessComponent,
    RegisterComponent
  ],
  providers: [AccessService]
})
export class AccessModule { }
