import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './home/menu/menu.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ItemComponent } from './item/item.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';


const routes: Routes = [
     {
       path: '',
       component: MenuComponent
     },
     {
      path: 'usuario',
      component: UsuarioComponent
    },
    {
      path: 'item',
      component: ItemComponent
    },
    {
      path: 'menu',
      component: MenuComponent
    },
    {
      path: 'carrinho',
      component: CarrinhoComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
