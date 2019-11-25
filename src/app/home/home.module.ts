import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MenuComponent],
    imports: [ CommonModule , ReactiveFormsModule ,  RouterModule]
})
export class HomeModule{}