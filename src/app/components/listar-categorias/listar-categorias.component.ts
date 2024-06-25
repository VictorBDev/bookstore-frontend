import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.css'
})
export class ListarCategoriasComponent {

  listCategorias: Categoria[] = [];
  constructor(private _categoriaService: CategoriaService) { }

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

  eliminarCategoria(id: any) {
    this._categoriaService.eliminarCategoria(id).subscribe(data => {
      this.obtenerCategorias();
    }, error => {
      console.log(error);
    });
  }

}
