import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { StatsComponent } from './components/stats/stats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllMembersComponent } from './components/all-members/all-members.component';
import { AddOrUpdateComponent } from './components/add-or-update/add-or-update.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    StatsComponent,
    AllMembersComponent,
    AddOrUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
