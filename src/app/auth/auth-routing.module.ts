import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from './not-auth.guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', canActivate: [NotAuthGuard], component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
