import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';

@NgModule({
    declarations: [ItemComponent],
    imports: [ CommonModule , ReactiveFormsModule ,  RouterModule, FormsModule]
})
export class ItemModule{}