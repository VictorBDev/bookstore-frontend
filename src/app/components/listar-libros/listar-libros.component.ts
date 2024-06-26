import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro';
import { Router } from '@angular/router';
import { LibroConCategoria } from '../../services/libro.service';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.css']
})

export class ListarLibrosComponent implements OnInit {

  listLibros: LibroConCategoria[] = [];
  //add new attribute private router
  constructor(private _libroService: LibroService, private router: Router) { }

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

  editarLibro(libro_id: any) {
    this.router.navigate(['/editar-libro', libro_id]);
  }
  
  eliminarLibro(libro_id: any) {
    if(confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this._libroService.eliminarLibro(libro_id).subscribe(data => {
          console.log('Libro eliminado correctamente');
          this.obtenerLibros();
        },
        error => {
          console.error('Error al eliminar libro:', error);
        }
      );
    }
  }
}