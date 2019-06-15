import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from '../../Modules/shop/shop.component';
import { MenuComponent } from '../../Modules/shop/menu/menu.component';
import { CartComponent } from '../../Modules/shop/cart/cart.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component'
import { Routes, RouterModule } from '@angular/router';
import { ShopResolver } from 'src/app/Resolvers/shop.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ShopRoutes: Routes = [
  {
    path : '',
    component: ShopComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu'
      },
      {
        path: 'menu',
        component: MenuComponent,
        resolve: { fruits:  ShopResolver}
      },
      {
        path: 'cart',
        component: CartComponent,
      }
    ]
  }
];


@NgModule({
  declarations: [NavbarComponent, ShopComponent, MenuComponent, CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ShopRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ShopResolver]
})
export class ShopModule { }
