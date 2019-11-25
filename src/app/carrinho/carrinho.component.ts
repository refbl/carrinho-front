import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080/api';

@Component({
    templateUrl: './carrinho.component.html'
})
export class CarrinhoComponent  implements OnInit{
    itens: Object[] = [];
    itens_aux: Object[] = [];
    carrinhoForm: FormGroup;

    constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder, 
      private router: Router) {

      console.log(http);
  
      const observable = http.get<Object[]>( API_URL + '/item');
      observable.subscribe(itens => {console.log(itens); this.itens = itens; console.log(this.itens)});
  
    }

    ngOnInit(): void {
        this.carrinhoForm = this.formBuilder.group({
          email: ['', Validators.required],

        });
    }


    menu (){
        console.log('Vai Direcionar para Menu...');
        this.router.navigateByUrl('menu');
    }
}