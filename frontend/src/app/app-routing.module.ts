import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { signUpGuard } from './shared/guards/sign-up.guard';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'home', redirectTo: '' },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full', canDeactivate: [signUpGuard] },
  { path: 'sign-in', component: SignInComponent, pathMatch: 'full' },
  {
    path: 'chat', component: ChatComponent
  }
  ,
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
