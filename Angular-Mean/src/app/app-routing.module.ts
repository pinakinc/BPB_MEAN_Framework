import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import {HomeComponent} from './Components/home/home.component'
import {ProfileComponent} from './Components/profile/profile.component'
import {RegisterComponent} from './Components/register/register.component'

const appRoutes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent}
  
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
