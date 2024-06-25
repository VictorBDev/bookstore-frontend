import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarLibrosComponent } from './components/listar-libros/listar-libros.component'; 
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { ListarCategoriasComponent } from './components/listar-categorias/listar-categorias.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';

const routes: Routes = [
  { path: '', redirectTo: 'libros', pathMatch: 'full' },
  { path: 'libros', component: ListarLibrosComponent },
  { path: 'crear-libro', component: CrearLibroComponent },
  { path: 'editar-libro/:libro_id', component: CrearLibroComponent },

  { path: 'categorias', component: ListarCategoriasComponent },
  { path: 'crear-categoria', component: CrearCategoriaComponent },
  { path: 'editar-categoria/:categoria_id', component: CrearCategoriaComponent },

  { path: '**', redirectTo: 'libros', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }