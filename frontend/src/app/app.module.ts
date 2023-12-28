import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { signUpGuard } from './shared/guards/sign-up.guard';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserDetailComponent } from './components/home/user-detail/user-detail.component';
import { ChatComponent } from './components/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ExcelComponent } from './shared/components/excel/excel.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { NgScrollbarModule } from 'ngx-scrollbar';

registerLocaleData(en);
const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    UserDetailComponent,
    ChatComponent,
    SignInComponent,
    PageNotFoundComponent,
    ExcelComponent,
    TruncatePipe,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    SocketIoModule.forRoot(config),
    ButtonsModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NzSelectModule
  ],
  providers: [signUpGuard, authGuard, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
