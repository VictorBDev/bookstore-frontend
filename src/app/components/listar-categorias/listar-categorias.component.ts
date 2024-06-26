import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.css'
})

//ad implements OnInit
export class ListarCategoriasComponent implements OnInit {

  listCategorias: Categoria[] = [];
  //add new attribute private router
  constructor(private _categoriaService: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this._categoriaService.getCategorias().subscribe(data => {
      //console log para ver los datos que se obtienen
      console.log('Datos recibidos:', data);
      console.log('Tipo de datos:', typeof data);
      console.log('Es un array:', Array.isArray(data));
      this.listCategorias = data;
      //console log para ver los datos que se asignan
      console.log('listCategorias después de asignar:', this.listCategorias);
    }, error => {
      console.log('Error al obtener categorías:', error);
    });
  }

  //add new method:
  editarCategoria(categoria_id: any) {
    this.router.navigate(['/editar-categoria', categoria_id]);
  }

  eliminarCategoria(categoria_id: any) {
    this._categoriaService.eliminarCategoria(categoria_id).subscribe(data => {
      this.obtenerCategorias();
    }, error => {
      console.log('Error al eliminar categoría:', error);
    });
  }

}
