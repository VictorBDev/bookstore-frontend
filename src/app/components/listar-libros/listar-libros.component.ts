import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.css']
})
export class ListarLibrosComponent implements OnInit {

  listLibros: Libro[] = [];
  constructor(private _libroService: LibroService) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this._libroService.getLibros().subscribe(
      data => {
        console.log('Datos recibidos:', data);
        console.log('Tipo de datos:', typeof data);
        console.log('Es un array:', Array.isArray(data));
        this.listLibros = data;
        console.log('listLibros después de asignar:', this.listLibros);
      },
      error => {
        console.error('Error al obtener libros:', error.message, error);
      }
    );
  }
  
  eliminarLibro(libro_id: any) {
    this._libroService.eliminarLibro(libro_id).subscribe(
      () => {
        this.obtenerLibros();
      },
      error => {
        console.error('Error al eliminar libro:', error.message, error);
      }
    );
  }
}