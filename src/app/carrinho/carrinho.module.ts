import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoComponent } from './carrinho.component';

@NgModule({
    declarations: [CarrinhoComponent],
    imports: [ CommonModule , ReactiveFormsModule ,  RouterModule, FormsModule]
})
export class CarrinhoModule{}