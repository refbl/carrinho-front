import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080/api';

@Component({
    templateUrl: './item.component.html'
})
export class ItemComponent  implements OnInit{
    itens: Object[] = [];
    itens_aux: Object[] = [];
    itemForm: FormGroup;

    constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder, 
      private router: Router) {

      console.log(http);
  
      this.consultarItemBackend();
  
    }

  private consultarItemBackend() {
    const observable = this.http.get<Object[]>(API_URL + '/item');
    observable.subscribe(itens => { console.log(itens); this.itens = itens; console.log(this.itens); });
  }

    ngOnInit(): void {
        this.itemForm = this.formBuilder.group({
          nome: ['', Validators.required],
          valor: ['', Validators.required],
          id: ['']

        });
    }

    incluir() {

        const nome = this.itemForm.get('nome').value;
        const valor = this.itemForm.get('valor').value;

        console.log('Vai Direcionar Incluir...' + nome + ' - ' + valor);


        console.log(this.http);

        this.http.post(API_URL + '/item', { nome, valor } ).subscribe(
          () => {
            console.log('Incluido com sucesso');
            this.consultarItemBackend();
            this.itemForm.reset();
          },
          err => {
              console.log(err);
              this.itemForm.reset();
          }
      );
    }

    alterar() {
        console.log('Vai Direcionar para Alterar...');
        const nome = this.itemForm.get('nome').value;
        const valor = this.itemForm.get('valor').value;

        console.log('Vai Direcionar Alterar...' + nome + ' - ' + valor);


        console.log(this.http);

        console.log(API_URL + '/item?nome=' + nome);

        //Obter o ID do Item
        const observable = this.http.get<Object[]>( API_URL + '/item?nome=' + nome);
        
        observable.subscribe(itens_aux => {
          console.log(itens_aux); 
          this.itens_aux = itens_aux; 
          console.log(this.itens_aux);

          const id =  (<any>this.itens_aux[0]).id;

          console.log('ID --> ' + id);

          this.http.patch(API_URL + '/item/' + id , { nome, valor } ).subscribe(
            () =>{
              console.log('Alterado com sucesso');
              this.consultarItemBackend();
              this.itemForm.reset();
            },
            err => {
                console.log(err);
                this.itemForm.reset();
            });
 
        });
        this.consultarItemBackend();
        this.itemForm.reset();
        
        

    }

    excluir() {
      const nome = this.itemForm.get('nome').value;
      const valor = this.itemForm.get('valor').value;

      console.log('Vai Direcionar Excluir...' + nome + ' - ' + valor);


      console.log(this.http);

      console.log(API_URL + '/item?nome=' + nome);

      //Obter o ID do Item
      const observable = this.http.get<Object[]>( API_URL + '/item?nome=' + nome);
      
      observable.subscribe(itens_aux => {
        console.log(itens_aux); 
        this.itens_aux = itens_aux; 
        console.log(this.itens_aux);

        const id =   (<any>this.itens_aux[0]).id;

        console.log('ID --> ' + id);

        this.http.delete(API_URL + '/item/' + id).subscribe(
          () => {
            console.log('Excluido com sucesso');
            this.consultarItemBackend();
            this.itemForm.reset();

          },
          err => {
              console.log(err);
              this.itemForm.reset();
          });

      });
      this.consultarItemBackend();
    }

    menu (){
        console.log('Vai Direcionar para Menu...');
        this.router.navigateByUrl('menu');
    }
}