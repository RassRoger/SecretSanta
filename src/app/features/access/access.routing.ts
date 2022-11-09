import { Routes, RouterModule } from '@angular/router';
import { AccessComponent } from './access.component';

const routes: Routes = [
  { path: '', component: AccessComponent },
];

export const AccessRoutes = RouterModule.forChild(routes);
