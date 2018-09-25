import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDataComponent } from './user-data/user-data.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { EditUserGroupComponent } from './edit-group/edit-group.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OAuthService, UrlHelperService } from '../../node_modules/angular-oauth2-oidc';
import { HttpFormEncodingCodec } from './http-form-encoding-codec';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    EditUserComponent,
    EditUserGroupComponent,
    UserGroupComponent,
    LoginComponent,
    HomeComponent,
    UserDetailsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule    
  ],
  providers: [
    OAuthService, 
    UrlHelperService,
    HttpFormEncodingCodec
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
