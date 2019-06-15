import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { ShopModule } from './Modules/shop/shop.module';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {
    path: 'shopping',
    loadChildren: () =>  ShopModule
  },
  {
    path : '',
    redirectTo: 'shopping',
    pathMatch: 'full',
  },
  {
    path : '**',
    redirectTo: 'shopping',
    pathMatch: 'full',
  },
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
