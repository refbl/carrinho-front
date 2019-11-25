import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';

@NgModule({
    declarations: [UsuarioComponent],
    imports: [ CommonModule , ReactiveFormsModule ,  RouterModule, FormsModule]
})
export class UsuarioModule{}