import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonutComponent } from './component/donut/donut.component';
import { BarComponent } from './component/bar/bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DonutComponent,
    BarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ToastNoAnimationModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter:() => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['http://iqbalrahman.myprism.biz'],
        disallowedRoutes:['http://iqbalrahman.myprism.biz/auth/login']
      }
    })
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
