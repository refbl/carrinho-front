import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080/api';

@Component({
    templateUrl: './carrinho.component.html'
})
export class CarrinhoComponent  implements OnInit{
    carrinhos: Object[] = [];
    usuarios: Object[] = [];
    carrinhos_aux: Object[] = [];
    itensCarrinho: Object[] = [];
    carrinhoForm: FormGroup;
    carrinhoEncontrado = false;
    clienteEncontrado = false;
    itens:  Object[] = [];

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
          email: ['', [Validators.required ,Validators.email] ]

        });
    }


    menu (){
        console.log('Vai Direcionar para Menu...');
        this.router.navigateByUrl('menu');
    }

    cliente (){
      console.log('Entrou em Cliente...');

      const email = this.carrinhoForm.get('email').value;

      console.log('Vai Consultar...' + email);

      console.log(this.http);

      console.log(API_URL + '/usuario?email=' + email);

      //Obter o ID do Item
      const observable = this.http.get<Object[]>( API_URL + '/usuario?email=' + email);
      
      observable.subscribe(usuarios => {
        console.log(usuarios); 
        this.usuarios = usuarios; 
        console.log(this.usuarios);
        const usuario = this.usuarios[0];
        
        if (usuario != null){
           console.log('Usuario Encontrado.. Vai Consultar Carrinho');

           console.log(API_URL + '/carrinho?email=' + email);

           this.clienteEncontrado = true;

           const observable = this.http.get<Object[]>( API_URL + '/carrinho?email=' + email);
      
           observable.subscribe(carrinhos => {
                console.log(carrinhos); 
                this.carrinhos = carrinhos; 
                console.log(this.carrinhos);
                const carrinho = this.carrinhos[0];  

                if (carrinho != null){
                  console.log('Carrinho Encontrado.. Vai formatar Lista Itens');
                  
                  this.itensCarrinho = (<any>this.carrinhos[0]).itens;
                  this.carrinhoEncontrado = true;

                  console.log(this.itensCarrinho);

                } else {
                  console.log('Carrinho não Encontrado..');                  
                }
                
           });


        } else {

          console.log('Usuario não Encontrado..');
        }

        //const id =  (<any>this.usuarios[0]).id;
        //console.log('ID --> ' + id);

        //this.http.patch(API_URL + '/item/' + id , { nome, valor } ).subscribe(
        //  () => console.log('Alterado com sucesso'),
        //  err => {
        //      console.log(err);
        //      this.itemForm.reset();
        //  });

      });
  }

  adicionarItem(){
    console.log('Adicionar Item..');

    const item = this.carrinhoForm.get('selItem').value;

    console.log('Item: ' + item);


  }

  removerItem(){
    console.log('Remover Item..');
  }
}