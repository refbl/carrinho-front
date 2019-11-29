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
    carrinhosComprados: Object[] = [];
    itensComprados: Object[] = [];
    carrinhoForm: FormGroup;
    carrinhoEncontrado = false;
    clienteEncontrado = false;
    compraFechada     = false;
    itens:  Object[] = [];
    carrinho: Object = null; 
    usuario: Object = null; 

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
          email: ['', [Validators.required ,Validators.email] ],
          selItem: ['']

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
        this.usuario = this.usuarios[0];
        
        if (this.usuario != null){
           console.log('Usuario Encontrado.. Vai Consultar Carrinho');

           console.log(API_URL + '/carrinho?email=' + email);

           this.clienteEncontrado = true;

           const observable = this.http.get<Object[]>( API_URL + '/carrinho?email=' + email);
      
           observable.subscribe(carrinhos => {
                console.log(carrinhos); 
                this.carrinhos = carrinhos; 
                console.log(this.carrinhos);
                this.carrinho = this.carrinhos[0];  

                if (this.carrinho != null){
                  console.log('Carrinho Encontrado.. Vai formatar Lista Itens');
                  
                  this.itensCarrinho = (<any>this.carrinhos[0]).itens;
                  this.carrinhoEncontrado = true;

                  console.log(this.itensCarrinho);

                } else {
                  this.itensCarrinho = null;
                  console.log('Carrinho não Encontrado..');                  
                }
                
           });
        } else {
          console.log('Usuario não Encontrado..');
        }
      });
  }

  adicionarItem(){
    console.log('Adicionar Item..');
    const item = this.carrinhoForm.get('selItem').value;
    console.log('Item: ' + item);
    
    this.carrinho = this.carrinhos[0];  

    // Solicita Criaçao do Carrinho
    if(this.carrinho == null){
      console.log("1...." + + this.usuario);
      console.log(API_URL + '/carrinho');
      this.http.post(API_URL + '/carrinho', this.usuario).subscribe(
      () => {
        console.log("Incluido com Sucesso....." + (<any>this.usuario).email + API_URL + '/carrinho?email=' + (<any>this.usuario).email);

        // Obtem Id Carrinho
        this.http.get<Object[]>( API_URL + '/carrinho?email=' + (<any>this.usuario).email).subscribe(carrinhos => {
            console.log(carrinhos); 
            this.carrinhos = carrinhos; 
            console.log(this.carrinhos);
            this.carrinho = this.carrinhos[0] 
          
            console.log('Item quando criou Carrinho +++++++ ' + item + ' Carrinho: ' + (<any>this.carrinho).id);
     
            if (item != null ){
               console.log("3");
               console.log(API_URL + '/carrinho/' + (<any>this.carrinho).id + '/item/' + item);
               this.http.post(API_URL + '/carrinho/' + (<any>this.carrinho).id + '/item/' + item, null).subscribe(
                () => { console.log('Incluido com sucesso');
                       this.cliente(); 
                      },
                err => {
                    console.log(err);
                    this.carrinhoForm.reset();
                  }
        
               );
            }
          });
      },
      err => {
           console.log(err);
           this.carrinhoForm.reset();
      });


    } else {

      console.log('Item quando tem Carrinho.......: ' + item + 'Carrinho: ' + (<any>this.carrinho).id);
     
      if (item != null ){
         console.log("3");
         console.log(API_URL + '/carrinho/' + (<any>this.carrinho).id + '/item/' + item);
         this.http.post(API_URL + '/carrinho/' + (<any>this.carrinho).id + '/item/' + item, null).subscribe(
          () => {
                console.log('Incluido com sucesso');
                this.cliente();
          },
          err => {
              console.log(err);
              this.carrinhoForm.reset();
            }
  
         );
      }
    }
  }

  removerItem(){
    console.log('Remover Item.');
    const item = this.carrinhoForm.get('selItem').value;
    console.log('Item: ' + item);
    const carrinho = this.carrinhos[0];  

    if (carrinho != null && item != null ){
       console.log('Vai Deletar ....... ->>>>' + API_URL + '/carrinho/' + (<any>carrinho).id + '/item/' + item);
       this.http.delete(API_URL + '/carrinho/' + (<any>carrinho).id + '/item/' + item).subscribe(
        () => {
          console.log('Excluido com sucesso');
          this.cliente();
        },

        err => {
            console.log(err);
            this.carrinhoForm.reset();
          }
       );
    }
    //this.cliente();
    //this.carrinhoForm.reset();
  }

  fecharCompra(){
    console.log('Fechar Compra..');

    console.log(this.http + ' ' + this.carrinho);
      
    const observable = this.http.get<Object[]>( API_URL + '/carrinho/' + (<any>this.carrinho).id + '/fecharcompra');
      
    observable.subscribe(carrinhosComprados => {
         console.log(carrinhosComprados); 
         this.carrinhosComprados = carrinhosComprados; 
         console.log(this.carrinhosComprados);
         this.carrinho = (<any>this.carrinhosComprados[0]).carrinho;  
         this.itensComprados = (<any>this.carrinhosComprados[0]).itensComprados;

         if (this.carrinho != null){
           console.log('Carrinho Comprado Encontrado......');
           
           this.compraFechada = true;

         } else {
           this.itensCarrinho = null;
           console.log('Carrinho não Encontrado..');                  
         }
      });
      console.log("*******");
   }
}