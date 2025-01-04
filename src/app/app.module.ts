import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WardrobeComponent } from './components/wardrobe/wardrobe.component';
import { UploadOutfitComponent } from './components/upload-outfit/upload-outfit.component';
import { EditOutfitComponent } from './components/edit-outfit/edit-outfit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { LandingComponent } from './components/landing/landing.component';
import { OutfitDetailComponent } from './components/outfit-detail/outfit-detail.component';
import { OOTDComponent } from './components/ootd/ootd.component';
import { OOTDSuggestionComponent } from './components/ootdsuggestion/ootdsuggestion.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpLoader } from './Interceptors/http-loader';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    WardrobeComponent,
    UploadOutfitComponent,
    EditOutfitComponent,
    LandingComponent,
    OutfitDetailComponent,
    OOTDComponent,
    OOTDSuggestionComponent,
    LoaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Allow multiple interceptors if needed
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoader, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
