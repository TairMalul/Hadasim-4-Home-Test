import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AllMembersComponent } from './components/all-members/all-members.component';
import { AddOrUpdateComponent } from './components/add-or-update/add-or-update.component';

const routes: Routes = [
  {path:"", component:AllMembersComponent},
  {path:"home", component:HomeComponent},
  {path:"members", component:AllMembersComponent},
  {path:"add_member/:state", component:AddOrUpdateComponent},
  {path:"update_member/:state", component:AddOrUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
