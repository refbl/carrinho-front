import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ItemModule } from './item/item.module';
import { CarrinhoModule } from './carrinho/carrinho.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    UsuarioModule,
    ItemModule,
    CarrinhoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
