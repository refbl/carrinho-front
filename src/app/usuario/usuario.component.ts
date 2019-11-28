import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080/api';

@Component({
    templateUrl: './usuario.component.html'
})
export class UsuarioComponent  implements OnInit{
    usuarios: Object[] = [];
    usuarios_aux: Object[] = [];
    usuarioForm: FormGroup;

    constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder, 
      private router: Router) {

      console.log(http);
  
      this.consultaUsuarioBackend();
  
    }

  private consultaUsuarioBackend() {
    const observable = this.http.get<Object[]>(API_URL + '/usuario');
    observable.subscribe(usuarios => { console.log(usuarios); this.usuarios = usuarios; console.log(this.usuarios); });
  }

    ngOnInit(): void {
        this.usuarioForm = this.formBuilder.group({
          email: ['', Validators.required],
          nome: ['', Validators.required],
          id: ['']

        });
    }

    incluir() {

        const email = this.usuarioForm.get('email').value;
        const nome = this.usuarioForm.get('nome').value;

        console.log('Vai Direcionar Incluir...' + email + ' - ' + nome);


        console.log(this.http);

        this.http.post(API_URL + '/usuario', { nome, email } ).subscribe(
          () => {
            console.log('Incluido com sucesso');
            this.consultaUsuarioBackend();
            this.usuarioForm.reset();
          },
          err => {
              console.log(err);
              this.usuarioForm.reset();
          }
      );
      this.usuarioForm.reset();
  
    }

    alterar() {
        console.log('Vai Direcionar para Alterar...');
        //const id = this.usuarioForm.get('id').value;
        const email = this.usuarioForm.get('email').value;
        const nome = this.usuarioForm.get('nome').value;

        console.log('Vai Direcionar Alterar...' + email + ' - ' + nome);


        console.log(this.http);

        console.log(API_URL + '/usuario?email=' + email);

        //Obter o ID do Usuario
        const observable = this.http.get<Object[]>( API_URL + '/usuario?email=' + email);
        
        observable.subscribe(usuarios_aux => {
          console.log(usuarios_aux); 
          this.usuarios_aux = usuarios_aux; 
          console.log(this.usuarios_aux);

          const id = (<any>this.usuarios_aux[0]).id;

          console.log('ID --> ' + id);

          this.http.patch(API_URL + '/usuario/' + id , { nome, email } ).subscribe(
            () => {
              console.log('Alterado com sucesso');
              this.consultaUsuarioBackend();
              this.usuarioForm.reset();
            },

            err => {
                console.log(err);
                this.usuarioForm.reset();
            });
 
        });

    }

    excluir() {
      const email = this.usuarioForm.get('email').value;
      const nome = this.usuarioForm.get('nome').value;

      console.log('Vai Direcionar Excluir...' + email + ' - ' + nome);


      console.log(this.http);

      console.log(API_URL + '/usuario?email=' + email);

      //Obter o ID do Usuario
      const observable = this.http.get<Object[]>( API_URL + '/usuario?email=' + email);
      
      observable.subscribe(usuarios_aux => {
        console.log(usuarios_aux); 
        this.usuarios_aux = usuarios_aux; 
        console.log(this.usuarios_aux);

        const id = (<any>this.usuarios_aux[0]).id;

        console.log('ID --> ' + id);

        this.http.delete(API_URL + '/usuario/' + id).subscribe(
          () => {
            console.log('Excluido com sucesso');
            this.consultaUsuarioBackend();
            this.usuarioForm.reset();
          },
          err => {
              console.log(err);
              this.usuarioForm.reset();
          });

      });

    }

    menu (){
      console.log('Vai Direcionar para Menu...');
      this.router.navigateByUrl('menu');
  }
}