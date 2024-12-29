import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WardrobeComponent } from './components/wardrobe/wardrobe.component';
import { UploadOutfitComponent } from './components/upload-outfit/upload-outfit.component';
import { EditOutfitComponent } from './components/edit-outfit/edit-outfit.component';
import { noAuthGuard } from './Guards/no-auth.guard';
import { authGuard} from './Guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [noAuthGuard] },
  { path: 'wardrobe', component: WardrobeComponent, canActivate: [authGuard] },
  {
    path: 'upload-outfit',
    component: UploadOutfitComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-outfit/:id',
    component: EditOutfitComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
