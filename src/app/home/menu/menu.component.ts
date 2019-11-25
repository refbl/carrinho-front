import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
   templateUrl: './menu.component.html'

})
export class MenuComponent implements OnInit{
    menuForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder, 
        private router: Router) { }

    ngOnInit(): void {
        this.menuForm = this.formBuilder.group({
            bt_usuario: [],
            bt_item: [],
            bt_carrinho: []
        });
    }

    opcaoUsuario() {
        console.log('Vai Direcionar para Menu Usuario...');
        this.router.navigateByUrl('usuario');

    }

    opcaoItem() {
        console.log('Vai Direcionar para Menu Itens...');
        this.router.navigateByUrl('item');

    }

    opcaoCarrinho() {
        console.log('Vai Direcionar para Menu Carrinho...');
        this.router.navigateByUrl('carrinho');

    }

}