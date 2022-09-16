import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  { path: 'detail/:id', component: SinglePostComponent},
  { path: '', component: MainComponent},
  { path: 'main', component: MainComponent},
  { path: 'login', component: LoginComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
