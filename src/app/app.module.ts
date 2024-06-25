import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { ListarCategoriasComponent } from './components/listar-categorias/listar-categorias.component';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { ListarLibrosComponent } from './components/listar-libros/listar-libros.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearCategoriaComponent,
    ListarCategoriasComponent,
    CrearLibroComponent,
    ListarLibrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }