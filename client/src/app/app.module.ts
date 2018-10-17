import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule }     from './app-routing.module';

import { NbThemeModule } from '@nebular/theme';
import {
  NbSidebarModule,
  NbLayoutModule,
  NbMenuModule,
  NbCardModule,
  NbActionsModule,
  NbBadgeModule,
  NbSidebarService,
  NbMenuService} from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbActionsModule,
    NbBadgeModule
  ],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
