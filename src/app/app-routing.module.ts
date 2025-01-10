import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WardrobeComponent } from './components/wardrobe/wardrobe.component';
import { UploadOutfitComponent } from './components/upload-outfit/upload-outfit.component';
import { EditOutfitComponent } from './components/edit-outfit/edit-outfit.component';
import { noAuthGuard } from './Guards/no-auth.guard';
import { authGuard } from './Guards/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { OOTDComponent } from './components/ootd/ootd.component';
import { OOTDSuggestionComponent } from './components/ootdsuggestion/ootdsuggestion.component';
import { VirtualTryOnComponent } from './components/virtual-try-on/virtual-try-on.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
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
  {
    path: 'ootd',
    component: OOTDComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ootd-suggestions',
    component: OOTDSuggestionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'virtualtryon',
    component: VirtualTryOnComponent,
    canActivate: [authGuard],
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
